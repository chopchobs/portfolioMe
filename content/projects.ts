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
  /** Case-study fields (optional) — power the /projects/[slug] deep-dive page. */
  /** The context / problem the project solves. */
  problem?: string;
  /** Architecture / how the project was approached. */
  approach?: string;
  /** Notable trade-offs made, with the reasoning behind each. */
  decisions?: { title: string; why: string }[];
  /** Extra screenshot paths (reserved for future use — currently unused). */
  gallery?: string[];
  /** Concrete, grounded results. */
  outcomes?: string[];
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
    image: "/images/helpwise.png",
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
      github: "https://github.com/chopchobs/Helpwise",
    },
    problem:
      "A B2B help desk has to serve many tenant companies from one deployment while keeping each tenant's data fully isolated — and within a single tenant it has to separate two very different audiences: internal agents and external customers. Internal notes must never surface in the customer portal, and support has to honour business-hours SLAs.",
    approach:
      "Each tenant lives on its own subdomain, resolved at the edge with Redis-cached lookups before a request reaches the app. A Prisma client extension auto-injects tenantId into every query, backed by PostgreSQL row-level security. Agent and customer access run through separate auth guards, and outbound work (email, SLA sweeps, billing) is handled by signature-verified queue workers.",
    decisions: [
      {
        title: "Defense-in-depth tenant isolation",
        why: "A Prisma client extension auto-injects tenantId into every query so app code can't forget it, and PostgreSQL RLS acts as a DB-level backstop if a query ever slips through — isolation holds even when a single layer is wrong.",
      },
      {
        title: "Edge subdomain→tenant resolution with Redis cache",
        why: "Resolving the tenant at the edge and caching lookups in Redis avoids a database round-trip on every request while keeping the mapping fast to update.",
      },
      {
        title: "Dual-audience auth enforced at the query level",
        why: "Agent and customer sessions use distinct JWT audiences and cookies, and the internal/customer boundary is enforced in the query — not the UI — so internal notes can't leak through a client bug.",
      },
      {
        title: "Idempotent workers and a unique-event billing ledger",
        why: "QStash workers are signature-verified and fail-closed, and Stripe billing is keyed to a unique-event ledger — so queue retries and webhook replays can't double-send email or double-bill.",
      },
    ],
    outcomes: [
      "Live with two explorable demo workspaces.",
      "Tenant isolation enforced at both the application and the database level.",
      "Concurrency-safe ticketing that eliminates double-sends under queue retries.",
    ],
  },
  {
    slug: "b2b-supply-chain",
    title: "B2B Wholesale & Supply Chain Platform",
    tagline: "Enterprise procurement, end to end",
    mark: "B2B",
    featured: true,
    image: "/images/b2b-supply-chain.png",
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
      live: "https://b2b-wholesale-supply-chain.vercel.app",
      github: "https://github.com/chopchobs/B2B-Wholesale-Supply-Chain",
    },
    problem:
      "Enterprise procurement spans the full supply chain lifecycle — purchase orders, multi-role fulfillment, supplier coordination, invoicing, and analytics. With many roles acting on the same orders, the platform needs a normalized model, strict authorization, and a codebase reliable enough to avoid runtime type errors in production.",
    approach:
      "A schema-first Prisma 7 model gives end-to-end type safety across a normalized 5-entity schema with a 4-stage order lifecycle. Every server action returns a consistent { data, error } contract and is guarded by multi-role RBAC. A 4-stage CI/CD pipeline and Sentry observability keep the pipeline and production healthy.",
    decisions: [
      {
        title: "End-to-end type safety with a { data, error } contract",
        why: "Prisma 7 schema-first access plus one consistent response contract removes whole classes of runtime type errors and makes call sites predictable — the platform runs with zero runtime type errors in production.",
      },
      {
        title: "RBAC secured at the server-action level",
        why: "Authorization lives in the server action rather than the UI, so multi-role access rules can't be bypassed from the client.",
      },
      {
        title: "4-stage CI/CD gate plus Playwright E2E",
        why: "Lint → Typecheck → Test → Build blocks every merge that regresses, and a Playwright suite over ~15+ critical flows guards the real user paths.",
      },
      {
        title: "Sentry observability across the stack",
        why: "Source maps, session replay, and edge instrumentation give production visibility into errors as they actually happen for users.",
      },
    ],
    outcomes: [
      "Zero runtime type errors in production.",
      "Playwright E2E coverage over ~15+ critical flows.",
      "4-stage CI/CD gating every change before it ships.",
    ],
  },
  {
    slug: "ev-catalog",
    title: "EV Car Catalog & Admin Dashboard",
    tagline: "Secure B2B catalog CMS",
    mark: "EV",
    featured: false,
    image: "/images/ev-catalog.png",
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
      live: "https://ev-car-catalog.vercel.app",
      github: "https://github.com/chopchobs/ev-car-catalog",
    },
    problem:
      "A B2B EV car catalog needs a content management system that stays secure end to end — validating and authorizing every write, isolating business logic from third-party services, and shipping in a hardened, reproducible runtime.",
    approach:
      "API routes and Server Actions are protected by RBAC and strict Zod validation, with business logic kept separate from third-party integrations. Storage writes roll back orphaned files on failure, and the app ships in a hardened multi-stage Docker image deployed to Vercel with zero-downtime releases.",
    decisions: [
      {
        title: "RBAC plus strict Zod validation at every entry point",
        why: "Applying role checks and Zod schemas on both API routes and Server Actions validates and authorizes writes at the boundary rather than trusting inputs deeper in the stack.",
      },
      {
        title: "Clean architecture separating business logic from services",
        why: "Isolating business logic from third-party services keeps the core testable and lets integrations be swapped without rippling changes through the domain.",
      },
      {
        title: "Fail-safe storage with orphaned-file rollback",
        why: "Rolling back orphaned files inside a try/catch on failed writes prevents cloud storage leaks when an operation fails midway.",
      },
      {
        title: "Hardened multi-stage Docker image",
        why: "Non-root execution and optimized image layers reduce the attack surface and produce a smaller, reproducible runtime.",
      },
    ],
    outcomes: [
      "Deployed to Vercel with zero-downtime releases.",
      "Hardened container running as a non-root user.",
    ],
  },
  {
    slug: "ecommerce-marketplace",
    title: "E-Commerce Marketplace Platform",
    tagline: "Decoupled B2C, discovery to payment",
    mark: "EC",
    featured: false,
    image: "/images/ecommerce-marketplace.png",
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
      live: "https://e-commerce-market-place-nine.vercel.app",
      github: "https://github.com/chopchobs/e-commerce-market-place",
    },
    problem:
      "A B2C marketplace has to support the complete shopping lifecycle — from product discovery through to payment — while demonstrating a decoupled client/server architecture and RESTful API design distinct from Next.js Server Actions.",
    approach:
      "The client and server are decoupled, with a structured Express.js backend exposing a RESTful API separated into controllers, routes, and middleware. Payments run through a live Stripe integration with webhook handling, and the whole system is deployed across multiple services.",
    decisions: [
      {
        title: "Decoupled client/server with a RESTful API",
        why: "Keeping a standalone REST API distinct from Next.js Server Actions demonstrates API design independent of framework conventions and keeps the client and server free to evolve separately.",
      },
      {
        title: "Layered Express.js backend",
        why: "Separating controllers, routes, and middleware keeps request handling maintainable and each concern testable in isolation.",
      },
      {
        title: "Stripe webhook handling with order confirmation",
        why: "Confirming orders from Stripe webhooks — tested end to end — makes payment state reliable rather than assuming the client-side redirect succeeded.",
      },
    ],
    outcomes: [
      "Live Stripe integration tested end to end.",
      "Full back-office across 4 management modules with RBAC.",
      "Multi-service production deployment across Vercel, Render, and Cloudinary.",
    ],
  },
];
