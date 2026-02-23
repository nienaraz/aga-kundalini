import { NextRequest, NextResponse } from 'next/server';
import { searchContent } from '@joga/lib';
import fs from 'fs';
import path from 'path';

// Cache the index in memory after first load
let cachedIndex: string | null = null;

function loadSearchIndex(): string | null {
  if (cachedIndex) return cachedIndex;

  const indexPath = path.join(process.cwd(), 'public', 'search-index.json');

  if (!fs.existsSync(indexPath)) {
    console.warn(
      '[SEARCH] Brak pliku search-index.json. Uruchom: pnpm generate-search'
    );
    return null;
  }

  cachedIndex = fs.readFileSync(indexPath, 'utf-8');
  return cachedIndex;
}

// ---------------------------------------------------------------------------
// GET /api/search?q=...&category=...&limit=...
// ---------------------------------------------------------------------------

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q');
  const category = searchParams.get('category') || undefined;
  const limit = Math.min(
    Math.max(parseInt(searchParams.get('limit') || '10', 10), 1),
    50
  );

  if (!query || query.trim().length === 0) {
    return NextResponse.json(
      { success: false, message: 'Parametr "q" jest wymagany.' },
      { status: 400 }
    );
  }

  if (query.trim().length < 2) {
    return NextResponse.json(
      { success: false, message: 'Zapytanie musi miec co najmniej 2 znaki.' },
      { status: 400 }
    );
  }

  const indexJson = loadSearchIndex();

  if (!indexJson) {
    return NextResponse.json(
      {
        success: false,
        message: 'Indeks wyszukiwania nie jest jeszcze dostepny.',
      },
      { status: 503 }
    );
  }

  try {
    const results = searchContent(indexJson, query.trim(), { limit, category });

    return NextResponse.json(
      {
        success: true,
        query: query.trim(),
        count: results.length,
        results,
      },
      {
        status: 200,
        headers: {
          'Cache-Control': 'public, max-age=60, stale-while-revalidate=300',
        },
      }
    );
  } catch {
    return NextResponse.json(
      {
        success: false,
        message: 'Blad podczas wyszukiwania.',
      },
      { status: 500 }
    );
  }
}
