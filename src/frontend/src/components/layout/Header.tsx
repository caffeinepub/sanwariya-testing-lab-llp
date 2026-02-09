import { useState } from 'react';
import { Link, useRouterState } from '@tanstack/react-router';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import { COMPANY_INFO } from '@/lib/companyInfo';
import { USER_LOGO_PATH } from '@/lib/branding';

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'Services', path: '/services' },
  { label: 'Book a Test', path: '/book-a-test' },
  { label: 'Contact Us', path: '/contact' },
];

export default function Header() {
  const routerState = useRouterState();
  const [open, setOpen] = useState(false);

  const isActive = (path: string) => {
    const currentPath = routerState.location.pathname;
    if (path === '/') {
      return currentPath === '/';
    }
    return currentPath.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-20 items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <img
            src={USER_LOGO_PATH}
            alt={`${COMPANY_INFO.name} Logo`}
            className="h-12 w-12 object-contain"
          />
          <div className="flex flex-col">
            <span className="text-lg font-bold leading-tight text-foreground">
              {COMPANY_INFO.shortName}
            </span>
            <span className="text-xs text-muted-foreground">Cable & Wire Testing</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <Link key={link.path} to={link.path}>
              <Button
                variant={isActive(link.path) ? 'default' : 'ghost'}
                className="font-medium"
              >
                {link.label}
              </Button>
            </Link>
          ))}
        </nav>

        {/* Mobile Navigation */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[280px] sm:w-[320px]">
            <div className="flex items-center justify-between mb-8">
              <span className="text-lg font-bold">{COMPANY_INFO.shortName}</span>
              <SheetClose asChild>
                <Button variant="ghost" size="icon">
                  <X className="h-5 w-5" />
                </Button>
              </SheetClose>
            </div>
            <nav className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <SheetClose asChild key={link.path}>
                  <Link to={link.path}>
                    <Button
                      variant={isActive(link.path) ? 'default' : 'ghost'}
                      className="w-full justify-start font-medium"
                    >
                      {link.label}
                    </Button>
                  </Link>
                </SheetClose>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
