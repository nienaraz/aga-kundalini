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
      {/* Desktop — NO z-index so header dropdown (z-30 context) always renders above */}
      <div className={`hidden md:block bg-cobalt-50/70 border-b border-cobalt-500/20 transition-all duration-300 ease-out overflow-hidden ${isHidden ? 'max-h-0 opacity-0' : 'max-h-20 opacity-100'}`}>
        <nav role="navigation" aria-label="Szybki dostęp do regulacji" className="content-container py-2">
          <div className="flex items-center justify-center gap-3">
            {regulationBarItems.map((item) => (
              <RegulationButton key={item.href} href={item.href} label={item.label} />
            ))}
          </div>
        </nav>
      </div>

      {/* Mobile floating */}
      <div className={`md:hidden fixed bottom-5 left-5 right-5 z-30 transition-all duration-300 ease-out ${isHidden ? 'translate-y-24 opacity-0 pointer-events-none' : 'translate-y-0 opacity-100'}`}>
        <nav role="navigation" aria-label="Szybki dostęp do regulacji"
          className="bg-white/90 backdrop-blur-md border border-cobalt-500/25 rounded-2xl shadow-soft px-3 py-3"
        >
          <div className="flex items-center justify-around gap-2">
            {regulationBarItems.map((item) => (
              <RegulationButton key={item.href} href={item.href} label={item.label} compact />
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
          w-10 h-10 rounded-xl bg-white border border-cobalt-500/25
          text-cobalt-600 hover:border-cobalt-500/40 shadow-soft
          flex items-center justify-center text-xs font-medium tracking-wider uppercase
        `}
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
        </svg>
      </button>
    </>
  );
}

function RegulationButton({ href, label, compact }: { href: string; label: string; compact?: boolean }) {
  return (
    <Link
      href={href}
      className={`
        inline-flex items-center bg-white/90 border border-cobalt-500/25 rounded-xl
        text-cobalt-700 font-medium hover:bg-cobalt-50 hover:border-cobalt-500/40
        transition-all duration-200 shadow-sm
        ${compact ? 'px-3 py-2 text-xs' : 'px-4 py-2 text-body-sm'}
      `}
    >
      <span className="font-medium whitespace-nowrap">{label}</span>
    </Link>
  );
}

export default RegulationBar;
