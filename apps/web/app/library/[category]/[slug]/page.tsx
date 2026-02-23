import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import {
  getAllArticles,
  getArticleBySlug,
  getArticlesByCategory,
} from '@/lib/content';
import { TableOfContents } from '@/components/content/TableOfContents';
import { KeyTakeaways } from '@/components/content/KeyTakeaways';
import { WhatToTryNow } from '@/components/content/WhatToTryNow';
import { SafetyNotes } from '@/components/content/SafetyNotes';
import { RelatedContent } from '@/components/content/RelatedContent';
import { SaveToFavorites } from '@/components/content/SaveToFavorites';
import { ReadingModeToggle } from '@/components/content/ReadingModeToggle';

export function generateStaticParams() {
  const articles = getAllArticles();
  return articles.map((a) => ({
    category: a.category,
    slug: a.slug,
  }));
}

export function generateMetadata({
  params,
}: {
  params: { category: string; slug: string };
}): Metadata {
  const article = getArticleBySlug(params.slug);
  if (!article) return { title: 'Nie znaleziono' };

  return {
    title: article.title,
    description: article.description,
    openGraph: {
      title: article.title,
      description: article.description,
      type: 'article',
      publishedTime: article.publishedAt,
      ...(article.updatedAt && { modifiedTime: article.updatedAt }),
      tags: article.tags,
    },
  };
}

function extractHeadings(content: string) {
  const headingRegex = /^(#{2,4})\s+(.+)$/gm;
  const items: { id: string; text: string; level: number }[] = [];
  let match;

  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length;
    const text = match[2].trim();
    const id = text
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-');
    items.push({ id, text, level });
  }

  return items;
}

export default function ArticlePage({
  params,
}: {
  params: { category: string; slug: string };
}) {
  const article = getArticleBySlug(params.slug);
  if (!article || article.category !== params.category) notFound();

  const headings = extractHeadings(article.content);

  // Related articles from same category (excluding current)
  const relatedArticles = getArticlesByCategory(params.category)
    .filter((a) => a.slug !== params.slug)
    .slice(0, 4)
    .map((a) => ({
      title: a.title,
      slug: a.slug,
      type: 'article' as const,
      category: a.category,
    }));

  // Related practices from frontmatter
  const relatedPractices = (article.relatedPractices || []).map((slug: string) => ({
    title: slug,
    slug,
    type: 'practice' as const,
    category: '',
  }));

  const allRelated = [...relatedArticles, ...relatedPractices];

  // JSON-LD structured data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    datePublished: article.publishedAt,
    ...(article.updatedAt && { dateModified: article.updatedAt }),
    author: { '@type': 'Person', name: 'Aga' },
    keywords: article.tags.join(', '),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="section-spacing">
        <div className="content-container">
          <div className="lg:grid lg:grid-cols-[1fr_220px] lg:gap-12">
            {/* Main content */}
            <article>
              {/* Header */}
              <header className="mb-10">
                <div className="flex items-center gap-3 mb-4 flex-wrap">
                  <span className="text-xs font-medium uppercase tracking-wider text-sage-600 bg-sage-50 px-2.5 py-1 rounded-full">
                    {article.category}
                  </span>
                  <span className="text-xs text-earth-400">
                    {article.difficulty}
                  </span>
                </div>

                <h1 className="font-serif text-3xl md:text-4xl text-earth-900 leading-tight mb-4">
                  {article.title}
                </h1>

                <p className="text-calm-body text-earth-600 leading-relaxed mb-6">
                  {article.description}
                </p>

                <div className="flex items-center gap-3 flex-wrap">
                  <SaveToFavorites
                    id={`article-${article.slug}`}
                    type="article"
                    title={article.title}
                  />
                  <ReadingModeToggle />
                </div>
              </header>

              {/* Key takeaways */}
              <KeyTakeaways items={article.keyTakeaways} />

              {/* MDX content */}
              <div className="prose-custom">
                <MDXRemote
                  source={article.content}
                  options={{
                    mdxOptions: {
                      remarkPlugins: [remarkGfm],
                      rehypePlugins: [rehypeSlug],
                    },
                  }}
                />
              </div>

              {/* Somatic cues as "what to try" */}
              {article.somaticCues && article.somaticCues.length > 0 && (
                <WhatToTryNow items={article.somaticCues} />
              )}

              {/* Safety notes (generic) */}
              <SafetyNotes notes={[]} />

              {/* Related content */}
              {allRelated.length > 0 && <RelatedContent items={allRelated} />}
            </article>

            {/* Sidebar TOC */}
            <aside className="hidden lg:block">
              <TableOfContents items={headings} />
            </aside>
          </div>
        </div>
      </div>
    </>
  );
}
