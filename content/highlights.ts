// Highlights are distilled from the two featured projects in projects.ts
// (Helpwise and the B2B Wholesale & Supply Chain Platform). Tags and bullets
// are condensed from that source — no new information is invented here.

export type Highlight = {
  slug: string;
  title: string;
  org: string;
  logo?: string;
  image?: string;
  tags: string[];
  bullets: string[];
};

export const highlights: Highlight[] = [
  {
    slug: "helpwise",
    title: "Helpwise",
    org: "Multi-Tenant B2B Help Desk SaaS",
    tags: ["Next.js 16.2", "TypeScript", "Prisma 7", "PostgreSQL", "Claude API"],
    bullets: [
      "Subdomain→tenant resolution at the edge with Redis-cached lookups; a Prisma extension auto-injects tenantId into every query, with PostgreSQL RLS as a backstop.",
      "Dual-audience auth: separate agent and customer guards with distinct JWTs — internal notes never leak to the customer portal, enforced at the query level.",
      "Concurrency-safe ticketing via row-locked counters and idempotent outbound email to prevent double-sends under queue retries.",
    ],
  },
  {
    slug: "b2b-supply-chain",
    title: "B2B Wholesale & Supply Chain Platform",
    org: "Enterprise procurement platform",
    tags: ["Next.js 16.2", "TypeScript", "Prisma 7", "Supabase", "Sentry"],
    bullets: [
      "End-to-end type safety with Prisma 7 schema-first access and a consistent { data, error } response contract.",
      "4-stage GitHub Actions CI/CD (Lint → Typecheck → Test → Build) plus a Playwright E2E suite over 15+ critical flows.",
      "Normalized 5-entity schema with a 4-stage order lifecycle and multi-role RBAC secured at the server-action level.",
    ],
  },
];
