type WhatToTryNowProps = { items: string[] };

export function WhatToTryNow({ items }: WhatToTryNowProps) {
  if (items.length === 0) return null;

  return (
    <div className="rounded-3xl bg-warm-100/60 border border-warm-200/40 p-7 my-10">
      <div className="flex items-center gap-2.5 mb-5">
        <svg className="w-5 h-5 text-earth-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h3 className="font-serif text-heading-sm text-earth-800">Co wypróbować teraz</h3>
      </div>
      <ol className="space-y-3 list-none">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-3.5 text-body-sm text-earth-800 leading-relaxed">
            <span className="w-7 h-7 rounded-full bg-cobalt-100/70 text-cobalt-700 flex items-center justify-center text-xs font-semibold shrink-0 mt-0.5">
              {i + 1}
            </span>
            {item}
          </li>
        ))}
      </ol>
    </div>
  );
}
