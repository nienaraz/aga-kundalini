'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { regulationBarItems } from '@/lib/navigation';

/* ------------------------------------------------------------------ */
/*  RegulationBar – quick-access regulation shortcuts                   */
/*                                                                      */
/*  Desktop: horizontal bar below the header                            */
/*  Mobile:  floating bottom bar with collapse toggle                   */
/* ------------------------------------------------------------------ */

export default function RegulationBar() {
  const [collapsed, setCollapsed] = useState(false);
  const [scrolledPast, setScrolledPast] = useState(false);

  /* Auto-collapse after scrolling 300px (subtle, non-distracting) */
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolledPast(window.scrollY > 300);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isHidden = collapsed || scrolledPast;

  const toggleCollapse = useCallback(() => {
    setCollapsed((v) => !v);
    /* If user manually toggles, override the scroll behavior */
    if (scrolledPast) setScrolledPast(false);
  }, [scrolledPast]);

  return (
    <>
      {/* ---- Desktop: horizontal bar below header ---- */}
      <div
        className={`
          hidden md:block
          transition-all duration-300 ease-out overflow-hidden
          ${isHidden ? 'max-h-0 opacity-0' : 'max-h-20 opacity-100'}
        `}
      >
        <nav
          role="navigation"
          aria-label="Szybki dostęp do regulacji"
          className="content-container py-2"
        >
          <div className="flex items-center justify-center gap-3">
            {regulationBarItems.map((item) => (
              <RegulationButton
                key={item.href}
                href={item.href}
                emoji={item.emoji}
                label={item.label}
              />
            ))}
          </div>
        </nav>
      </div>

      {/* ---- Mobile: floating bottom bar ---- */}
      <div
        className={`
          md:hidden fixed bottom-4 left-4 right-4 z-30
          transition-all duration-300 ease-out
          ${isHidden ? 'translate-y-24 opacity-0 pointer-events-none' : 'translate-y-0 opacity-100'}
        `}
      >
        <nav
          role="navigation"
          aria-label="Szybki dostęp do regulacji"
          className="
            bg-sage-50 border border-sage-200 rounded-xl
            shadow-lg shadow-earth-900/10
            px-3 py-2.5
          "
        >
          <div className="flex items-center justify-around gap-2">
            {regulationBarItems.map((item) => (
              <RegulationButton
                key={item.href}
                href={item.href}
                emoji={item.emoji}
                label={item.label}
                compact
              />
            ))}
          </div>
        </nav>
      </div>

      {/* ---- Toggle button (appears when collapsed or scrolled) ---- */}
      <button
        type="button"
        onClick={toggleCollapse}
        aria-label={isHidden ? 'Pokaż szybki dostęp' : 'Ukryj szybki dostęp'}
        className={`
          fixed z-30 transition-all duration-300
          ${isHidden
            ? 'bottom-4 right-4 opacity-100 translate-y-0'
            : 'bottom-4 right-4 opacity-0 pointer-events-none translate-y-4'
          }
          md:bottom-auto md:top-[4.5rem] md:right-4
          w-10 h-10 rounded-full
          bg-sage-100 border border-sage-200
          text-sage-600 hover:bg-sage-200
          shadow-md shadow-earth-900/10
          flex items-center justify-center
          text-lg
        `}
      >
        <span aria-hidden="true">🌿</span>
      </button>
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  RegulationButton – single quick-access button                      */
/* ------------------------------------------------------------------ */

interface RegulationButtonProps {
  href: string;
  emoji: string;
  label: string;
  compact?: boolean;
}

function RegulationButton({ href, emoji, label, compact }: RegulationButtonProps) {
  return (
    <Link
      href={href}
      className={`
        inline-flex items-center gap-2
        bg-sage-50 border border-sage-200 rounded-xl
        text-sage-800 hover:bg-sage-100 hover:border-sage-300
        active:bg-sage-200
        transition-colors duration-200
        ${compact
          ? 'px-3 py-2 text-xs'
          : 'px-4 py-2 text-sm'
        }
      `}
    >
      <span aria-hidden="true" className={compact ? 'text-base' : 'text-lg'}>
        {emoji}
      </span>
      <span className="font-medium whitespace-nowrap">{label}</span>
    </Link>
  );
}
