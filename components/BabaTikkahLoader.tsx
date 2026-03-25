'use client';

import { useEffect, useState, useRef } from 'react';
import * as animejs from 'animejs';
const anime = (animejs as any).default || animejs;

const BRAND_NAME = "Baba Tikkah";
const BRAND_SLOGAN = "The Name of Taste";

interface BabaTikkahLoaderProps {
  onComplete?: () => void;
}

export function BabaTikkahLoader({ onComplete }: BabaTikkahLoaderProps) {
  const [fadingOut, setFadingOut] = useState(false);
  const [showSkip, setShowSkip] = useState(false);

  const svgRef = useRef<SVGSVGElement>(null);
  const nameRef = useRef<SVGTextElement>(null);
  const sloganRef = useRef<SVGTextElement>(null);
  const lineRef = useRef<SVGLineElement>(null);

  const animsRef = useRef<any[]>([]);
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    let cancelled = false;

    const runAnimation = async () => {
      // 1. FONT READINESS - wait for fonts to load before measuring SVG paths
      await document.fonts.ready;
      if (cancelled) return;

      const nameEl = nameRef.current;
      const sloganEl = sloganRef.current;
      const lineEl = lineRef.current;
      if (!nameEl || !sloganEl || !lineEl) return;

      // Measure the text stroke path length accurately
      let nameLength = 0;
      try {
        nameLength = nameEl.getComputedTextLength();
      } catch (e) {}
      
      // Fallback if measurement fails or returns 0
      if (nameLength <= 10) nameLength = 950;

      // Set initial styles for stroke drawing
      nameEl.style.strokeDasharray = `${nameLength} ${nameLength}`;
      nameEl.style.strokeDashoffset = `${nameLength}`;
      nameEl.style.fillOpacity = '0';
      nameEl.style.filter = 'none';

      sloganEl.style.opacity = '0';
      lineEl.style.opacity = '0';

      // 2. TIMERS
      // Show skip button after 1500ms
      timeoutsRef.current.push(
        setTimeout(() => {
          if (!cancelled) setShowSkip(true);
        }, 1500)
      );

      // 3. SEQUENCE
      // Animate Stroke
      const anim1 = anime({
        targets: nameEl,
        strokeDashoffset: [nameLength, 0],
        duration: 2400,
        delay: 700,
        easing: 'easeInOutSine',
        complete: () => {
          if (!cancelled) {
            nameEl.style.transition = 'fill-opacity 0.8s ease, filter 0.8s ease';
            nameEl.style.fillOpacity = '1';
            nameEl.style.filter = 'drop-shadow(0 0 16px rgba(200, 150, 62, 0.5))'; // brand.accent.gold glow
          }
        },
      });
      animsRef.current.push(anim1);

      // Animate the minimal connecting line
      const animLine = anime({
        targets: lineEl,
        opacity: [0, 0.15],
        duration: 800,
        delay: 2800,
        easing: 'easeOutQuad',
      });
      animsRef.current.push(animLine);

      // Animate Slogan fading in
      const anim2 = anime({
        targets: sloganEl,
        opacity: [0, 0.7],
        duration: 900,
        delay: 3200,
        easing: 'easeOutCubic',
      });
      animsRef.current.push(anim2);

      // 4. CLEANUP TRIGGER
      timeoutsRef.current.push(
        setTimeout(() => {
          if (!cancelled) {
            setFadingOut(true);
            timeoutsRef.current.push(
              setTimeout(() => {
                if (!cancelled && onComplete) onComplete();
              }, 800) // matches the fade-out CSS duration
            );
          }
        }, 4600)
      );
    };

    runAnimation();

    // STRICT CLEANUP exactly matching the reference architecture
    return () => {
      cancelled = true;
      timeoutsRef.current.forEach(clearTimeout);
      animsRef.current.forEach((a) => a.pause());
    };
  }, [onComplete]);

  const handleSkip = () => {
    setFadingOut(true);
    setTimeout(() => {
      if (onComplete) onComplete();
    }, 800);
  };

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center transition-opacity duration-800 ease-in-out ${
        fadingOut ? 'pointer-events-none opacity-0' : 'opacity-100'
      }`}
    >
      {/* Background radial gradient mimicking the deep rich Ichiban aesthetic */}
      <div className="absolute inset-0 bg-[#0C0C0C] bg-[radial-gradient(ellipse_at_center,_#141414_0%,_#0C0C0C_100%)]" />
      
      {/* 
        Subtle Repeating SVG Motif 
        Geometric styling reflecting premium aesthetic at 3% opacity. 
      */}
      <div 
        className="absolute inset-0 pointer-events-none bg-repeat opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg stroke='%23C8963E' stroke-width='1' fill='none' fill-rule='evenodd'%3E%3Cpath d='M30 0L60 30L30 60L0 30z'/%3E%3C/g%3E%3C/svg%3E")`
        }}
      />

      <div className="relative z-10 w-full max-w-[92vw] sm:max-w-[720px]">
        <svg
          ref={svgRef}
          viewBox="0 0 800 220"
          className="w-full overflow-visible"
        >
          {/* Brand Name */}
          <text
            ref={nameRef}
            x="400"
            y="118"
            textAnchor="middle"
            dominantBaseline="central"
            className="font-heading font-bold"
            style={{
              fontSize: 'clamp(48px, 12vw, 88px)',
              fill: '#C8963E', // brand.accent.gold
              stroke: '#C8963E',
              strokeWidth: 1.5,
              fillOpacity: 0,
            }}
          >
            {BRAND_NAME}
          </text>
          
          {/* Subtle separator line */}
          <line
            ref={lineRef}
            x1="300"
            y1="164"
            x2="500"
            y2="164"
            stroke="#C8963E"
            strokeWidth="1"
            opacity="0"
          />

          {/* Slogan */}
          <text
            ref={sloganRef}
            x="400"
            y="190"
            textAnchor="middle"
            dominantBaseline="central"
            className="font-body"
            style={{
              fontSize: 'clamp(16px, 4vw, 24px)',
              fill: '#C8963E',
              letterSpacing: '10px',
              opacity: 0,
              textTransform: 'uppercase',
            }}
          >
            {BRAND_SLOGAN}
          </text>
        </svg>

        {/* Luxury Gold Progress Bar Shimmer */}
        <div className="mx-auto mt-16 h-[2px] w-48 overflow-hidden rounded-full bg-[rgba(255,255,255,0.05)]">
          <div className="h-full w-full animate-shimmer bg-[linear-gradient(90deg,transparent_0%,rgba(200,150,62,0.8)_50%,transparent_100%)] bg-[length:200%_100%]" />
        </div>
      </div>

      {/* Skip Button */}
      <button
        onClick={handleSkip}
        className={`absolute bottom-8 right-8 flex h-11 min-w-[44px] items-center justify-center p-4 font-body text-sm font-medium tracking-wide text-[rgba(255,255,255,0.6)] transition-all duration-500 hover:text-white ${
          showSkip ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0'
        }`}
        aria-label="Skip introduction"
      >
        Skip &rarr;
      </button>
    </div>
  );
}
