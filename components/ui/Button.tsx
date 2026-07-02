import Link from "next/link";
import type { ReactNode } from "react";

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary";
  external?: boolean;
};

export function Button({
  href,
  children,
  variant = "primary",
  external = false,
}: ButtonProps) {
  const base =
    "inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-clay";
  const styles =
    variant === "primary"
      ? "bg-clay text-bg hover:bg-clay-hover"
      : "border border-border bg-transparent text-ink hover:bg-surface";

  const rel = external ? "noopener noreferrer" : undefined;
  const target = external ? "_blank" : undefined;

  return (
    <Link href={href} className={`${base} ${styles}`} rel={rel} target={target}>
      {children}
    </Link>
  );
}
