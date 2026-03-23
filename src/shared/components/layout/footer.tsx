const currentYear = new Date().getFullYear();

const footerLinks = [
  { href: '/mentions-legales', label: 'Mentions légales' },
  { href: '/contact', label: 'Contact' },
];

export default function Footer() {
  return (
    <footer className="border-t select-none">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="flex flex-col items-center gap-8 md:flex-row md:justify-between">
          {/* Brand */}
          <a
            href="/"
            draggable={false}
            className="font-heading text-xl text-foreground transition-opacity hover:opacity-70"
          >
            Logo
          </a>

          {/* Links */}
          <div className="flex items-center gap-8">
            {footerLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                draggable={false}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Copyright */}
          <p className="text-sm text-muted-foreground">&copy; {currentYear} Site</p>
        </div>
      </div>
    </footer>
  );
}
