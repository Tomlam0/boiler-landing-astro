import { SOCIAL_ICONS } from '@/shared/lib/social-icons';

const currentYear = new Date().getFullYear();

interface SocialLinks {
  twitter?: string | null;
  linkedin?: string | null;
  github?: string | null;
  instagram?: string | null;
  facebook?: string | null;
  youtube?: string | null;
}

interface FooterProps {
  copyright?: string;
  social?: SocialLinks;
}

const SOCIAL_LINKS = [
  { key: 'twitter', label: 'X (Twitter)', Icon: SOCIAL_ICONS.twitter },
  { key: 'linkedin', label: 'LinkedIn', Icon: SOCIAL_ICONS.linkedin },
  { key: 'github', label: 'GitHub', Icon: SOCIAL_ICONS.github },
  { key: 'instagram', label: 'Instagram', Icon: SOCIAL_ICONS.instagram },
  { key: 'facebook', label: 'Facebook', Icon: SOCIAL_ICONS.facebook },
  { key: 'youtube', label: 'YouTube', Icon: SOCIAL_ICONS.youtube },
] as const;

export default function Footer({ copyright, social }: FooterProps) {
  const visibleSocials = SOCIAL_LINKS.map((s) => ({ ...s, href: social?.[s.key] })).filter(
    (s) => Boolean(s.href),
  );

  return (
    <footer className="border-border/50 border-t select-none">
      <div className="mx-auto max-w-6xl px-6 py-16 lg:px-8">
        <div className="flex flex-col items-center gap-8 md:flex-row md:justify-between">
          {/* Brand */}
          <div className="flex flex-col items-center gap-2 md:items-start">
            <span className="font-heading text-foreground text-lg font-semibold tracking-tight">
              Logo
            </span>
            <p className="text-muted-foreground text-sm">
              &copy; {currentYear} {copyright}
            </p>
          </div>

          {/* Social */}
          {visibleSocials.length > 0 ? (
            <div className="flex items-center gap-1">
              {visibleSocials.map(({ key, label, Icon, href }) => (
                <a
                  key={key}
                  href={href!}
                  title={label}
                  target="_blank"
                  rel="noreferrer noopener"
                  draggable={false}
                  className="text-muted-foreground hover:text-foreground flex size-9 items-center
                    justify-center rounded-md transition-colors duration-200"
                >
                  <Icon className="size-5" />
                  <span className="sr-only">{label}</span>
                </a>
              ))}
            </div>
          ) : null}

          {/* Links */}
          <div className="flex items-center gap-6">
            <a
              href="/mentions-legales"
              draggable={false}
              className="text-muted-foreground hover:text-foreground text-sm transition-colors
                duration-200"
            >
              Mentions l&eacute;gales
            </a>
            <a
              href="/contact"
              draggable={false}
              className="text-muted-foreground hover:text-foreground text-sm transition-colors
                duration-200"
            >
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
