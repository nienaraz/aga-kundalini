'use client';

import { useState, useCallback } from 'react';
import Link from 'next/link';
import { mainNavigation } from '@/lib/navigation';
import { DesktopNav } from './Navigation';
import MobileMenu from './MobileMenu';

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const openSearch = useCallback(() => {
    window.dispatchEvent(new CustomEvent('open-search'));
  }, []);

  const toggleMobile = useCallback(() => {
    setMobileOpen((v) => !v);
  }, []);

  const closeMobile = useCallback(() => {
    setMobileOpen(false);
  }, []);

  return (
    <>
      <header className="sticky top-0 z-30 bg-[var(--color-bg)]/95 backdrop-blur-md border-b border-warm-200/50">
        <div className="content-container">
          <div className="flex items-center justify-between h-[4.5rem]">
            {/* Logo — editorial serif */}
            <Link
              href="/"
              className="flex items-center gap-3 shrink-0 group"
            >
              {/* Decorative dot */}
              <span
                className="w-2.5 h-2.5 rounded-full bg-sage-400 group-hover:bg-sage-500 transition-colors"
                aria-hidden="true"
              />
              <span className="font-serif text-xl tracking-tight text-earth-900">
                Aga
                <span className="text-earth-400 font-normal mx-1.5">/</span>
                <span className="text-earth-600 font-normal">Joga Kundalini</span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <DesktopNav items={mainNavigation} />

            {/* Right-side actions */}
            <div className="flex items-center gap-2">
              {/* Search */}
              <button
                type="button"
                onClick={openSearch}
                aria-label="Szukaj (Cmd+K)"
                title="Szukaj"
                className="p-2.5 rounded-2xl text-earth-500 hover:text-sage-700 hover:bg-warm-100 transition-colors"
              >
                <svg className="w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
              </button>

              {/* Mobile hamburger */}
              <button
                type="button"
                onClick={toggleMobile}
                aria-label={mobileOpen ? 'Zamknij menu' : 'Otwórz menu'}
                aria-expanded={mobileOpen}
                className="lg:hidden p-2.5 rounded-2xl text-earth-500 hover:text-sage-700 hover:bg-warm-100 transition-colors"
              >
                <svg className="w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  {mobileOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      <MobileMenu isOpen={mobileOpen} onClose={closeMobile} />
    </>
  );
}

export default Header;
