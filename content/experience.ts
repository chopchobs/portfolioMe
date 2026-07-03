export type TimelineItem = {
  period: string;
  title: string;
  org: string;
  kind: "work" | "education";
  points: string[];
};

// Ordered most-recent first, leading with the work most relevant to a
// development role.
export const experience: TimelineItem[] = [
  {
    period: "Oct 2024 – Present",
    title: "Independent Study & Professional Development",
    org: "Self-directed",
    kind: "education",
    points: [
      "Intensive self-directed study of the PERN stack, Next.js App Router, Docker, system architecture, and security best practices.",
      "Active contributor on GitHub with 519 contributions in the last year.",
    ],
  },
  {
    period: "2022 – Present",
    title: "Family Business Operation (Freelance / Manager)",
    org: "Heavy Vehicle Parts Business",
    kind: "work",
    points: [
      "Managed daily operations, procurement, and financial records — experience that shaped a data-driven approach to inventory systems and a real understanding of supply chain workflows that directly informed the B2B platform project.",
    ],
  },
  {
    period: "Graduated 2022",
    title: "Bachelor of Business Administration (B.B.A.)",
    org: "Assumption University (ABAC), Bangkok",
    kind: "education",
    points: ["International Program."],
  },
  {
    period: "2020 – 2021",
    title: "Internship Trainee (F&B)",
    org: "Grand Mercure, Avani",
    kind: "work",
    points: [
      "Collaborated with the team to ensure high standards of customer service.",
      "Developed strong communication and time management under pressure.",
    ],
  },
];
