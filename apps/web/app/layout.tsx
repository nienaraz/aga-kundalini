import type { Metadata } from 'next';
import { Cormorant_Garamond, DM_Sans } from 'next/font/google';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { RegulationBar } from '@/components/layout/RegulationBar';
import { SearchModal } from '@/components/search/SearchModal';
import { CalmModeProvider } from '@/components/providers/CalmModeProvider';
import { AuthProvider } from '@/components/providers/AuthProvider';
import './globals.css';

const cormorant = Cormorant_Garamond({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-serif',
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ['latin', 'latin-ext'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: {
    default: 'Aga · Joga Kundalini – Regulacja układu nerwowego',
    template: '%s | Aga · Joga Kundalini',
  },
  description:
    'Społeczność regulacji. Praktyka odpowiedzi. Edukacja o układzie nerwowym, praktyki oddechowe i ruchowe inspirowane jogą kundalini.',
  keywords: [
    'joga kundalini',
    'układ nerwowy',
    'regulacja',
    'oddech',
    'medytacja',
    'reaktywność',
    'okno tolerancji',
  ],
  authors: [{ name: 'Aga' }],
  openGraph: {
    type: 'website',
    locale: 'pl_PL',
    siteName: 'Aga · Joga Kundalini',
  },
  twitter: {
    card: 'summary_large_image',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="pl"
      suppressHydrationWarning
      className={`${cormorant.variable} ${dmSans.variable}`}
    >
      <body className="noise-overlay min-h-screen flex flex-col font-sans">
        <AuthProvider>
          <CalmModeProvider>
            <Header />
            <RegulationBar />
            <main className="flex-1 relative">
              <div className="absolute inset-0 editorial-grid pointer-events-none" />
              <div className="relative z-10">{children}</div>
            </main>
            <Footer />
            <SearchModal />
          </CalmModeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
