export const profile = {
  name: "Nattapon Sopontanapat",
  role: "Junior Full-Stack Developer",
  location: "Phetchabun, Thailand",
  email: "chopchat.dev@gmail.com",
  phone: "091-0303399",
  github: "https://github.com/chopchobs",
  linkedin: "https://www.linkedin.com/in/nattapon-sopontanapat-8b98832a5/",
  resumeUrl: "/Nattapon_Sopontanapat_Resume.pdf",
  // set to "/images/profile.jpg" when the photo is added; empty shows the initials placeholder
  image: "/images/profile.jpg",
  tagline:
    "Self-taught full-stack developer — TypeScript-first, production-grade apps with Next.js and the PERN stack.",
  story: [
    "I'm a self-taught developer who cares about clean code, observability, and systems that stay maintainable long after launch. I've shipped four end-to-end platforms — a B2B procurement system, an EV catalog CMS, an e-commerce marketplace, and a multi-tenant help desk SaaS — each enforcing strict type safety, automated CI/CD, and role-based access control from day one.",
    "What I bring that's a little different: real business-operations experience from running a family parts business, paired with AI-augmented development workflows (Claude Code, multi-agent pipelines, prompt engineering) that speed up delivery without cutting corners on architecture.",
  ],
  quickFacts: [
    { label: "Experience", value: "Self-taught, 2024–now" },
    { label: "Location", value: "Phetchabun, Thailand" },
    { label: "Projects shipped", value: "4 platforms" },
    { label: "Availability", value: "Open to work" },
  ],
} as const;
