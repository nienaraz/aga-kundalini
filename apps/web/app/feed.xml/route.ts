import { NextResponse } from 'next/server';
import { getAllArticles, getAllNewsletterIssues } from '@joga/content';
import { getDisabledRoutes } from '@joga/config/featureFlags';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export async function GET() {
  const disabledRoutes = getDisabledRoutes();

  function isAllowed(link: string): boolean {
    const path = link.replace(BASE_URL, '');
    return !disabledRoutes.some(
      (disabled) => path === disabled || path.startsWith(disabled + '/')
    );
  }

  // Collect items from articles and newsletter issues
  const feedItems: Array<{
    title: string;
    link: string;
    description: string;
    pubDate: string;
    guid: string;
  }> = [];

  // Articles
  try {
    const articles = getAllArticles();
    for (const article of articles) {
      const link = `${BASE_URL}/library/${article.category}/${article.slug}`;
      if (!isAllowed(link)) continue;
      feedItems.push({
        title: article.title,
        link,
        description: article.description,
        pubDate: new Date(article.publishedAt).toUTCString(),
        guid: link,
      });
    }
  } catch {
    // Content may not exist yet
  }

  // Newsletter issues
  try {
    const issues = getAllNewsletterIssues();
    for (const issue of issues) {
      const link = `${BASE_URL}/newsletter/${issue.slug}`;
      if (!isAllowed(link)) continue;
      feedItems.push({
        title: issue.title,
        link,
        description: issue.description,
        pubDate: new Date(issue.publishedAt).toUTCString(),
        guid: link,
      });
    }
  } catch {
    // Content may not exist yet
  }

  // Sort by publication date (newest first)
  feedItems.sort(
    (a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime()
  );

  const rssItems = feedItems
    .map(
      (item) => `
    <item>
      <title><![CDATA[${item.title}]]></title>
      <link>${escapeXml(item.link)}</link>
      <description><![CDATA[${item.description}]]></description>
      <pubDate>${item.pubDate}</pubDate>
      <guid isPermaLink="true">${escapeXml(item.guid)}</guid>
    </item>`
    )
    .join('\n');

  const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Aga - Joga Kundalini</title>
    <link>${BASE_URL}</link>
    <description>Edukacja o ukladzie nerwowym, praktyki regulacji i joga kundalini.</description>
    <language>pl</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${BASE_URL}/feed.xml" rel="self" type="application/rss+xml"/>
    ${rssItems}
  </channel>
</rss>`;

  return new NextResponse(feed, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
    },
  });
}
