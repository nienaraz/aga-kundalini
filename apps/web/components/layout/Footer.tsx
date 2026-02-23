import Link from 'next/link';
import { footerNavigation } from '@/lib/navigation';

/* ------------------------------------------------------------------ */
/*  Footer – three-column links, newsletter, copyright, disclaimer     */
/* ------------------------------------------------------------------ */

export default function Footer() {
  return (
    <footer className="bg-earth-900 text-warm-100" role="contentinfo">
      {/* ---- Main footer content ---- */}
      <div className="content-container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Column 1 – Main navigation */}
          <div>
            <h3 className="text-sm font-medium uppercase tracking-wider text-warm-300 mb-4">
              Nawigacja
            </h3>
            <ul className="space-y-2.5">
              {footerNavigation.main.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-warm-200 hover:text-white transition-colors text-sm"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2 – Secondary links */}
          <div>
            <h3 className="text-sm font-medium uppercase tracking-wider text-warm-300 mb-4">
              Informacje
            </h3>
            <ul className="space-y-2.5">
              {footerNavigation.secondary.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-warm-200 hover:text-white transition-colors text-sm"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 – Legal links */}
          <div>
            <h3 className="text-sm font-medium uppercase tracking-wider text-warm-300 mb-4">
              Prawne
            </h3>
            <ul className="space-y-2.5">
              {footerNavigation.legal.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-warm-200 hover:text-white transition-colors text-sm"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 – Newsletter signup */}
          <div>
            <h3 className="text-sm font-medium uppercase tracking-wider text-warm-300 mb-4">
              Newsletter
            </h3>
            <p className="text-warm-300 text-sm mb-4 leading-relaxed">
              Krótkie inspiracje o regulacji nerwowej i jodze. Bez spamu, raz w&nbsp;tygodniu.
            </p>
            <NewsletterForm />
          </div>
        </div>
      </div>

      {/* ---- Bottom bar ---- */}
      <div className="border-t border-earth-800">
        <div className="content-container py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Copyright */}
          <p className="text-warm-400 text-xs text-center sm:text-left">
            &copy; 2024 Aga &middot; Joga Kundalini. Wszelkie prawa zastrzeżone.
          </p>

          {/* Medical disclaimer */}
          <p className="text-warm-500 text-xs text-center sm:text-right">
            Ta strona nie stanowi porady medycznej.
          </p>
        </div>
      </div>
    </footer>
  );
}

/* ------------------------------------------------------------------ */
/*  NewsletterForm – simple email + submit (client component)          */
/* ------------------------------------------------------------------ */

function NewsletterForm() {
  return (
    <form
      action="/api/newsletter"
      method="POST"
      className="flex flex-col gap-2"
    >
      <label htmlFor="footer-email" className="sr-only">
        Adres e-mail
      </label>
      <input
        id="footer-email"
        name="email"
        type="email"
        required
        placeholder="twoj@email.pl"
        autoComplete="email"
        className="
          w-full px-4 py-2.5 rounded-lg
          bg-earth-800 border border-earth-700
          text-warm-100 placeholder-warm-500
          text-sm
          focus:outline-none focus:ring-2 focus:ring-sage-500 focus:border-transparent
          transition-colors
        "
      />
      <button
        type="submit"
        className="
          w-full px-4 py-2.5 rounded-lg
          bg-sage-600 text-white text-sm font-medium
          hover:bg-sage-500 active:bg-sage-700
          transition-colors
        "
      >
        Zapisz się
      </button>
    </form>
  );
}
