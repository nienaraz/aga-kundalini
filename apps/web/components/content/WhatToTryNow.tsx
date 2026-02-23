type WhatToTryNowProps = {
  items: string[];
};

export function WhatToTryNow({ items }: WhatToTryNowProps) {
  if (items.length === 0) return null;

  return (
    <div className="rounded-xl bg-earth-50 border border-earth-200 p-6 my-8">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <svg
          className="w-5 h-5 text-earth-600 shrink-0"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <h3 className="font-serif text-lg text-earth-800">Co wyprobowac teraz</h3>
      </div>

      {/* Numbered list */}
      <ol className="space-y-2.5 list-none">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-3 text-sm text-earth-800 leading-relaxed">
            <span className="w-6 h-6 rounded-full bg-earth-200 text-earth-700 flex items-center justify-center text-xs font-medium shrink-0 mt-0.5">
              {i + 1}
            </span>
            {item}
          </li>
        ))}
      </ol>
    </div>
  );
}
