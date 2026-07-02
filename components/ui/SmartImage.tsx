"use client";

import Image from "next/image";
import { useState } from "react";
import type { ReactNode } from "react";

type SmartImageProps = {
  src?: string;
  alt: string;
  fallback: ReactNode;
  className?: string;
  sizes?: string;
  priority?: boolean;
};

// Renders a next/image with graceful fallback. If `src` is missing, or the
// image fails to load (e.g. the real file isn't in public/ yet → 404), the
// caller-provided `fallback` is shown instead of a broken image. Drop the real
// file into public/ later and it appears with no code change.
export function SmartImage({
  src,
  alt,
  fallback,
  className,
  sizes,
  priority,
}: SmartImageProps) {
  const [errored, setErrored] = useState(false);

  if (!src || errored) {
    return <>{fallback}</>;
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      priority={priority}
      onError={() => setErrored(true)}
      className={`object-cover ${className ?? ""}`.trim()}
    />
  );
}
