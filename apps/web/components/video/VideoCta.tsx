import Link from 'next/link';

/* ------------------------------------------------------------------ */
/*  VideoCta – small CTA block for articles/practices                   */
/*  "Obejrzyj powiązany materiał"                                       */
/* ------------------------------------------------------------------ */

interface VideoCtaProps {
  videoSlug: string;
  title: string;
  description?: string;
}

export default function VideoCta({ videoSlug, title, description }: VideoCtaProps) {
  return (
    <aside
      className="
        my-8 rounded-xl border border-sage-200 bg-sage-50/50
        p-5 sm:p-6
      "
    >
      <Link
        href={`/video/${videoSlug}`}
        className="
          group flex items-start gap-4
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage-500
          rounded-lg
        "
      >
        {/* Play icon */}
        <div
          className="
            shrink-0 mt-0.5
            w-10 h-10 flex items-center justify-center
            rounded-full bg-sage-100
            group-hover:bg-sage-200
            transition-colors duration-200
          "
        >
          <svg
            className="w-4 h-4 text-sage-600 ml-0.5"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>

        {/* Text */}
        <div className="flex-1 min-w-0">
          <p className="text-xs font-medium uppercase tracking-wider text-sage-500 mb-1">
            Obejrzyj powiazany material
          </p>
          <p
            className="
              font-serif text-base text-earth-800
              group-hover:text-sage-700
              transition-colors duration-200
              leading-snug
            "
          >
            {title}
          </p>
          {description && (
            <p className="mt-1 text-sm text-earth-500 leading-relaxed line-clamp-2">
              {description}
            </p>
          )}
        </div>

        {/* Arrow */}
        <svg
          className="
            shrink-0 mt-1 w-5 h-5 text-sage-400
            group-hover:text-sage-600 group-hover:translate-x-0.5
            transition-all duration-200
          "
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </Link>
    </aside>
  );
}
