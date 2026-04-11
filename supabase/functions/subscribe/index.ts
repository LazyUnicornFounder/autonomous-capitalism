import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { email } = await req.json();
    if (!email || typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      return new Response(JSON.stringify({ error: "Invalid email" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, serviceKey);

    const trimmedEmail = email.trim().toLowerCase();

    // Check if subscriber exists
    const { data: existing } = await supabase
      .from("subscribers")
      .select("id, is_active")
      .eq("email", trimmedEmail)
      .maybeSingle();

    if (existing) {
      if (existing.is_active) {
        return new Response(JSON.stringify({ status: "already_subscribed" }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      // Reactivate
      const { error } = await supabase
        .from("subscribers")
        .update({ is_active: true })
        .eq("id", existing.id);
      if (error) throw error;
    } else {
      // New subscriber
      const { error } = await supabase
        .from("subscribers")
        .insert({ email: trimmedEmail });
      if (error) throw error;
    }

    // Send welcome dispatch (fire and forget)
    supabase.functions.invoke("send-dispatch", {
      body: { singleEmail: trimmedEmail },
    }).catch(() => {});

    return new Response(JSON.stringify({ status: "subscribed" }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
