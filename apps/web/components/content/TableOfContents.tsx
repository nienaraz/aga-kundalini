'use client';

import { useEffect, useState } from 'react';

type TocItem = {
  id: string;
  text: string;
  level: number;
};

type TableOfContentsProps = {
  items: TocItem[];
};

export function TableOfContents({ items }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    if (items.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      {
        rootMargin: '-80px 0px -60% 0px',
        threshold: 0.1,
      }
    );

    for (const item of items) {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, [items]);

  if (items.length === 0) return null;

  function handleClick(e: React.MouseEvent<HTMLAnchorElement>, id: string) {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveId(id);
    }
  }

  return (
    <nav
      className="sticky top-24 self-start"
      aria-label="Spis tresci"
    >
      <h4 className="text-xs font-medium uppercase tracking-wider text-earth-400 mb-3">
        Spis tresci
      </h4>
      <ul className="space-y-1.5 border-l border-warm-200">
        {items.map((item) => {
          const isActive = activeId === item.id;
          const indent = item.level <= 2 ? 'pl-4' : item.level === 3 ? 'pl-7' : 'pl-10';

          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                onClick={(e) => handleClick(e, item.id)}
                className={`
                  block text-sm leading-relaxed py-0.5 ${indent}
                  transition-colors duration-200
                  ${
                    isActive
                      ? 'text-sage-700 font-medium border-l-2 border-sage-500 -ml-px'
                      : 'text-earth-500 hover:text-earth-700'
                  }
                `}
              >
                {item.text}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
