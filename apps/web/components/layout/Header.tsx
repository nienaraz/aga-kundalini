'use client';

import { useState, useCallback } from 'react';
import Link from 'next/link';
import { mainNavigation } from '@/lib/navigation';
import { DesktopNav } from './Navigation';
import MobileMenu from './MobileMenu';

/* ------------------------------------------------------------------ */
/*  Header – sticky top bar with logo, nav, search, account            */
/* ------------------------------------------------------------------ */

export default function Header() {
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
      <header
        className="
          sticky top-0 z-30
          bg-warm-50/95 backdrop-blur
          border-b border-warm-200
        "
      >
        <div className="content-container">
          <div className="flex items-center justify-between h-16 lg:h-18">
            {/* ---- Logo ---- */}
            <Link
              href="/"
              className="
                flex items-center gap-2 shrink-0
                text-earth-900 hover:text-sage-700 transition-colors
              "
            >
              {/* Small decorative lotus-like mark */}
              <span className="text-sage-500 text-xl" aria-hidden="true">
                &#10047;
              </span>
              <span className="font-serif text-lg tracking-tight">
                Aga{' '}
                <span className="text-earth-500 font-normal">&middot;</span>{' '}
                Joga Kundalini
              </span>
            </Link>

            {/* ---- Desktop Navigation ---- */}
            <DesktopNav items={mainNavigation} />

            {/* ---- Right-side actions ---- */}
            <div className="flex items-center gap-1">
              {/* Search button (Cmd+K) */}
              <button
                type="button"
                onClick={openSearch}
                aria-label="Szukaj (Cmd+K)"
                title="Szukaj (Cmd+K)"
                className="
                  p-2 rounded-lg text-earth-500
                  hover:text-sage-600 hover:bg-warm-100
                  transition-colors
                "
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                  />
                </svg>
              </button>

              {/* Account link */}
              <Link
                href="/account"
                aria-label="Konto"
                title="Konto"
                className="
                  p-2 rounded-lg text-earth-500
                  hover:text-sage-600 hover:bg-warm-100
                  transition-colors
                "
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                  />
                </svg>
              </Link>

              {/* Mobile hamburger */}
              <button
                type="button"
                onClick={toggleMobile}
                aria-label={mobileOpen ? 'Zamknij menu' : 'Otwórz menu'}
                aria-expanded={mobileOpen}
                className="
                  lg:hidden p-2 rounded-lg text-earth-500
                  hover:text-sage-600 hover:bg-warm-100
                  transition-colors
                "
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  {mobileOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile menu (portal-style, rendered outside header) */}
      <MobileMenu isOpen={mobileOpen} onClose={closeMobile} />
    </>
  );
}
