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

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { href: '/', label: 'Accueil' },
    { href: '/services', label: 'Services' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <nav className="bg-background border-b select-none sticky top-0">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <a href="/" draggable={false} className="text-primary text-2xl font-bold">
              Logo
            </a>
          </div>

          {/* Nav */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map((item) => (
                <Button key={item.href} variant="link" asChild>
                  <a href={item.href} draggable={false}>
                    {item.label}
                  </a>
                </Button>
              ))}
            </div>
          </div>

          {/* Mobile */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="cursor-pointer">
                  <Menu className="size-6" />
                  <span className="sr-only">Ouvrir le menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="top">
                <SheetTitle className="sr-only">Menu de navigation</SheetTitle>
                <SheetDescription className="sr-only">
                  Menu principal du site contenant les liens de navigation
                </SheetDescription>
                <div className="mt-12 flex flex-col space-y-4">
                  {navItems.map((item) => (
                    <Button key={item.href} variant="link" asChild onClick={() => setIsOpen(false)}>
                      <a href={item.href} draggable={false}>
                        {item.label}
                      </a>
                    </Button>
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
