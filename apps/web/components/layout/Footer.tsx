import Link from 'next/link';
import { footerNavigation } from '@/lib/navigation';

export function Footer() {
  return (
    <footer className="bg-earth-950 text-warm-200" role="contentinfo">
      {/* Main footer */}
      <div className="content-container py-16 md:py-20">
        {/* Top: Logo + tagline */}
        <div className="mb-14">
          <Link href="/" className="inline-block group">
            <span className="font-serif text-2xl text-warm-100 tracking-tight">
              Aga
              <span className="text-warm-500 font-normal mx-1.5">/</span>
              <span className="text-warm-300 font-normal">Joga Kundalini</span>
            </span>
          </Link>
          <p className="mt-3 text-warm-400 text-body-sm max-w-md leading-relaxed">
            Edukacja o regulacji nerwowej, praktyki oddechowe i ruchowe
            inspirowane joga kundalini.
          </p>
        </div>

        {/* Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-8">
          <div>
            <h3 className="text-xs font-medium uppercase tracking-[0.15em] text-warm-500 mb-5">
              Nawigacja
            </h3>
            <ul className="space-y-3">
              {footerNavigation.main.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-warm-300 hover:text-white transition-colors text-body-sm"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-medium uppercase tracking-[0.15em] text-warm-500 mb-5">
              Informacje
            </h3>
            <ul className="space-y-3">
              {footerNavigation.secondary.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-warm-300 hover:text-white transition-colors text-body-sm"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-medium uppercase tracking-[0.15em] text-warm-500 mb-5">
              Prawne
            </h3>
            <ul className="space-y-3">
              {footerNavigation.legal.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-warm-300 hover:text-white transition-colors text-body-sm"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-xs font-medium uppercase tracking-[0.15em] text-warm-500 mb-5">
              Newsletter
            </h3>
            <p className="text-warm-400 text-body-sm mb-5 leading-relaxed">
              Inspiracje o regulacji nerwowej. Bez spamu, raz w&nbsp;tygodniu.
            </p>
            <FooterNewsletterForm />
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-earth-800/60">
        <div className="content-container py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-warm-500 text-xs">
            &copy; {new Date().getFullYear()} Aga &middot; Joga Kundalini
          </p>
          <p className="text-warm-600 text-xs">
            Ta strona nie stanowi porady medycznej.
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterNewsletterForm() {
  return (
    <form action="/api/newsletter" method="POST" className="flex flex-col gap-2.5">
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
          w-full px-4 py-3 rounded-2xl
          bg-earth-900 border border-earth-800
          text-warm-100 placeholder-warm-600
          text-body-sm
          focus:outline-none focus:ring-2 focus:ring-sage-600 focus:border-transparent
          transition-colors
        "
      />
      <button
        type="submit"
        className="
          w-full px-4 py-3 rounded-2xl
          bg-sage-600 text-white text-body-sm font-medium
          hover:bg-sage-500 active:bg-sage-700
          transition-colors
        "
      >
        Zapisz się
      </button>
    </form>
  );
}

export default Footer;
