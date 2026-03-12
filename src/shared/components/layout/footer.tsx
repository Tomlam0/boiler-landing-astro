import { Button } from '@/shared/components/ui/button';

const currentYear = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="border-t bg-background select-none">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="md:flex md:items-center md:justify-between">
          <div className="flex justify-center space-x-6 md:order-2">
            <Button variant="link" asChild>
              <a href="/mentions-legales" draggable={false}>
                Mentions légales
              </a>
            </Button>
          </div>
          <div className="mt-8 md:order-1 md:mt-0">
            <p className="text-center text-base text-foreground">
              &copy; {currentYear} Site. Tous droits réservés.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
