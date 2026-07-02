"use client";

import { useRef } from "react";
import { Briefcase, GraduationCap } from "lucide-react";
import { motion, useScroll, useSpring } from "framer-motion";
import type { TimelineItem } from "@/content/experience";
import { Reveal } from "@/components/ui/Reveal";

export function Timeline({ items }: { items: TimelineItem[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 80%", "end 60%"],
  });
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div ref={ref} className="relative pl-8">
      {/* track + animated progress overlay on the left rail */}
      <div
        aria-hidden="true"
        className="absolute left-0 top-0 h-full w-px bg-border"
      />
      <motion.div
        aria-hidden="true"
        style={{ scaleY }}
        className="absolute left-0 top-0 h-full w-px origin-top bg-clay"
      />

      {items.map((item, i) => {
        const Icon = item.kind === "education" ? GraduationCap : Briefcase;
        return (
          <Reveal key={i} delay={i * 0.05}>
            <div className="group relative mb-12 last:mb-0">
              <span className="absolute -left-[41px] flex h-6 w-6 items-center justify-center rounded-full border border-border bg-bg text-clay transition-colors group-hover:border-clay">
                <Icon size={13} />
              </span>
              <p className="text-sm text-warm-gray">{item.period}</p>
              <h3 className="mt-1 text-lg font-normal">{item.title}</h3>
              <p className="text-sm text-clay">{item.org}</p>
              <ul className="mt-3 space-y-2">
                {item.points.map((p, j) => (
                  <li key={j} className="text-slate">
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        );
      })}
    </div>
  );
}
