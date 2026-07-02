import { Mail, Phone, MapPin } from "lucide-react";
import { profile } from "@/content/profile";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { Reveal } from "@/components/ui/Reveal";

export function Contact() {
  return (
    <section
      id="contact"
      className="bg-surface/50 py-24 sm:py-32"
    >
      <div className="mx-auto max-w-5xl px-6">
        <Reveal>
          <SectionHeading eyebrow="Contact" title="Get in touch" />
        </Reveal>

        <Reveal>
          <p className="max-w-2xl text-lg text-slate">
            Open to work opportunities and always happy to talk shop. Reach out
            and I&apos;ll get back to you.
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            <a
              href={`mailto:${profile.email}`}
              className="flex items-center gap-3 rounded-xl border border-border bg-bg p-4 transition-colors hover:border-clay"
            >
              <Mail size={18} className="text-clay" />
              <span className="text-sm text-ink">{profile.email}</span>
            </a>
            <a
              href={`tel:${profile.phone}`}
              className="flex items-center gap-3 rounded-xl border border-border bg-bg p-4 transition-colors hover:border-clay"
            >
              <Phone size={18} className="text-clay" />
              <span className="text-sm text-ink">{profile.phone}</span>
            </a>
            <div className="flex items-center gap-3 rounded-xl border border-border bg-bg p-4">
              <MapPin size={18} className="text-clay" />
              <span className="text-sm text-ink">{profile.location}</span>
            </div>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Button href={`mailto:${profile.email}`}>
              <Mail size={16} /> Send a message
            </Button>
            <SocialLinks github={profile.github} linkedin={profile.linkedin} />
          </div>
        </Reveal>

        <p className="mt-20 text-sm text-warm-gray">
          © {new Date().getFullYear()} {profile.name}. Built with Next.js &
          Tailwind CSS.
        </p>
      </div>
    </section>
  );
}
