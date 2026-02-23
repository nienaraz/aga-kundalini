import { describe, it, expect } from 'vitest';
import { createSearchIndex, searchContent, type SearchDocument } from '../src/search';

describe('search', () => {
  const docs: SearchDocument[] = [
    { id: '1', title: 'Układ nerwowy', description: 'Podstawy', content: 'Autonomiczny układ nerwowy', category: 'edukacja', tags: ['układ nerwowy'], type: 'article', url: '/library/uklad-nerwowy/podstawy' },
    { id: '2', title: 'Oddech uspokajający', description: 'Praktyka', content: 'Wydłużony wydech', category: 'oddech', tags: ['oddech'], type: 'practice', url: '/practices/oddech/uspokajajacy' },
    { id: '3', title: 'Reaktywność', description: 'Definicja', content: 'Automatyczna reakcja', category: 'slownik', tags: ['reaktywność'], type: 'glossary', url: '/resources/glossary#reaktywnosc' },
  ];

  it('tworzy indeks i wyszukuje', () => {
    const indexJson = createSearchIndex(docs);
    expect(indexJson).toBeTruthy();
    expect(typeof indexJson).toBe('string');

    const results = searchContent(indexJson, 'układ nerwowy');
    expect(results.length).toBeGreaterThan(0);
    expect(results[0].title).toBe('Układ nerwowy');
  });

  it('zwraca pusty wynik dla brakującego terminu', () => {
    const indexJson = createSearchIndex(docs);
    const results = searchContent(indexJson, 'xyznieistniejący');
    expect(results).toEqual([]);
  });
});
