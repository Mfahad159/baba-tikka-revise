'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, Variants } from 'framer-motion';
import { ArrowUp, Phone, Mail, Clock } from 'lucide-react';
import { Logo } from '@/components/ui/Logo';

// Clean native SVGs matching lucide props to replace stripped brand icons
const Facebook = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);
const Instagram = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);
const Twitter = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);
import { ANIMATIONS_ENABLED } from '@/lib/animations';

const FOOTER_CONTENT = {
  tagline: "Serving delicious food since 1987",
  phone: ["0304-1111616", "041-111-161616"],
  email: "info@babatikkah.com",
  timing: "Mon to Sunday: 12:00 PM – 1:00 AM",
  quickLinks: [
    { label: "Home", href: "/" },
    { label: "Menu", href: "/menu" },
    { label: "Contact", href: "/#reservations" }, // Handled via generic anchor route to match our new routing patterns
  ],
  social: {
    facebook: "TODO",
    instagram: "TODO",
    twitter: "TODO",
  }
};

const CREDIT = {
  copyright: "Copyright © 2026 Baba Tikkah. All rights reserved.",
  devLabel: "Designed & Developed by",
  devName: "Mr. Fahad",
  devUrl: "https://mfahad159.github.io/portfolio/",
};

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: ANIMATIONS_ENABLED ? 0.1 : 0 },
  },
};

const childVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

export function Footer() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 400);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="relative mt-auto overflow-hidden bg-brand-bg-primary pt-16 transition-colors duration-300 dark:bg-brand-bg-primary-dark sm:pt-24 shrink-0 border-t border-brand-accent-gold/20 dark:border-brand-accent-gold-dark/20">
      {/* Subtle top edge gradient fade */}
      <div className="absolute left-0 top-0 h-[1px] w-full bg-[linear-gradient(90deg,transparent_0%,rgba(200,150,62,0.4)_50%,transparent_100%)] dark:bg-[linear-gradient(90deg,transparent_0%,rgba(160,120,64,0.3)_50%,transparent_100%)]" />

      <motion.div
        variants={ANIMATIONS_ENABLED ? containerVariants : {}}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
        className="mx-auto max-w-7xl px-6 pb-12 sm:px-8 lg:px-12"
      >
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4 lg:gap-10">
          
          {/* Col 1: Brand */}
          <motion.div variants={childVariants} className="flex flex-col items-center md:items-start text-center md:text-left">
            <Logo className="text-brand-accent-gold dark:text-brand-accent-gold-dark" />
            <p className="mt-4 font-body text-sm font-medium italic text-brand-text-secondary dark:text-brand-text-secondary-dark">
              &quot;{FOOTER_CONTENT.tagline}&quot;
            </p>
            <div className="mt-5 h-[1px] w-16 bg-brand-accent-gold/40 dark:bg-brand-accent-gold-dark/40" />
            <div className="mt-6 flex h-[26px] items-center justify-center rounded-full border border-brand-accent-gold bg-brand-accent-gold/5 px-4 font-body text-[10px] font-bold uppercase tracking-widest text-brand-accent-gold dark:border-brand-accent-gold-dark dark:bg-brand-accent-gold-dark/5 dark:text-brand-accent-gold-dark">
              Est. 1987
            </div>
          </motion.div>

          {/* Col 2: Quick Links */}
          <motion.div variants={childVariants} className="flex flex-col items-center md:items-start text-center md:text-left lg:pl-8">
            <h3 className="font-heading text-lg font-bold tracking-wide text-brand-accent-gold dark:text-brand-accent-gold-dark">
              Quick Links
            </h3>
            <div className="mb-6 mt-2 h-[2px] w-6 bg-brand-accent-gold dark:bg-brand-accent-gold-dark" />
            <ul className="flex flex-col gap-3">
              {FOOTER_CONTENT.quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="group relative font-body text-sm font-medium text-brand-text-secondary transition-colors hover:text-brand-text-primary dark:text-brand-text-secondary-dark dark:hover:text-brand-text-primary-dark"
                  >
                    <span>{link.label}</span>
                    <span className="absolute -bottom-1 left-0 h-[1.5px] w-0 bg-brand-accent-gold transition-all duration-300 group-hover:w-full dark:bg-brand-accent-gold-dark" />
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Col 3: Contact Info */}
          <motion.div variants={childVariants} className="flex flex-col items-center md:items-start text-center md:text-left">
            <h3 className="font-heading text-lg font-bold tracking-wide text-brand-accent-gold dark:text-brand-accent-gold-dark">
              Contact
            </h3>
            <div className="mb-6 mt-2 h-[2px] w-6 bg-brand-accent-gold dark:bg-brand-accent-gold-dark" />
            <ul className="flex flex-col gap-4 font-body text-[13px] text-brand-text-secondary dark:text-brand-text-secondary-dark sm:text-sm">
              <li className="flex items-start justify-center gap-3 md:justify-start">
                <Phone className="mt-[2px] h-4 w-4 shrink-0 text-brand-accent-gold/60 dark:text-brand-accent-gold-dark/60" />
                <div className="flex flex-col gap-1">
                  {FOOTER_CONTENT.phone.map((num) => (
                    <a key={num} href={`tel:${num.replace(/[^0-9]/g, '')}`} className="transition-colors hover:text-brand-text-primary dark:hover:text-brand-text-primary-dark">
                      {num}
                    </a>
                  ))}
                </div>
              </li>
              <li className="flex items-center justify-center gap-3 md:justify-start">
                <Mail className="h-4 w-4 shrink-0 text-brand-accent-gold/60 dark:text-brand-accent-gold-dark/60" />
                <a href={`mailto:${FOOTER_CONTENT.email}`} className="transition-colors hover:text-brand-text-primary dark:hover:text-brand-text-primary-dark">
                  {FOOTER_CONTENT.email}
                </a>
              </li>
              <li className="flex items-start justify-center gap-3 md:justify-start">
                <Clock className="mt-[2px] h-4 w-4 shrink-0 text-brand-accent-gold/60 dark:text-brand-accent-gold-dark/60" />
                <span>{FOOTER_CONTENT.timing}</span>
              </li>
            </ul>
          </motion.div>

          {/* Col 4: Follow Us */}
          <motion.div variants={childVariants} className="flex flex-col items-center justify-between text-center md:items-start md:text-left">
            <div>
              <h3 className="font-heading text-lg font-bold tracking-wide text-brand-accent-gold dark:text-brand-accent-gold-dark">
                Follow Us
              </h3>
              <div className="mb-6 mt-2 mx-auto h-[2px] w-6 bg-brand-accent-gold dark:bg-brand-accent-gold-dark md:mx-0" />
              <div className="flex items-center gap-4">
                <a
                  href={FOOTER_CONTENT.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-brand-border text-brand-text-secondary transition-all duration-300 hover:scale-110 hover:border-brand-accent-gold hover:bg-brand-accent-gold/10 hover:text-brand-accent-gold active:scale-95 dark:border-brand-border-dark dark:text-brand-text-secondary-dark dark:hover:border-brand-accent-gold-dark dark:hover:bg-brand-accent-gold-dark/10 dark:hover:text-brand-accent-gold-dark"
                  aria-label="Facebook"
                >
                  <Facebook size={18} />
                </a>
                <a
                  href={FOOTER_CONTENT.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-brand-border text-brand-text-secondary transition-all duration-300 hover:scale-110 hover:border-brand-accent-gold hover:bg-brand-accent-gold/10 hover:text-brand-accent-gold active:scale-95 dark:border-brand-border-dark dark:text-brand-text-secondary-dark dark:hover:border-brand-accent-gold-dark dark:hover:bg-brand-accent-gold-dark/10 dark:hover:text-brand-accent-gold-dark"
                  aria-label="Instagram"
                >
                  <Instagram size={18} />
                </a>
                <a
                  href={FOOTER_CONTENT.social.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-brand-border text-brand-text-secondary transition-all duration-300 hover:scale-110 hover:border-brand-accent-gold hover:bg-brand-accent-gold/10 hover:text-brand-accent-gold active:scale-95 dark:border-brand-border-dark dark:text-brand-text-secondary-dark dark:hover:border-brand-accent-gold-dark dark:hover:bg-brand-accent-gold-dark/10 dark:hover:text-brand-accent-gold-dark"
                  aria-label="Twitter"
                >
                  <Twitter size={18} />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Strict Footer Native Scroll to Top (As requested, not view-fixed) */}
      <div className="relative mx-auto flex max-w-7xl px-6 justify-end sm:px-8 lg:px-12">
        <button
          onClick={scrollToTop}
          className={`absolute -top-16 right-6 z-20 flex h-11 min-w-[44px] items-center justify-center rounded-full border border-brand-accent-gold text-brand-accent-gold transition-all duration-500 hover:bg-brand-accent-gold hover:text-brand-bg-primary hover:shadow-lg hover:shadow-brand-accent-gold/20 dark:border-brand-accent-gold-dark dark:text-brand-accent-gold-dark dark:hover:bg-brand-accent-gold-dark dark:hover:text-brand-text-primary-dark dark:hover:shadow-brand-accent-gold-dark/20 md:right-12 ${
            showScrollTop ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0'
          }`}
          aria-label="Scroll to top"
        >
          <ArrowUp size={20} strokeWidth={2.5} />
        </button>
      </div>

      {/* Bottom Bar: Copyright & Dev Signature */}
      <div className="relative border-t border-brand-accent-gold/10 bg-brand-bg-secondary dark:border-brand-accent-gold-dark/10 dark:bg-black">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 px-6 py-7 sm:px-8 md:flex-row lg:px-12">
          <p className="text-center font-body text-xs tracking-wide text-brand-text-secondary dark:text-brand-text-secondary-dark">
            {CREDIT.copyright}
          </p>
          
          <div className="flex items-center gap-[6px] font-body text-xs text-brand-text-secondary dark:text-brand-text-secondary-dark">
            {CREDIT.devLabel}
            <a
              href={CREDIT.devUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex items-center font-heading text-[14px] font-bold italic tracking-wider text-brand-accent-gold transition-all duration-300 hover:drop-shadow-[0_0_10px_rgba(200,150,62,0.6)] dark:text-brand-accent-gold-dark"
            >
              <span className="relative z-10 px-1">{CREDIT.devName}</span>
              <span className="absolute bottom-0 left-0 h-[1.5px] w-0 bg-brand-accent-gold transition-all duration-500 ease-out group-hover:w-full dark:bg-brand-accent-gold-dark" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
