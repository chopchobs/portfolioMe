export type Project = {
  slug: string;
  title: string;
  tagline: string;
  /** Short monogram used by the branded card panel when no screenshot exists. */
  mark: string;
  featured: boolean;
  description: string;
  image?: string;
  tech: string[];
  highlights: string[];
  links: {
    live?: string;
    github?: string;
    api?: string;
  };
};

// featured projects render first and larger. TODO links are left empty so the
// buttons hide automatically until real URLs are added.
export const projects: Project[] = [
  {
    slug: "helpwise",
    title: "Helpwise",
    tagline: "Multi-Tenant B2B Help Desk SaaS",
    mark: "Hw",
    featured: true,
    description:
      "A production multi-tenant help desk SaaS with subdomain-per-tenant isolation, two separate audiences (agent workspace + customer portal), AI-assisted triage, and business-hours SLA tracking — live with two explorable demo workspaces.",
    tech: [
      "Next.js 16.2",
      "TypeScript",
      "Prisma 7",
      "PostgreSQL",
      "Redis (Upstash)",
      "QStash",
      "Stripe",
      "Claude API",
      "Tailwind v4",
      "Vitest",
    ],
    highlights: [
      "Subdomain→tenant resolution at the edge with Redis-cached lookups; a Prisma client extension auto-injects tenantId into every query, with PostgreSQL RLS as a DB-level backstop.",
      "Dual-audience auth: separated agent and customer guards with distinct JWT audiences and cookies — internal notes never leak to the customer portal (enforced at query level, not UI).",
      "Concurrency-safe ticketing via row-locked counters and idempotent outbound email to eliminate double-sends under queue retries.",
      "Signature-verified, fail-closed QStash workers for outbound email and SLA-breach sweeps; idempotent Stripe billing with a unique-event ledger.",
    ],
    links: {
      live: "https://gethelpwise.xyz",
      github: "",
    },
  },
  {
    slug: "b2b-supply-chain",
    title: "B2B Wholesale & Supply Chain Platform",
    tagline: "Enterprise procurement, end to end",
    mark: "B2B",
    featured: true,
    description:
      "An enterprise-grade B2B procurement platform covering the full supply chain lifecycle — purchase orders, multi-role fulfillment, supplier coordination, invoicing, and analytics — with zero runtime type errors in production.",
    tech: [
      "Next.js 16.2",
      "TypeScript",
      "Prisma 7",
      "Supabase",
      "Tailwind v4",
      "Zustand",
      "Zod",
      "Sentry",
      "GitHub Actions",
    ],
    highlights: [
      "End-to-end type safety with Prisma 7 schema-first access and a consistent { data, error } response contract.",
      "4-stage GitHub Actions CI/CD (Lint → Typecheck → Test → Build) plus a Playwright E2E suite over ~15+ critical flows.",
      "Sentry observability with source maps, session replay, and edge instrumentation.",
      "Normalized 5-entity schema with a 4-stage order lifecycle and multi-role RBAC secured at the server-action level.",
    ],
    links: {
      live: "",
      github: "",
    },
  },
  {
    slug: "ev-catalog",
    title: "EV Car Catalog & Admin Dashboard",
    tagline: "Secure B2B catalog CMS",
    mark: "EV",
    featured: false,
    description:
      "A production-ready B2B EV car catalog with a secure CMS — containerized with a hardened multi-stage Docker setup and deployed to Vercel with zero-downtime releases.",
    tech: ["Next.js 15", "Prisma ORM", "Supabase", "Zod", "Tailwind CSS", "Docker"],
    highlights: [
      "RBAC on API routes and Server Actions with strict Zod validation.",
      "Clean architecture separating business logic from third-party services.",
      "Fail-safe storage: orphaned-file rollback inside try/catch prevents cloud storage leaks on failed writes.",
      "Multi-stage Docker build with non-root user execution and optimized image layers.",
    ],
    links: {
      live: "",
      github: "",
    },
  },
  {
    slug: "ecommerce-marketplace",
    title: "E-Commerce Marketplace Platform",
    tagline: "Decoupled B2C, discovery to payment",
    mark: "EC",
    featured: false,
    description:
      "A full-stack B2C e-commerce platform with a decoupled client/server architecture — demonstrating RESTful API design distinct from Next.js Server Actions, supporting the complete shopping lifecycle from discovery to payment.",
    tech: [
      "React (Vite)",
      "Node.js",
      "Express.js",
      "PostgreSQL",
      "Prisma ORM",
      "Cloudinary",
      "Stripe",
      "Zustand",
      "Zod",
    ],
    highlights: [
      "Structured Express.js backend with separated controllers, routes, and middleware layers.",
      "Live Stripe integration with webhook handling and order confirmation — tested end-to-end.",
      "Full back-office covering 4 management modules (product, category, order, user) with RBAC.",
      "Multi-service production deployment: frontend on Vercel, backend on Render, media on Cloudinary.",
    ],
    links: {
      live: "",
      github: "",
      api: "",
    },
  },
];
