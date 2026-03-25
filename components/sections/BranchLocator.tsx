// BranchLocator — 3 branch cards, static data.
// TODO: Update BRANCHES with real addresses, hours, and phone numbers before launch.
// TODO: If Google Maps embeds are needed, add iframes per branch in Phase 3.
// Server Component — no interactivity needed.

// VISUAL CHOICE: Dark section (brand-charcoal bg) creates contrast after the cream MenuHighlights.

interface Branch {
  id: string;
  name: string;
  area: string;
  address: string; // TODO
  phone: string; // TODO
  hours: {
    weekday: string; // TODO
    weekend: string; // TODO
  };
}

// ─── Branch data — update before go-live ──────────────────────────────────────
const BRANCHES: Branch[] = [
  {
    id: 'branch-gulberg',
    name: 'Gulberg Branch',
    area: 'Gulberg, Lahore',
    address: 'TODO: Street address, Gulberg III, Lahore', // TODO
    phone: '+92 300 0000000', // TODO
    hours: {
      weekday: 'Mon–Fri: 12pm – 12am', // TODO
      weekend: 'Sat–Sun: 12pm – 2am', // TODO
    },
  },
  {
    id: 'branch-dha',
    name: 'DHA Branch',
    area: 'DHA, Lahore',
    address: 'TODO: Street address, DHA Phase 5, Lahore', // TODO
    phone: '+92 300 0000001', // TODO
    hours: {
      weekday: 'Mon–Fri: 12pm – 12am', // TODO
      weekend: 'Sat–Sun: 12pm – 2am', // TODO
    },
  },
  {
    id: 'branch-johar',
    name: 'Johar Town Branch',
    area: 'Johar Town, Lahore',
    address: 'TODO: Street address, Johar Town, Lahore', // TODO
    phone: '+92 300 0000002', // TODO
    hours: {
      weekday: 'Mon–Fri: 12pm – 12am', // TODO
      weekend: 'Sat–Sun: 12pm – 2am', // TODO
    },
  },
];

export function BranchLocator() {
  return (
    <section id="branches" className="bg-brand-charcoal py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Section header */}
        <div className="mb-10 text-center">
          <p className="mb-2 font-body text-xs font-semibold uppercase tracking-[0.25em] text-brand-gold">
            Find Us
          </p>
          <h2 className="font-heading text-4xl font-semibold text-brand-cream lg:text-5xl">
            Our Branches
          </h2>
          <p className="mx-auto mt-3 max-w-xl font-body text-base text-brand-cream/60">
            Three locations across Lahore — always close to you.
          </p>
        </div>

        {/* Branch cards — stacked on mobile, 3-col on desktop */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {BRANCHES.map((branch) => (
            <div
              key={branch.id}
              // VISUAL CHOICE: subtle white/10 border + backdrop for glassmorphism on dark bg
              className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-colors hover:border-brand-gold/40"
            >
              {/* Gold dot accent */}
              <span className="mb-4 inline-block h-2 w-2 rounded-full bg-brand-gold" />

              <h3 className="font-heading text-2xl font-semibold text-brand-cream">
                {branch.name}
              </h3>
              <p className="mt-1 font-body text-sm font-medium text-brand-gold">
                {branch.area}
              </p>

              <div className="mt-4 space-y-2 font-body text-sm text-brand-cream/70">
                <p>{branch.address}</p>
                <p>{branch.phone}</p>
              </div>

              {/* Hours */}
              <div className="mt-4 rounded-xl bg-white/5 p-3 font-body text-xs text-brand-cream/60">
                <p>{branch.hours.weekday}</p>
                <p className="mt-1">{branch.hours.weekend}</p>
              </div>

              {/* TODO: Add Google Maps link/embed here in Phase 3 */}
              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(branch.address)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-1 font-body text-xs text-brand-gold/70 transition-colors hover:text-brand-gold"
              >
                Get Directions →
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
