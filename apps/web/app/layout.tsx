import type { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { RegulationBar } from '@/components/layout/RegulationBar';
import { SearchModal } from '@/components/search/SearchModal';
import { CalmModeProvider } from '@/components/providers/CalmModeProvider';
import { AuthProvider } from '@/components/providers/AuthProvider';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: {
    default: 'Aga · Joga Kundalini – Regulacja układu nerwowego',
    template: '%s | Aga · Joga Kundalini',
  },
  description:
    'Edukacja o układzie nerwowym, praktyki regulacji i joga kundalini. Świadome odpowiadanie zamiast reaktywności.',
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
    <html lang="pl" suppressHydrationWarning>
      <body className="min-h-screen flex flex-col">
        <AuthProvider>
          <CalmModeProvider>
            <Header />
            <RegulationBar />
            <main className="flex-1">{children}</main>
            <Footer />
            <SearchModal />
          </CalmModeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
