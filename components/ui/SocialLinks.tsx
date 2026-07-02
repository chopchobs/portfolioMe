import { Github, Linkedin, Mail } from "lucide-react";

type SocialLinksProps = {
  github?: string;
  linkedin?: string;
  email?: string;
  className?: string;
};

const linkClass =
  "inline-flex h-10 w-10 items-center justify-center rounded-full border-[0.5px] border-border text-slate transition-colors hover:border-clay hover:bg-surface hover:text-clay focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-clay";

export function SocialLinks({
  github,
  linkedin,
  email,
  className,
}: SocialLinksProps) {
  return (
    <nav aria-label="Social links" className={`flex items-center gap-3 ${className ?? ""}`}>
      {github ? (
        <a
          href={github}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub profile"
          className={linkClass}
        >
          <Github size={18} />
        </a>
      ) : null}
      {linkedin ? (
        <a
          href={linkedin}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn profile"
          className={linkClass}
        >
          <Linkedin size={18} />
        </a>
      ) : null}
      {email ? (
        <a href={`mailto:${email}`} aria-label="Email" className={linkClass}>
          <Mail size={18} />
        </a>
      ) : null}
    </nav>
  );
}
