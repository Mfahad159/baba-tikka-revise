'use client';

// NavBarClient
// Redesigned with brand tokens and standardized colors globally.

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ShoppingCart } from 'lucide-react';
import { Logo } from '@/components/ui/Logo';
import { useCart } from '@/hooks/useCart';

const NAV_LINKS = [
  { label: 'Home', href: '/#home', sectionId: 'home' },
  { label: 'Our Story', href: '/#story', sectionId: 'story' },
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

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > SCROLL_THRESHOLD);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const sectionIds = NAV_LINKS.map((l) => l.sectionId).filter(Boolean);
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
        <motion.header
          initial={false}
          animate={
            scrolled
              ? {
                  backgroundColor: 'rgba(12,12,12,0.80)',
                  boxShadow: '0 4px 32px rgba(0,0,0,0.40)',
                  backdropFilter: 'blur(20px)',
                  borderColor: 'rgba(200,150,62,0.20)', // subtle gold
                }
              : {
                  backgroundColor: 'rgba(12,12,12,0)',
                  boxShadow: '0 0px 0px rgba(0,0,0,0)',
                  backdropFilter: 'blur(0px)',
                  borderColor: 'rgba(200,150,62,0)',
                }
          }
          style={{ WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'blur(0px)' }}
          transition={{ duration: 0.35, ease: 'easeInOut' }}
          className="w-full max-w-5xl rounded-full border px-5 py-2.5 transition-all duration-300"
        >
          <div className="flex h-11 items-center justify-between">
            <Link href="/" onClick={close}>
              <Logo className="text-brand-text-primary" />
            </Link>

            <nav className="hidden items-center gap-1 md:flex">
              {NAV_LINKS.map((link) => {
                const isActive = activeSection === link.sectionId;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={[
                      'relative rounded-full px-4 py-1.5 font-body text-sm font-medium transition-colors',
                      isActive ? 'text-brand-text-primary' : 'text-brand-text-secondary hover:text-brand-text-primary',
                    ].join(' ')}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-active-pill"
                        className="absolute inset-0 rounded-full bg-brand-text-primary/10 ring-1 ring-brand-text-primary/15"
                        transition={{ type: 'spring', stiffness: 380, damping: 34 }}
                      />
                    )}
                    <span className="relative">{link.label}</span>
                  </Link>
                );
              })}
            </nav>

            <div className="flex items-center gap-2 sm:gap-3">
              <Link
                href="/cart"
                aria-label="View Cart"
                className="relative flex h-9 w-9 items-center justify-center rounded-full bg-brand-text-primary/5 text-brand-text-secondary transition-colors hover:bg-brand-text-primary/10 hover:text-brand-accent-gold"
              >
                <ShoppingCart size={18} />
                {totalItems > 0 && (
                  <motion.span
                    key={totalItems}
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 15 }}
                    className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-brand-accent-gold font-body text-[9px] font-bold text-brand-text-primary shadow-sm"
                  >
                    {totalItems}
                  </motion.span>
                )}
              </Link>

              <Link
                href="/#reservations"
                className="hidden rounded-full bg-brand-accent-gold px-5 py-2 font-body text-sm font-semibold text-brand-text-primary shadow-md shadow-brand-accent-gold/30 transition-all hover:bg-[#976d29] md:inline-flex"
              >
                Contact Us
              </Link>

              <button
                aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={menuOpen}
                onClick={() => setMenuOpen((o) => !o)}
                className="flex h-9 w-9 items-center justify-center rounded-xl text-brand-text-secondary hover:text-brand-text-primary md:hidden"
              >
                {menuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </motion.header>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              key="overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={close}
              className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm md:hidden"
            />
            <motion.div
              key="drawer"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 280 }}
              className="fixed inset-y-0 right-0 z-50 flex w-72 flex-col bg-brand-bg-primary px-8 py-20 shadow-2xl md:hidden"
            >
              <button
                onClick={close}
                aria-label="Close menu"
                className="absolute right-6 top-6 flex h-9 w-9 items-center justify-center rounded-full bg-brand-text-primary/5 text-brand-text-secondary transition-colors hover:bg-brand-text-primary/10 hover:text-brand-text-primary"
              >
                <X size={20} />
              </button>

              <nav className="flex flex-col gap-5">
                {NAV_LINKS.map((link) => {
                  const isActive = activeSection === link.sectionId;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={close}
                      className={[
                        'font-heading text-2xl font-semibold transition-colors',
                        isActive ? 'text-brand-accent-gold' : 'text-brand-text-secondary hover:text-brand-text-primary',
                      ].join(' ')}
                    >
                      {link.label}
                    </Link>
                  );
                })}
                <Link
                  href="/#reservations"
                  onClick={close}
                  className="mt-4 rounded-full bg-brand-accent-gold px-6 py-3 text-center font-body text-sm font-semibold text-brand-text-primary shadow-md"
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
