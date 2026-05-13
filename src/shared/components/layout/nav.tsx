'use client';

import { useState } from 'react';
import { Menu } from 'lucide-react';

import { Button } from '@/shared/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetDescription,
} from '@/shared/components/ui/sheet';
import { cn } from '@/shared/lib/utils';

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { href: '/', label: 'Accueil' },
    { href: '/blog', label: 'Blog' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <nav className="bg-background/80 sticky top-0 z-10 backdrop-blur-md select-none">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="flex h-18 items-center justify-between">
          {/* Logo */}
          <a
            href="/"
            draggable={false}
            className="font-heading text-foreground text-xl font-semibold tracking-tight
              transition-opacity duration-200 hover:opacity-70"
          >
            Logo
          </a>

          {/* Desktop nav */}
          <div className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                draggable={false}
                className={cn(
                  'text-muted-foreground hover:text-foreground rounded-md px-4 py-2 text-sm',
                  'transition-colors duration-200'
                )}
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Mobile */}
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
                <div className="mt-12 flex flex-col gap-2">
                  {navItems.map((item) => (
                    <a
                      key={item.href}
                      href={item.href}
                      draggable={false}
                      onClick={() => setIsOpen(false)}
                      className="text-foreground font-heading rounded-md px-4 py-3 text-2xl
                        font-medium transition-opacity duration-200 hover:opacity-60"
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
