type KeyTakeawaysProps = { items: string[] };

export function KeyTakeaways({ items }: KeyTakeawaysProps) {
  if (items.length === 0) return null;

  return (
    <div className="rounded-3xl bg-sage-50/60 border border-sage-200/40 p-7 my-10">
      <div className="flex items-center gap-2.5 mb-5">
        <svg className="w-5 h-5 text-sage-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
        </svg>
        <h3 className="font-serif text-heading-sm text-sage-800">Kluczowe wnioski</h3>
      </div>
      <ul className="space-y-3">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-3 text-body-sm text-sage-800 leading-relaxed">
            <span className="w-1.5 h-1.5 rounded-full bg-sage-400 mt-2.5 shrink-0" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
