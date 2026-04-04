import { Variants } from 'framer-motion';

// Universal scroll-entrance variant defined in Phase A Design Audit
export const ANIMATIONS_ENABLED = true;

// PERFORMANCE: Reduced Y offset (24px -> 16px) for smoother mobile lift
// PERFORMANCE: duration (0.5 -> 0.4) for snappier feel
export const scrollEntrance: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.4, 
      ease: 'easeOut' 
    } 
  },
};

// PERFORMANCE: Increased stagger (0.1 -> 0.15) for better concurrency control
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

// MOBILE ONLY: Simplified variants for maximum performance
export const mobileScrollEntrance: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1, 
    transition: { 
      duration: 0.3, 
      ease: 'easeOut' 
    } 
  },
};

export const mobileStaggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05, // Faster stagger on mobile
    },
  },
};
