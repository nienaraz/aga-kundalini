'use client';

interface MarqueeProps {
  items: string[];
  separator?: string;
  className?: string;
}

export function Marquee({ items, separator = '·', className = '' }: MarqueeProps) {
  // Duplicate items for seamless loop
  const track = [...items, ...items];

  return (
    <div className={`overflow-hidden ${className}`} aria-hidden="true">
      <div className="marquee-track">
        {track.map((item, i) => (
          <span key={i} className="flex items-center gap-8">
            <span>{item}</span>
            <span className="text-sage-400 select-none">{separator}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
