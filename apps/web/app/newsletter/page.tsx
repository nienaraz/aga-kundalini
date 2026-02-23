import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllNewsletterIssues } from '@/lib/content';
import { NewsletterForm } from '@/components/forms/NewsletterForm';

export const metadata: Metadata = {
  title: 'Newsletter',
  description: 'Zapisz sie na cotygodniowy newsletter o regulacji ukladu nerwowego i jodze kundalini.',
};

export default function NewsletterPage() {
  const issues = getAllNewsletterIssues();

  return (
    <div className="section-spacing">
      <div className="content-container max-w-2xl">
        <h1 className="font-serif text-3xl md:text-4xl text-earth-900 mb-4">
          Newsletter
        </h1>
        <p className="text-calm-body text-earth-600 mb-10 leading-relaxed">
          Krotkie inspiracje o regulacji nerwowej i jodze. Bez spamu, raz w tygodniu.
          Mozesz sie wypisac w kazdej chwili.
        </p>

        {/* Signup form */}
        <section className="mb-16">
          <div className="rounded-xl bg-sage-50/50 border border-sage-200 p-8">
            <h2 className="font-serif text-xl text-earth-800 mb-4 text-center">
              Zapisz sie
            </h2>
            <NewsletterForm />
          </div>
        </section>

        {/* Archive */}
        <section>
          <h2 className="font-serif text-xl text-earth-800 mb-6">Archiwum</h2>
          {issues.length > 0 ? (
            <div className="space-y-3">
              {issues.map((issue) => (
                <div key={issue.slug} className="card-calm">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs text-earth-400 mr-2">#{issue.issueNumber}</span>
                      <span className="text-sm font-medium text-earth-800">{issue.title}</span>
                    </div>
                    <span className="text-xs text-earth-400">{issue.publishedAt}</span>
                  </div>
                  {issue.description && (
                    <p className="text-xs text-earth-500 mt-1">{issue.description}</p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-earth-500">
              Archiwum bedzie dostepne po pierwszym wydaniu.
            </p>
          )}
        </section>
      </div>
    </div>
  );
}
