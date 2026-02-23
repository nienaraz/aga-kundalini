'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { regulationBarItems } from '@/lib/navigation';

export function RegulationBar() {
  const [collapsed, setCollapsed] = useState(false);
  const [scrolledPast, setScrolledPast] = useState(false);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => { setScrolledPast(window.scrollY > 300); ticking = false; });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isHidden = collapsed || scrolledPast;

  const toggleCollapse = useCallback(() => {
    setCollapsed((v) => !v);
    if (scrolledPast) setScrolledPast(false);
  }, [scrolledPast]);

  return (
    <>
      {/* Desktop */}
      <div className={`hidden md:block transition-all duration-300 ease-out overflow-hidden ${isHidden ? 'max-h-0 opacity-0' : 'max-h-20 opacity-100'}`}>
        <nav role="navigation" aria-label="Szybki dostęp do regulacji" className="content-container py-2.5">
          <div className="flex items-center justify-center gap-3">
            {regulationBarItems.map((item) => (
              <RegulationButton key={item.href} href={item.href} emoji={item.emoji} label={item.label} />
            ))}
          </div>
        </nav>
      </div>

      {/* Mobile floating */}
      <div className={`md:hidden fixed bottom-5 left-5 right-5 z-30 transition-all duration-300 ease-out ${isHidden ? 'translate-y-24 opacity-0 pointer-events-none' : 'translate-y-0 opacity-100'}`}>
        <nav role="navigation" aria-label="Szybki dostęp do regulacji"
          className="bg-white/95 backdrop-blur-md border border-warm-200/60 rounded-3xl shadow-soft-lg px-3 py-3"
        >
          <div className="flex items-center justify-around gap-2">
            {regulationBarItems.map((item) => (
              <RegulationButton key={item.href} href={item.href} emoji={item.emoji} label={item.label} compact />
            ))}
          </div>
        </nav>
      </div>

      {/* Toggle */}
      <button
        type="button" onClick={toggleCollapse}
        aria-label={isHidden ? 'Pokaż szybki dostęp' : 'Ukryj szybki dostęp'}
        className={`
          fixed z-30 transition-all duration-300
          ${isHidden ? 'bottom-5 right-5 opacity-100 translate-y-0' : 'bottom-5 right-5 opacity-0 pointer-events-none translate-y-4'}
          md:bottom-auto md:top-[5rem] md:right-5
          w-11 h-11 rounded-2xl bg-sage-50 border border-sage-200/60
          text-sage-600 hover:bg-sage-100 shadow-soft
          flex items-center justify-center text-base
        `}
      >
        <span aria-hidden="true">&#127807;</span>
      </button>
    </>
  );
}

function RegulationButton({ href, emoji, label, compact }: { href: string; emoji: string; label: string; compact?: boolean }) {
  return (
    <Link
      href={href}
      className={`
        inline-flex items-center gap-2 bg-sage-50/80 border border-sage-200/50 rounded-2xl
        text-sage-800 hover:bg-sage-100 hover:border-sage-300/50 active:bg-sage-200
        transition-colors duration-200
        ${compact ? 'px-3 py-2.5 text-xs' : 'px-4 py-2.5 text-body-sm'}
      `}
    >
      <span aria-hidden="true" className={compact ? 'text-sm' : 'text-base'}>{emoji}</span>
      <span className="font-medium whitespace-nowrap">{label}</span>
    </Link>
  );
}

export default RegulationBar;
