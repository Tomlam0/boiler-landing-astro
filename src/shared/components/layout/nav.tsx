'use client';

import { useState, useEffect } from 'react';
import { Menu } from 'lucide-react';

import { Button } from '@/shared/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetDescription,
} from '@/shared/components/ui/sheet';

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navItems = [
    { href: '/', label: 'Accueil' },
    { href: '/services', label: 'Services' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <nav
      className="fixed top-0 right-0 left-0 z-50 transition-all select-none"
      style={{
        transitionProperty: 'background-color, border-color, backdrop-filter',
        transitionDuration: '300ms',
        transitionTimingFunction: 'cubic-bezier(0.25, 1, 0.5, 1)',
        backgroundColor: scrolled ? 'oklch(97.5% 0.008 70 / 0.85)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid oklch(88% 0.012 65 / 0.5)' : '1px solid transparent',
      }}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex h-18 items-center justify-between">
          {/* Logo — serif for brand presence */}
          <a
            href="/"
            draggable={false}
            className="font-heading text-2xl text-foreground transition-opacity hover:opacity-70"
          >
            Logo
          </a>

          {/* Desktop nav */}
          <div className="hidden items-center gap-8 md:flex">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                draggable={false}
                className="text-sm font-medium text-muted-foreground transition-colors
                  hover:text-foreground"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Mobile menu */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="cursor-pointer">
                  <Menu className="size-5" />
                  <span className="sr-only">Ouvrir le menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="top" className="bg-background/95 backdrop-blur-lg">
                <SheetTitle className="sr-only">Menu de navigation</SheetTitle>
                <SheetDescription className="sr-only">
                  Menu principal du site contenant les liens de navigation
                </SheetDescription>
                <div className="mt-16 flex flex-col items-center gap-8">
                  {navItems.map((item) => (
                    <a
                      key={item.href}
                      href={item.href}
                      draggable={false}
                      onClick={() => setIsOpen(false)}
                      className="font-heading text-3xl text-foreground transition-opacity
                        hover:opacity-70"
                    >
                      {item.label}
                    </a>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
