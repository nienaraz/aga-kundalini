'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { NavItem } from '@/lib/navigation';

/* ------------------------------------------------------------------ */
/*  NavLink – single link with active-state detection                  */
/* ------------------------------------------------------------------ */

interface NavLinkProps {
  item: NavItem;
  className?: string;
  onClick?: () => void;
}

export function NavLink({ item, className = '', onClick }: NavLinkProps) {
  const pathname = usePathname();
  const isActive =
    pathname === item.href || pathname.startsWith(item.href + '/');

  return (
    <Link
      href={item.href}
      onClick={onClick}
      aria-current={isActive ? 'page' : undefined}
      className={`
        relative transition-colors duration-200
        ${isActive
          ? 'text-sage-700 font-medium'
          : 'text-earth-700 hover:text-sage-600'
        }
        ${className}
      `}
    >
      {item.label}
      {isActive && (
        <span
          className="absolute -bottom-1 left-0 right-0 h-0.5 bg-sage-500 rounded-full"
          aria-hidden="true"
        />
      )}
    </Link>
  );
}

/* ------------------------------------------------------------------ */
/*  DropdownNav – top-level item that opens a dropdown on hover/focus  */
/* ------------------------------------------------------------------ */

interface DropdownNavProps {
  item: NavItem;
}

export function DropdownNav({ item }: DropdownNavProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const closeTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const isActive =
    pathname === item.href ||
    pathname.startsWith(item.href + '/') ||
    item.children?.some(
      (c) => pathname === c.href || pathname.startsWith(c.href + '/'),
    );

  /* Clear any pending close when we re-enter */
  const handleEnter = useCallback(() => {
    if (closeTimeout.current) {
      clearTimeout(closeTimeout.current);
      closeTimeout.current = null;
    }
    setOpen(true);
  }, []);

  /* Small delay so user can move to the dropdown panel */
  const handleLeave = useCallback(() => {
    closeTimeout.current = setTimeout(() => setOpen(false), 150);
  }, []);

  /* Close on Escape */
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    if (open) {
      document.addEventListener('keydown', handleKey);
    }
    return () => document.removeEventListener('keydown', handleKey);
  }, [open]);

  /* Close when clicking outside */
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    if (open) {
      document.addEventListener('mousedown', handleClick);
    }
    return () => document.removeEventListener('mousedown', handleClick);
  }, [open]);

  return (
    <div
      ref={containerRef}
      className="relative"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      {/* Trigger – parent link + chevron */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        onFocus={handleEnter}
        aria-expanded={open}
        aria-haspopup="true"
        className={`
          flex items-center gap-1 transition-colors duration-200
          ${isActive
            ? 'text-sage-700 font-medium'
            : 'text-earth-700 hover:text-sage-600'
          }
        `}
      >
        {item.label}
        <svg
          className={`w-3.5 h-3.5 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.5}
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown panel */}
      {open && (
        <div
          role="menu"
          className="
            absolute left-0 top-full mt-2 min-w-[220px] z-50
            rounded-xl border border-warm-200 bg-white/98 backdrop-blur
            shadow-lg shadow-earth-900/5 py-2
            animate-fade-in
          "
        >
          {/* Link to parent section */}
          <Link
            href={item.href}
            role="menuitem"
            onClick={() => setOpen(false)}
            className="
              block px-4 py-2 text-sm font-medium text-sage-700
              hover:bg-sage-50 transition-colors
            "
          >
            Wszystko o: {item.label}
          </Link>

          <hr className="my-1 border-warm-100" />

          {item.children?.map((child) => {
            const childActive =
              pathname === child.href ||
              pathname.startsWith(child.href + '/');

            return (
              <Link
                key={child.href}
                href={child.href}
                role="menuitem"
                onClick={() => setOpen(false)}
                aria-current={childActive ? 'page' : undefined}
                className={`
                  block px-4 py-2 text-sm transition-colors
                  ${childActive
                    ? 'text-sage-700 bg-sage-50 font-medium'
                    : 'text-earth-700 hover:bg-warm-50 hover:text-sage-600'
                  }
                `}
              >
                {child.label}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  DesktopNav – full desktop navigation bar                           */
/* ------------------------------------------------------------------ */

interface DesktopNavProps {
  items: NavItem[];
}

export function DesktopNav({ items }: DesktopNavProps) {
  return (
    <nav aria-label="Nawigacja główna" className="hidden lg:flex items-center gap-6">
      {items.map((item) =>
        item.children && item.children.length > 0 ? (
          <DropdownNav key={item.href} item={item} />
        ) : (
          <NavLink key={item.href} item={item} />
        ),
      )}
    </nav>
  );
}
