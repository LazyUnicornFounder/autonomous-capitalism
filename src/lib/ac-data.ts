// Autonomous Capitalism · 2026 — single source of truth for the manifesto one-pager.

export const BRAND = "Autonomous Capitalism · 2026.";

export const HERO = {
  headline: "Autonomous Capitalism.",
  subhead: "One founder. Zero employees. A business that operates while you sleep.",
  dek: "What it actually costs, how long it actually takes, and the exact stack to get there in 2026.",
  meta: "For founders who want to compound without scaling.",
  ctaPrimary: "Subscribe to the newsletter →",
  ctaSecondary: "Download the playbook (PDF)",
};

export const THESIS = [
  { n: "01", text: "Software ate the world. AI is eating software." },
  { n: "02", text: "Headcount is the last expensive thing in business. AI agents are killing it." },
  { n: "03", text: "The next $10M companies will be built by one person, three agents, and a credit card." },
];

export const COMPRESSION = [
  { value: 1, prefix: "", suffix: "", label: "humans needed to run a 7-figure business in 2026" },
  { value: 5000, prefix: "$", suffix: "", label: "typical monthly operating cost for a fully autonomous business" },
  { value: 90, prefix: "", suffix: " days", label: "time to first $10k MRR with the right wedge" },
  { value: 12, prefix: "", suffix: " months", label: "time to $1M ARR if execution is tight" },
  { value: 0, prefix: "", suffix: "", label: "meetings on your calendar that you don't choose" },
];

export const TIMELINE = [
  {
    period: "Day 0–14",
    title: "Idea + Wedge",
    cost: "$0–$200",
    costNote: "domain, Lovable trial, Claude credits",
    build: "Validate the wedge with 5 paid pilot conversations.",
    runs: "Nothing yet.",
  },
  {
    period: "Day 14–60",
    title: "MVP (Lovable + AI agents)",
    cost: "$500–$2,000",
    costNote: "one-time + first month",
    build: "Shipped product on Lovable, payments via Polar.sh, first 5–10 paying customers.",
    runs: "Signups, payments, basic onboarding email sequence.",
  },
  {
    period: "Month 2–4",
    title: "First $10K MRR",
    cost: "$2,000–$5,000",
    costNote: "monthly OPEX",
    build: "Content engine (Resend + automated newsletter), AI support agent, ICP-targeted outbound (Clay-class).",
    runs: "Marketing top-of-funnel, lead enrichment, customer support tier-1.",
    isToday: true,
  },
  {
    period: "Month 4–9",
    title: "First $100K MRR",
    cost: "$5,000–$10,000",
    costNote: "monthly OPEX",
    build: "AI sales agent (qualifies + demos), AI account manager (renewals + expansion), invoicing + collections agent.",
    runs: "End-to-end revenue cycle minus enterprise deals.",
  },
  {
    period: "Month 9–18",
    title: "First $1M ARR",
    cost: "$10,000–$25,000",
    costNote: "monthly OPEX",
    build: "Orchestration layer (n8n / Temporal), product agent (writes features from feedback), finance agent (books, taxes, runway alerts).",
    runs: "Everything except strategic decisions and high-value sales calls.",
  },
];

export const STACK = [
  { col: "Product", tools: ["Lovable", "Cursor", "Claude Code", "Vercel", "Supabase"] },
  { col: "Revenue", tools: ["Polar.sh", "Resend", "Cal.com", "n8n"] },
  { col: "Growth", tools: ["Clay-class enrichment", "Apollo", "11x / Artisan / Hey Sid", "X content agent"] },
  { col: "Operations", tools: ["Claude / GPT", "Notion", "GitHub Actions", "Plaid"] },
];

// Cost curve — base scenario
export const COST_CURVE_BASE = [
  { month: 0, opex: 200, mrr: 0 },
  { month: 1, opex: 500, mrr: 0 },
  { month: 2, opex: 1500, mrr: 1500 },
  { month: 3, opex: 3000, mrr: 5000 },
  { month: 4, opex: 4500, mrr: 9000 },
  { month: 5, opex: 6000, mrr: 12000 },
  { month: 6, opex: 7500, mrr: 18000 },
  { month: 9, opex: 12000, mrr: 35000 },
  { month: 12, opex: 18000, mrr: 55000 },
  { month: 15, opex: 22000, mrr: 70000 },
  { month: 18, opex: 25000, mrr: 80000 },
];

export const TIME_COST = [
  { hours: 60, period: "Months 0–4", note: "typical founder time" },
  { hours: 30, period: "Months 4–9", note: "agents take over operations" },
  { hours: 15, period: "Months 9–18", note: "you're working on the wedge, not the business" },
];

export const WEDGES = [
  { n: "01", text: "Vertical AI agents (replace one professional service in one industry)." },
  { n: "02", text: "Workflow products (replace a $200/mo SaaS with a $20/mo agent-native one)." },
  { n: "03", text: "Knowledge productisation (turn a course / newsletter / community into a self-running brand)." },
  { n: "04", text: "Marketplaces with agent matching (Uber for niche knowledge work)." },
  { n: "05", text: "Internal-tool-as-a-product (build it for yourself, sell it to lookalikes)." },
];

export const FAILURES = [
  { title: "Hiring before automating.", body: "Every full-time hire under $5M ARR is a failure of imagination." },
  { title: "Building the agency instead of the product.", body: "One client = a job. Many customers = a business." },
  { title: "Scaling the wrong wedge.", body: "If month 4 isn't profitable, the wedge is wrong, not the execution." },
];

export const WHATS_DIFFERENT = [
  { n: "01", title: "Code generation crossed parity.", body: "Lovable, Cursor, Claude Code build production apps in days." },
  { n: "02", title: "Agent reliability crossed 95%.", body: "Background workflows finally don't need a human checking every output." },
  { n: "03", title: "Distribution rewards owned audiences.", body: "Newsletters, X, communities — distribution costs collapsed for solo operators." },
];

export const PLAYBOOK = [
  { n: "01", text: "Pick one wedge from section 8. Commit to 14 days of validation." },
  { n: "02", text: "Spin up Lovable + Polar.sh + Resend. Spend under $200." },
  { n: "03", text: "Find 5 people willing to pay $200 today. If you can't, the wedge is wrong." },
];

export const METHODOLOGY =
  "Cost and time benchmarks compiled from 2024–2026 indie hacker disclosures, GTM tool adoption curves, Lovable / Cursor / Claude pricing, and Autonomous Capitalism portfolio cohort data.";
