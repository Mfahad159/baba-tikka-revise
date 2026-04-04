'use client';

// NavBarClient
// Redesigned with brand tokens and standardized colors globally.

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ShoppingCart } from 'lucide-react';
import { Logo } from '@/components/ui/Logo';
import { ThemeToggle } from '@/components/ThemeToggle';
import { useCart } from '@/hooks/useCart';
import { useIsMobile } from '@/hooks/useIsMobile';

const NAV_LINKS = [
  { label: 'Home', href: '/#home', sectionId: 'home' },
  { label: 'Our Story', href: '/story' },
  { label: 'Menu', href: '/menu', sectionId: 'menu' },
  { label: 'Testimonials', href: '/#testimonials', sectionId: 'testimonials' },
  { label: 'Branches', href: '/#branches', sectionId: 'branches' },
];

const SCROLL_THRESHOLD = 40;

export function NavBarClient() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('home');
  const { totalItems } = useCart();
  const isMobile = useIsMobile();
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > SCROLL_THRESHOLD);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const sectionIds = NAV_LINKS.map((l) => l.sectionId).filter((id): id is string => !!id);
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) setActiveSection(id);
          });
        },
        { threshold: 0.4 },
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const close = () => setMenuOpen(false);

  return (
    <>
      <div className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-3 sm:px-6">
        <header
          style={{ willChange: 'transform, opacity' }}
          className={`w-full max-w-5xl rounded-full border px-5 py-2.5 transition-all duration-300 ease-in-out ${
            scrolled
              ? 'border-brand-accent-gold/20 bg-brand-bg-primary/90 shadow-[0_4px_32px_rgba(0,0,0,0.05)] backdrop-blur-xl dark:border-brand-accent-gold-dark/20 dark:bg-brand-bg-primary-dark/80 dark:shadow-[0_4px_32px_rgba(0,0,0,0.4)]'
              : 'border-transparent bg-transparent shadow-none backdrop-blur-none'
          }`}
        >
          <div className="flex h-11 items-center justify-between">
            <Link href="/" onClick={close}>
              <Logo className="text-brand-text-primary" />
            </Link>

            <nav className="hidden items-center gap-1 md:flex">
              {NAV_LINKS.map((link) => {
                const isActive = isHomePage
                  ? activeSection === link.sectionId
                  : pathname === link.href || pathname.startsWith(`${link.href}/`);
                  
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={[
                      'relative rounded-full px-4 py-1.5 font-body text-sm font-medium transition-colors',
                      isActive ? 'text-brand-text-primary dark:text-brand-text-primary-dark' : 'text-brand-text-secondary hover:text-brand-text-primary dark:text-brand-text-secondary-dark dark:hover:text-brand-text-primary-dark',
                    ].join(' ')}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-active-pill"
                        className="absolute inset-0 rounded-full bg-brand-text-primary/10 ring-1 ring-brand-text-primary/15 dark:bg-brand-text-primary-dark/10 dark:ring-brand-text-primary-dark/15"
                        transition={{ 
                          type: 'spring', 
                          stiffness: 250, // PERFORMANCE: Reduced from 380 for fewer frame calculations
                          damping: 30 
                        }}
                      />
                    )}
                    <span className="relative">{link.label}</span>
                  </Link>
                );
              })}
            </nav>

            <div className="flex items-center gap-2 sm:gap-3">
              <ThemeToggle />
              
              <Link
                href="/cart"
                aria-label="View Cart"
                className="relative flex h-9 w-9 items-center justify-center rounded-full bg-brand-text-primary/5 text-brand-text-secondary transition-colors hover:bg-brand-text-primary/10 hover:text-brand-accent-gold dark:bg-brand-text-primary-dark/5 dark:text-brand-text-secondary-dark dark:hover:bg-brand-text-primary-dark/10 dark:hover:text-brand-accent-gold-dark"
              >
                <ShoppingCart size={18} />
                {totalItems > 0 && (
                  <motion.span
                    key={totalItems}
                    initial={{ scale: isMobile ? 1 : 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ 
                      type: isMobile ? 'tween' : 'spring', 
                      stiffness: 400, 
                      damping: 20,
                      duration: isMobile ? 0.15 : 0.25
                    }}
                    className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-brand-accent-gold font-body text-[9px] font-bold text-brand-text-primary shadow-sm"
                  >
                    {totalItems}
                  </motion.span>
                )}
              </Link>

              <Link
                href="/#reservations"
                className="hidden rounded-full bg-brand-accent-gold px-5 py-2 font-body text-sm font-semibold text-brand-bg-primary shadow-md shadow-brand-accent-gold/30 transition-all hover:brightness-105 dark:bg-brand-accent-gold-dark dark:text-brand-text-primary-dark dark:hover:brightness-110 md:inline-flex"
              >
                Contact Us
              </Link>

              <button
                aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={menuOpen}
                onClick={() => setMenuOpen((o) => !o)}
                className="flex h-9 w-9 items-center justify-center rounded-xl text-brand-text-secondary hover:text-brand-text-primary dark:text-brand-text-secondary-dark dark:hover:text-brand-text-primary-dark md:hidden"
              >
                {menuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </header>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              key="overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={close}
              className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm md:hidden"
            />
            <motion.div
              key="drawer"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }} // PERFORMANCE: Reduced stiffness for mobile
              className="fixed inset-y-0 right-0 z-50 flex w-72 flex-col bg-brand-bg-primary px-8 py-20 shadow-2xl dark:bg-brand-bg-primary-dark md:hidden"
            >
              <button
                onClick={close}
                aria-label="Close menu"
                className="absolute right-6 top-6 flex h-9 w-9 items-center justify-center rounded-full bg-brand-text-primary/5 text-brand-text-secondary transition-colors hover:bg-brand-text-primary/10 hover:text-brand-text-primary dark:bg-brand-text-primary-dark/5 dark:text-brand-text-secondary-dark dark:hover:bg-brand-text-primary-dark/10 dark:hover:text-brand-text-primary-dark"
              >
                <X size={20} />
              </button>

              <nav className="flex flex-col gap-5">
                <div className="mb-4 flex items-center justify-between border-b border-brand-border pb-4 dark:border-brand-border-dark">
                  <span className="font-heading text-base font-medium text-brand-text-secondary dark:text-brand-text-secondary-dark">Theme Preference</span>
                  <ThemeToggle />
                </div>
                {NAV_LINKS.map((link) => {
                  const isActive = isHomePage
                    ? activeSection === link.sectionId
                    : pathname === link.href || pathname.startsWith(`${link.href}/`);
                    
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={close}
                      className={[
                        'font-heading text-2xl font-semibold transition-colors',
                        isActive ? 'text-brand-accent-gold dark:text-brand-accent-gold-dark' : 'text-brand-text-secondary hover:text-brand-text-primary dark:text-brand-text-secondary-dark dark:hover:text-brand-text-primary-dark',
                      ].join(' ')}
                    >
                      {link.label}
                    </Link>
                  );
                })}
                <Link
                  href="/#reservations"
                  onClick={close}
                  className="mt-4 rounded-full bg-brand-accent-gold px-6 py-3 text-center font-body text-sm font-semibold text-brand-bg-primary shadow-md dark:bg-brand-accent-gold-dark dark:text-brand-text-primary-dark"
                >
                  Contact Us
                </Link>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
