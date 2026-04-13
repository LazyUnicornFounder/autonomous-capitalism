import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const GATEWAY_URL = "https://connector-gateway.lovable.dev/resend";

function buildSubstackHtml(content: string): string {
  const rawContent = content.split(/---\s*\n\s*## Business Ideas/i)[0].trim();
  const paragraphs = rawContent.split(/\n\n+/).map((p: string) => {
    let html = p.trim();
    if (!html) return "";
    html = html.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
    html = html.replace(/\*(.*?)\*/g, "<em>$1</em>");
    html = html.replace(/_(.*?)_/g, "<em>$1</em>");
    html = html.replace(/\n/g, "<br>");
    return `<p>${html}</p>`;
  }).filter(Boolean).join("\n\n");

  return `<!DOCTYPE html>
<html><head><meta charset="utf-8"></head>
<body>
${paragraphs}
</body></html>`;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY not configured");
    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    if (!RESEND_API_KEY) throw new Error("RESEND_API_KEY not configured");
    const substackEmail = Deno.env.get("SUBSTACK_IMPORT_EMAIL");
    if (!substackEmail) throw new Error("SUBSTACK_IMPORT_EMAIL not configured");

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, serviceKey);

    const { data: posts, error } = await supabase
      .from("blog_posts")
      .select("id, title, content, published_date")
      .order("published_date", { ascending: true });

    if (error) throw new Error(`Failed to fetch posts: ${error.message}`);
    if (!posts?.length) {
      return new Response(JSON.stringify({ message: "No posts found" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    let sent = 0, failed = 0;

    for (const post of posts) {
      try {
        const html = buildSubstackHtml(post.content);
        const res = await fetch(`${GATEWAY_URL}/emails`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${LOVABLE_API_KEY}`,
            "X-Connection-Api-Key": RESEND_API_KEY,
          },
          body: JSON.stringify({
            from: "Autonomous Capitalism <dispatch@autonomouscapitalism.com>",
            to: [substackEmail],
            subject: post.title,
            html,
          }),
        });

        if (res.ok) {
          sent++;
          console.log(`Sent: ${post.published_date} - ${post.title}`);
        } else {
          console.error(`Failed ${post.published_date}: ${await res.text()}`);
          failed++;
        }
      } catch (e) {
        console.error(`Error ${post.published_date}:`, e);
        failed++;
      }
      await new Promise((r) => setTimeout(r, 1000));
    }

    return new Response(
      JSON.stringify({ message: "Batch complete", sent, failed, total: posts.length }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
