export type SkillGroup = {
  category: string;
  items: string[];
};

export const skills: SkillGroup[] = [
  {
    category: "AI & Agentic Workflows",
    items: [
      "Claude Code",
      "AI Coding Agents (Subagents)",
      "Workflow Automation",
      "Prompt Engineering",
    ],
  },
  {
    category: "Languages",
    items: ["JavaScript (ES6+)", "TypeScript", "SQL", "HTML5", "CSS3"],
  },
  {
    category: "Frontend",
    items: [
      "React (Vite)",
      "Next.js (App Router)",
      "Tailwind CSS",
      "Zustand",
      "Framer Motion",
      "Radix UI",
    ],
  },
  {
    category: "Backend & Database",
    items: [
      "Node.js",
      "Express.js",
      "RESTful APIs",
      "PostgreSQL",
      "Supabase",
      "Prisma ORM",
      "Redis (Upstash)",
      "Stripe",
      "Cloudinary",
    ],
  },
  {
    category: "DevOps & Testing",
    items: [
      "Git & GitHub",
      "Vercel",
      "Render",
      "Docker (multi-stage)",
      "GitHub Actions (CI/CD)",
      "Playwright",
      "Vitest",
      "Sentry",
      "Upstash QStash",
    ],
  },
  {
    category: "Security & Architecture",
    items: [
      "RBAC",
      "Multi-Tenant Isolation",
      "Zod (validation)",
      "Clean Architecture",
    ],
  },
];
