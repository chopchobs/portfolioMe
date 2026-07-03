"use client";

import { Home, User, Briefcase, FolderGit2, Mail } from "lucide-react";
import { useActiveSection } from "@/lib/useActiveSection";

const items = [
  { id: "hero", label: "Home", Icon: Home },
  { id: "about", label: "About", Icon: User },
  { id: "experience", label: "Experience", Icon: Briefcase },
  { id: "projects", label: "Projects", Icon: FolderGit2 },
  { id: "contact", label: "Contact", Icon: Mail },
];

const ids = items.map((i) => i.id);

export function SideDock() {
  const active = useActiveSection(ids);

  return (
    <nav
      aria-label="Section navigation"
      className="fixed bottom-4 left-1/2 z-50 flex -translate-x-1/2 flex-row gap-1 rounded-full border border-border bg-bg/80 p-2 backdrop-blur md:bottom-auto md:left-auto md:right-4 md:top-1/2 md:translate-x-0 md:-translate-y-1/2 md:flex-col"
    >
      {items.map(({ id, label, Icon }) => {
        const isActive = active === id;
        return (
          <a
            key={id}
            href={`#${id}`}
            aria-label={label}
            aria-current={isActive ? "true" : undefined}
            className={`group relative flex h-10 w-10 items-center justify-center rounded-full transition-colors ${
              isActive
                ? "bg-clay text-bg"
                : "text-slate hover:bg-surface hover:text-ink"
            }`}
          >
            <Icon size={18} />
            <span
              aria-hidden="true"
              className="pointer-events-none absolute right-full mr-3 hidden whitespace-nowrap rounded-md border border-border bg-bg px-2 py-1 text-xs font-medium text-ink opacity-0 transition-opacity duration-200 group-hover:opacity-100 md:block"
            >
              {label}
            </span>
          </a>
        );
      })}
    </nav>
  );
}
