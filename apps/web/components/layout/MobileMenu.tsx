'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { mainNavigation, secondaryNavigation } from '@/lib/navigation';
import type { NavItem } from '@/lib/navigation';

interface MobileMenuProps { isOpen: boolean; onClose: () => void; }

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const pathname = usePathname();

  useEffect(() => { onClose(); /* eslint-disable-next-line react-hooks/exhaustive-deps */ }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    if (isOpen) document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  return (
    <>
      <div
        className={`fixed inset-0 z-40 bg-earth-950/30 backdrop-blur-sm transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        aria-hidden="true"
        onClick={onClose}
      />

      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Menu nawigacyjne"
        className={`
          fixed top-0 right-0 bottom-0 z-50 w-[320px] max-w-[85vw]
          bg-[var(--color-bg)] shadow-soft-lg flex flex-col
          transition-transform duration-300 ease-out
          ${isOpen ? 'translate-x-0' : 'translate-x-full'}
        `}
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-warm-200/60">
          <span className="text-xs font-medium uppercase tracking-[0.15em] text-earth-500">Menu</span>
          <button
            type="button" onClick={onClose} aria-label="Zamknij menu"
            className="p-2 -mr-2 rounded-2xl text-earth-500 hover:text-earth-700 hover:bg-warm-100 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto py-5 px-6 space-y-6" aria-label="Nawigacja mobilna">
          <MobileNavSection items={mainNavigation} pathname={pathname} onClose={onClose} />
          <hr className="border-warm-200/60" />
          <div className="space-y-1">
            {secondaryNavigation.map((item) => (
              <MobileNavLink key={item.href} item={item} pathname={pathname} onClick={onClose} />
            ))}
          </div>
        </nav>

        <div className="p-6 border-t border-warm-200/60">
          <Link href="/start" onClick={onClose} className="block w-full text-center py-3.5 px-5 rounded-2xl bg-sage-600 text-white text-body-sm font-medium hover:bg-sage-700 transition-colors">
            Zacznij tutaj
          </Link>
        </div>
      </aside>
    </>
  );
}

function MobileNavSection({ items, pathname, onClose }: { items: NavItem[]; pathname: string; onClose: () => void }) {
  return (
    <div className="space-y-1">
      {items.map((item) =>
        item.children && item.children.length > 0
          ? <MobileNavGroup key={item.href} item={item} pathname={pathname} onClose={onClose} />
          : <MobileNavLink key={item.href} item={item} pathname={pathname} onClick={onClose} />,
      )}
    </div>
  );
}

function MobileNavGroup({ item, pathname, onClose }: { item: NavItem; pathname: string; onClose: () => void }) {
  const isChildActive = item.children?.some((c) => pathname === c.href || pathname.startsWith(c.href + '/'));
  const [expanded, setExpanded] = useState(!!isChildActive);
  const toggle = useCallback(() => setExpanded((v) => !v), []);

  return (
    <div>
      <div className="flex items-center">
        <Link
          href={item.href} onClick={onClose}
          aria-current={pathname === item.href || pathname.startsWith(item.href + '/') ? 'page' : undefined}
          className={`flex-1 py-3 text-body-sm rounded-xl transition-colors ${isChildActive || pathname === item.href ? 'text-sage-700 font-medium' : 'text-earth-700 hover:text-sage-700'}`}
        >
          {item.label}
        </Link>
        <button
          type="button" onClick={toggle} aria-expanded={expanded}
          aria-label={`${expanded ? 'Zwiń' : 'Rozwiń'} ${item.label}`}
          className="p-2.5 rounded-xl text-earth-400 hover:text-earth-600 hover:bg-warm-100 transition-colors"
        >
          <svg className={`w-3.5 h-3.5 transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>
      <div className={`overflow-hidden transition-all duration-200 ease-out ${expanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="pl-4 pb-2 space-y-0.5">
          {item.children?.map((child) => {
            const childActive = pathname === child.href || pathname.startsWith(child.href + '/');
            return (
              <Link key={child.href} href={child.href} onClick={onClose} aria-current={childActive ? 'page' : undefined}
                className={`block py-2.5 px-4 text-body-sm rounded-xl transition-colors ${childActive ? 'text-sage-700 bg-sage-50/60 font-medium' : 'text-earth-600 hover:text-sage-700 hover:bg-warm-50'}`}
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

function MobileNavLink({ item, pathname, onClick }: { item: NavItem; pathname: string; onClick: () => void }) {
  const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
  return (
    <Link href={item.href} onClick={onClick} aria-current={isActive ? 'page' : undefined}
      className={`block py-3 text-body-sm rounded-xl transition-colors ${isActive ? 'text-sage-700 font-medium' : 'text-earth-700 hover:text-sage-700'}`}
    >
      {item.label}
    </Link>
  );
}
