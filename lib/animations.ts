// ─── Global Animation Toggle ──────────────────────────────────────────────────
// Set to `false` to instantly disable ALL animations across the site.
// Useful for the client demo or low-motion preference overrides.
// TODO: Wire this to prefers-reduced-motion in Phase 3.
export const ANIMATIONS_ENABLED = true;

// Default animation durations (ms) — adjust here for global tuning
export const ANIM_DURATION = {
  fast: 300,
  normal: 600,
  slow: 900,
} as const;

// Default stagger delay between animated children (ms)
export const ANIM_STAGGER = 60;
