// Aggregates "autonomous" news from keyless public sources:
// - Hacker News (Algolia search API)
// - Google News RSS
// - Reddit JSON (r/artificial, r/singularity, r/SelfDrivingCars)
//
// Returns items in the legacy `tweets` shape so the existing UI keeps working.

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

type Item = {
  id: string;
  handle: string;       // source label, e.g. "@hackernews"
  username: string;     // human-readable source/author
  avatar: string;       // 2-letter fallback
  avatarUrl?: string | null;
  content: string;      // headline / summary
  timestamp: string;    // ISO date
  likes: number;        // points / score
  retweets: number;     // comments
  replies: number;
  verified: boolean;
  url: string;          // canonical link to story
};

const QUERY = "autonomous";

async function fetchHackerNews(): Promise<Item[]> {
  try {
    const url = `https://hn.algolia.com/api/v1/search_by_date?query=${encodeURIComponent(QUERY)}&tags=story&hitsPerPage=30`;
    const res = await fetch(url);
    if (!res.ok) return [];
    const data = await res.json();
    return (data.hits || []).map((h: any): Item => ({
      id: `hn-${h.objectID}`,
      handle: "@hackernews",
      username: h.author || "Hacker News",
      avatar: "HN",
      avatarUrl: null,
      content: h.title || h.story_title || "",
      timestamp: h.created_at,
      likes: h.points || 0,
      retweets: h.num_comments || 0,
      replies: 0,
      verified: true,
      url: h.url || `https://news.ycombinator.com/item?id=${h.objectID}`,
    })).filter((i: Item) => i.content);
  } catch (e) {
    console.error("HN fetch failed:", e);
    return [];
  }
}

function decodeEntities(s: string) {
  return s
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)));
}

async function fetchGoogleNews(): Promise<Item[]> {
  try {
    const url = `https://news.google.com/rss/search?q=${encodeURIComponent(QUERY)}+when:2d&hl=en-US&gl=US&ceid=US:en`;
    const res = await fetch(url);
    if (!res.ok) return [];
    const xml = await res.text();
    const items: Item[] = [];
    const itemRegex = /<item>([\s\S]*?)<\/item>/g;
    let m;
    let i = 0;
    while ((m = itemRegex.exec(xml)) && i < 30) {
      const block = m[1];
      const title = decodeEntities((block.match(/<title>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/title>/) || [])[1] || "");
      const link = (block.match(/<link>([\s\S]*?)<\/link>/) || [])[1] || "";
      const pubDate = (block.match(/<pubDate>([\s\S]*?)<\/pubDate>/) || [])[1] || new Date().toISOString();
      const source = decodeEntities((block.match(/<source[^>]*>([\s\S]*?)<\/source>/) || [])[1] || "Google News");
      if (!title) continue;
      items.push({
        id: `gn-${i}-${pubDate}`,
        handle: `@${source.toLowerCase().replace(/[^a-z0-9]+/g, "").slice(0, 20) || "news"}`,
        username: source,
        avatar: source.slice(0, 2).toUpperCase(),
        avatarUrl: null,
        content: title,
        timestamp: new Date(pubDate).toISOString(),
        likes: 0,
        retweets: 0,
        replies: 0,
        verified: false,
        url: link.trim(),
      });
      i++;
    }
    return items;
  } catch (e) {
    console.error("Google News fetch failed:", e);
    return [];
  }
}

async function fetchReddit(): Promise<Item[]> {
  const subs = ["artificial", "singularity", "SelfDrivingCars", "Futurology"];
  const out: Item[] = [];
  for (const sub of subs) {
    try {
      const url = `https://www.reddit.com/r/${sub}/search.json?q=${encodeURIComponent(QUERY)}&restrict_sr=1&sort=new&limit=15`;
      const res = await fetch(url, { headers: { "User-Agent": "AutonomousCapitalismBot/1.0" } });
      if (!res.ok) continue;
      const data = await res.json();
      for (const c of data?.data?.children || []) {
        const p = c.data;
        out.push({
          id: `rd-${p.id}`,
          handle: `@r/${sub}`,
          username: p.author ? `u/${p.author}` : `r/${sub}`,
          avatar: "RD",
          avatarUrl: null,
          content: p.title || "",
          timestamp: new Date((p.created_utc || 0) * 1000).toISOString(),
          likes: p.score || 0,
          retweets: p.num_comments || 0,
          replies: 0,
          verified: false,
          url: `https://www.reddit.com${p.permalink}`,
        });
      }
    } catch (e) {
      console.error(`Reddit r/${sub} failed:`, e);
    }
  }
  return out;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const [hn, gn, rd] = await Promise.all([fetchHackerNews(), fetchGoogleNews(), fetchReddit()]);
    const all = [...hn, ...gn, ...rd]
      .filter((i) => /autonomous/i.test(i.content))
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

    console.log(`news-feed: HN=${hn.length} GN=${gn.length} RD=${rd.length} total=${all.length}`);

    return new Response(JSON.stringify({ tweets: all, items: all }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("news-feed error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
