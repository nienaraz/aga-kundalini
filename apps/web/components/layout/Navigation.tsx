'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { NavItem } from '@/lib/navigation';

/* ---- NavLink ---- */

interface NavLinkProps {
  item: NavItem;
  className?: string;
  onClick?: () => void;
}

export function NavLink({ item, className = '', onClick }: NavLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === item.href || pathname.startsWith(item.href + '/');

  return (
    <Link
      href={item.href}
      onClick={onClick}
      aria-current={isActive ? 'page' : undefined}
      className={`
        relative text-body-sm transition-colors duration-200
        ${isActive ? 'text-sage-700 font-medium' : 'text-earth-600 hover:text-sage-700'}
        ${className}
      `}
    >
      {item.label}
      {isActive && (
        <span className="absolute -bottom-1 left-1 right-1 h-[2px] bg-sage-500 rounded-full" aria-hidden="true" />
      )}
    </Link>
  );
}

/* ---- DropdownNav ---- */

interface DropdownNavProps { item: NavItem; }

export function DropdownNav({ item }: DropdownNavProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const closeTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const isActive =
    pathname === item.href ||
    pathname.startsWith(item.href + '/') ||
    item.children?.some((c) => pathname === c.href || pathname.startsWith(c.href + '/'));

  const handleEnter = useCallback(() => {
    if (closeTimeout.current) { clearTimeout(closeTimeout.current); closeTimeout.current = null; }
    setOpen(true);
  }, []);

  const handleLeave = useCallback(() => {
    closeTimeout.current = setTimeout(() => setOpen(false), 150);
  }, []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    if (open) document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [open]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) setOpen(false);
    };
    if (open) document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [open]);

  return (
    <div ref={containerRef} className="relative" onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        onFocus={handleEnter}
        aria-expanded={open}
        aria-haspopup="true"
        className={`
          flex items-center gap-1.5 text-body-sm transition-colors duration-200
          ${isActive ? 'text-sage-700 font-medium' : 'text-earth-600 hover:text-sage-700'}
        `}
      >
        {item.label}
        <svg
          className={`w-3 h-3 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div
          role="menu"
          className="absolute left-0 top-full mt-3 min-w-[240px] z-50 rounded-3xl border border-warm-200/60 bg-white/98 backdrop-blur-lg shadow-soft-lg py-2.5 animate-fade-in"
        >
          <Link
            href={item.href}
            role="menuitem"
            onClick={() => setOpen(false)}
            className="block px-5 py-2.5 text-body-sm font-medium text-sage-700 hover:bg-sage-50 transition-colors rounded-xl mx-1"
          >
            Wszystko o: {item.label}
          </Link>
          <hr className="my-2 border-warm-100 mx-4" />
          {item.children?.map((child) => {
            const childActive = pathname === child.href || pathname.startsWith(child.href + '/');
            return (
              <Link
                key={child.href}
                href={child.href}
                role="menuitem"
                onClick={() => setOpen(false)}
                aria-current={childActive ? 'page' : undefined}
                className={`
                  block px-5 py-2.5 text-body-sm transition-colors rounded-xl mx-1
                  ${childActive ? 'text-sage-700 bg-sage-50/70 font-medium' : 'text-earth-700 hover:bg-warm-50 hover:text-sage-700'}
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

/* ---- DesktopNav ---- */

interface DesktopNavProps { items: NavItem[]; }

export function DesktopNav({ items }: DesktopNavProps) {
  return (
    <nav aria-label="Nawigacja główna" className="hidden lg:flex items-center gap-7">
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
