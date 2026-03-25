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

export default function HomePage() {
  return (
    <>
      <ClientBootLoader />
      <NavBar />
      <main>
        {/* Section IDs must match NavBarClient NAV_LINKS sectionId values */}
        <div id="home"><HeroSection /></div>
        <EditorialGallery />
        <div id="menu"><MenuHighlights /></div>
        <div id="branches"><BranchLocator /></div>
        <div id="testimonials"><TestimonialsSection /></div>
      </main>
    </>
  );
}
