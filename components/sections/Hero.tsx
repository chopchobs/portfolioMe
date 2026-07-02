"use client";

import { ArrowDown, Download } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { profile } from "@/content/profile";
import { Button } from "@/components/ui/Button";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { SmartImage } from "@/components/ui/SmartImage";

export function Hero() {
  const reduce = useReducedMotion();

  const container = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: reduce ? 0 : 0.08,
        delayChildren: reduce ? 0 : 0.05,
      },
    },
  };
  const item = {
    hidden: { opacity: 0, y: reduce ? 0 : 18 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: reduce ? 0 : 0.6, ease: [0.22, 1, 0.36, 1] as const },
    },
  };

  return (
    <section
      id="hero"
      className="mx-auto flex min-h-screen max-w-6xl flex-col justify-center px-6 py-28 sm:py-32"
    >
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[minmax(0,22rem)_1fr] lg:gap-14"
      >
        <motion.div
          variants={item}
          className="relative order-2 mx-auto w-full max-w-xs overflow-hidden rounded-xl border border-border lg:order-1 lg:mx-0 lg:max-w-none"
          style={{ aspectRatio: "4 / 5" }}
        >
          <SmartImage
            src={profile.image || undefined}
            alt="Portrait of Nattapon Sopontanapat"
            sizes="(max-width:1024px) 100vw, 22rem"
            priority
            fallback={
              <div className="flex h-full w-full items-center justify-center bg-sage">
                <span className="font-serif text-7xl font-normal text-ink">
                  NS
                </span>
              </div>
            }
          />
        </motion.div>

        <div className="order-1 lg:order-2">
          <motion.div
            variants={item}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-3 py-1"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-clay opacity-60 motion-safe:animate-ping" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-clay" />
            </span>
            <span className="text-xs font-medium text-slate">
              Open to work
            </span>
          </motion.div>

          <motion.p
            variants={item}
            className="mb-4 text-sm font-medium uppercase tracking-widest text-clay"
          >
            Hello, I&apos;m
          </motion.p>
          <motion.h1
            variants={item}
            className="text-5xl font-normal leading-[1.05] sm:text-6xl lg:text-7xl"
          >
            {profile.name}
          </motion.h1>
          <motion.p
            variants={item}
            className="mt-5 text-2xl text-slate sm:text-3xl"
          >
            {profile.role}
          </motion.p>
          <motion.p
            variants={item}
            className="mt-6 max-w-xl text-lg leading-relaxed text-slate"
          >
            {profile.tagline}
          </motion.p>

          <motion.div
            variants={item}
            className="mt-12 flex flex-wrap items-center gap-4"
          >
            <Button href="#projects">
              View my work <ArrowDown size={16} />
            </Button>
            <Button href={profile.resumeUrl} variant="secondary" external>
              Download resume <Download size={16} />
            </Button>
            <SocialLinks github={profile.github} linkedin={profile.linkedin} />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
