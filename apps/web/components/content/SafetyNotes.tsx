type SafetyNotesProps = { notes: string[] };

export function SafetyNotes({ notes }: SafetyNotesProps) {
  return (
    <div className="rounded-3xl bg-rose-50/60 border border-rose-200/40 p-7 my-10">
      <div className="flex items-center gap-2.5 mb-5">
        <svg className="w-5 h-5 text-rose-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
        </svg>
        <h3 className="font-serif text-heading-sm text-rose-800">Ważne</h3>
      </div>

      {notes.length > 0 && (
        <ul className="space-y-2.5 mb-5">
          {notes.map((note, i) => (
            <li key={i} className="flex items-start gap-3 text-body-sm text-rose-800 leading-relaxed">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-2.5 shrink-0" />
              {note}
            </li>
          ))}
        </ul>
      )}

      <p className="text-xs text-rose-600/80 border-t border-rose-200/40 pt-4 mt-4 leading-relaxed">
        To nie jest porada medyczna. Jeśli masz wątpliwości dotyczące swojego zdrowia,
        skonsultuj się z lekarzem lub specjalistą.
      </p>
    </div>
  );
}
