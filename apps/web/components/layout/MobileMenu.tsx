'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { mainNavigation, secondaryNavigation } from '@/lib/navigation';
import type { NavItem } from '@/lib/navigation';

/* ------------------------------------------------------------------ */
/*  MobileMenu – slide-in sidebar for small screens                    */
/* ------------------------------------------------------------------ */

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const pathname = usePathname();

  /* Close menu when route changes */
  useEffect(() => {
    onClose();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  /* Prevent body scroll while open */
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  /* Close on Escape */
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleKey);
    }
    return () => document.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  return (
    <>
      {/* Overlay */}
      <div
        className={`
          fixed inset-0 z-40 bg-earth-950/40 backdrop-blur-sm
          transition-opacity duration-300
          ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}
        `}
        aria-hidden="true"
        onClick={onClose}
      />

      {/* Slide-in panel */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Menu nawigacyjne"
        className={`
          fixed top-0 right-0 bottom-0 z-50 w-[300px] max-w-[85vw]
          bg-warm-50 shadow-xl shadow-earth-900/10
          flex flex-col
          transition-transform duration-300 ease-out
          ${isOpen ? 'translate-x-0' : 'translate-x-full'}
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-warm-200">
          <span className="text-sm font-medium text-earth-600 tracking-wide uppercase">
            Menu
          </span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Zamknij menu"
            className="p-2 -mr-2 rounded-lg text-earth-500 hover:text-earth-700 hover:bg-warm-100 transition-colors"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Scrollable content */}
        <nav className="flex-1 overflow-y-auto py-4 px-5 space-y-6" aria-label="Nawigacja mobilna">
          {/* Main navigation */}
          <MobileNavSection items={mainNavigation} pathname={pathname} onClose={onClose} />

          {/* Divider */}
          <hr className="border-warm-200" />

          {/* Secondary navigation */}
          <div className="space-y-1">
            {secondaryNavigation.map((item) => (
              <MobileNavLink
                key={item.href}
                item={item}
                pathname={pathname}
                onClick={onClose}
              />
            ))}
          </div>
        </nav>

        {/* Bottom CTA */}
        <div className="p-5 border-t border-warm-200">
          <Link
            href="/start"
            onClick={onClose}
            className="
              block w-full text-center py-3 px-4 rounded-xl
              bg-sage-600 text-white text-sm font-medium
              hover:bg-sage-700 transition-colors
            "
          >
            Zacznij tutaj
          </Link>
        </div>
      </aside>
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  MobileNavSection – renders items with collapsible children         */
/* ------------------------------------------------------------------ */

function MobileNavSection({
  items,
  pathname,
  onClose,
}: {
  items: NavItem[];
  pathname: string;
  onClose: () => void;
}) {
  return (
    <div className="space-y-1">
      {items.map((item) =>
        item.children && item.children.length > 0 ? (
          <MobileNavGroup
            key={item.href}
            item={item}
            pathname={pathname}
            onClose={onClose}
          />
        ) : (
          <MobileNavLink
            key={item.href}
            item={item}
            pathname={pathname}
            onClick={onClose}
          />
        ),
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  MobileNavGroup – expandable group with children                    */
/* ------------------------------------------------------------------ */

function MobileNavGroup({
  item,
  pathname,
  onClose,
}: {
  item: NavItem;
  pathname: string;
  onClose: () => void;
}) {
  const isChildActive = item.children?.some(
    (c) => pathname === c.href || pathname.startsWith(c.href + '/'),
  );
  const [expanded, setExpanded] = useState(!!isChildActive);

  const toggle = useCallback(() => setExpanded((v) => !v), []);

  return (
    <div>
      {/* Group header */}
      <div className="flex items-center">
        <Link
          href={item.href}
          onClick={onClose}
          aria-current={
            pathname === item.href || pathname.startsWith(item.href + '/')
              ? 'page'
              : undefined
          }
          className={`
            flex-1 py-2.5 text-[15px] rounded-lg transition-colors
            ${isChildActive || pathname === item.href
              ? 'text-sage-700 font-medium'
              : 'text-earth-700 hover:text-sage-600'
            }
          `}
        >
          {item.label}
        </Link>
        <button
          type="button"
          onClick={toggle}
          aria-expanded={expanded}
          aria-label={`${expanded ? 'Zwiń' : 'Rozwiń'} ${item.label}`}
          className="p-2 rounded-lg text-earth-400 hover:text-earth-600 hover:bg-warm-100 transition-colors"
        >
          <svg
            className={`w-4 h-4 transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>

      {/* Children */}
      <div
        className={`
          overflow-hidden transition-all duration-200 ease-out
          ${expanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}
        `}
      >
        <div className="pl-4 pb-2 space-y-0.5">
          {item.children?.map((child) => {
            const childActive =
              pathname === child.href ||
              pathname.startsWith(child.href + '/');
            return (
              <Link
                key={child.href}
                href={child.href}
                onClick={onClose}
                aria-current={childActive ? 'page' : undefined}
                className={`
                  block py-2 px-3 text-sm rounded-lg transition-colors
                  ${childActive
                    ? 'text-sage-700 bg-sage-50 font-medium'
                    : 'text-earth-600 hover:text-sage-600 hover:bg-warm-50'
                  }
                `}
              >
                {child.label}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  MobileNavLink – simple mobile nav link                             */
/* ------------------------------------------------------------------ */

function MobileNavLink({
  item,
  pathname,
  onClick,
}: {
  item: NavItem;
  pathname: string;
  onClick: () => void;
}) {
  const isActive =
    pathname === item.href || pathname.startsWith(item.href + '/');

  return (
    <Link
      href={item.href}
      onClick={onClick}
      aria-current={isActive ? 'page' : undefined}
      className={`
        block py-2.5 text-[15px] rounded-lg transition-colors
        ${isActive
          ? 'text-sage-700 font-medium'
          : 'text-earth-700 hover:text-sage-600'
        }
      `}
    >
      {item.label}
    </Link>
  );
}
