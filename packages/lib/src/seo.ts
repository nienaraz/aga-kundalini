import type { Metadata } from "next";

const SITE_NAME = "Aga – Joga Kundalini";
const SITE_URL = "https://jogakundalini.pl";
const DEFAULT_LOCALE = "pl_PL";

export interface MetadataParams {
  title: string;
  description: string;
  path: string;
  image?: string;
  locale?: string;
  type?: "website" | "article";
}

/**
 * Generate Next.js Metadata object with proper SEO configuration.
 */
export function generateMetadata({
  title,
  description,
  path,
  image,
  locale = DEFAULT_LOCALE,
  type = "website",
}: MetadataParams): Metadata {
  const url = `${SITE_URL}${path}`;
  const ogImage = image ?? `${SITE_URL}/og-default.jpg`;

  return {
    title: {
      default: title,
      template: `%s | ${SITE_NAME}`,
    },
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      locale,
      type,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export interface JsonLdArticle {
  title: string;
  description: string;
  url: string;
  datePublished: string;
  dateModified?: string;
  author?: string;
  image?: string;
}

export interface JsonLdCourse {
  name: string;
  description: string;
  url: string;
  provider?: string;
}

export interface JsonLdWebPage {
  name: string;
  description: string;
  url: string;
}

export interface JsonLdFAQPage {
  questions: Array<{ question: string; answer: string }>;
}

type JsonLdParams =
  | { type: "Article"; data: JsonLdArticle }
  | { type: "Course"; data: JsonLdCourse }
  | { type: "WebPage"; data: JsonLdWebPage }
  | { type: "FAQPage"; data: JsonLdFAQPage };

/**
 * Generate JSON-LD structured data object for SEO.
 * Returns a plain object that should be rendered inside a <script type="application/ld+json"> tag.
 */
export function generateJsonLd(params: JsonLdParams): Record<string, unknown> {
  switch (params.type) {
    case "Article":
      return {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: params.data.title,
        description: params.data.description,
        url: params.data.url,
        datePublished: params.data.datePublished,
        ...(params.data.dateModified && {
          dateModified: params.data.dateModified,
        }),
        author: params.data.author
          ? {
              "@type": "Person",
              name: params.data.author,
            }
          : undefined,
        image: params.data.image,
        publisher: {
          "@type": "Organization",
          name: SITE_NAME,
          url: SITE_URL,
        },
      };

    case "Course":
      return {
        "@context": "https://schema.org",
        "@type": "Course",
        name: params.data.name,
        description: params.data.description,
        url: params.data.url,
        provider: {
          "@type": "Organization",
          name: params.data.provider ?? SITE_NAME,
          url: SITE_URL,
        },
      };

    case "WebPage":
      return {
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: params.data.name,
        description: params.data.description,
        url: params.data.url,
        publisher: {
          "@type": "Organization",
          name: SITE_NAME,
          url: SITE_URL,
        },
      };

    case "FAQPage":
      return {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: params.data.questions.map((q) => ({
          "@type": "Question",
          name: q.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: q.answer,
          },
        })),
      };
  }
}
