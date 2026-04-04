// Home page — Server Component.
// Sections are imported and composed here. Interactive sections ('use client') are
// correctly isolated inside their own components per RSC boundary rules.

import { NavBar } from '@/components/sections/NavBar';
import { HeroSection } from '@/components/sections/HeroSection';
import { EditorialGallery } from '@/components/sections/EditorialGallery';
import { MenuHighlights } from '@/components/sections/MenuHighlights';
import { BranchLocator } from '@/components/sections/BranchLocator';
import { TestimonialsSection } from '@/components/sections/TestimonialsSection';
import { ClientBootLoader } from '@/components/ClientBootLoader';
import PageTransition from '@/components/PageTransition';

export default function HomePage() {
  return (
    <PageTransition>
      <ClientBootLoader />
      <NavBar />
      <main className="flex flex-col">
        {/* Section IDs must match NavBarClient NAV_LINKS sectionId values */}
        <div key="section-home" id="home"><HeroSection /></div>
        <EditorialGallery key="section-gallery" />
        <div key="section-menu" id="menu"><MenuHighlights /></div>
        <div key="section-branches" id="branches"><BranchLocator /></div>
        <div key="section-testimonials" id="testimonials"><TestimonialsSection /></div>
      </main>
    </PageTransition>
  );
}
