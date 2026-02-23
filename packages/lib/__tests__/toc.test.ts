import { describe, it, expect } from 'vitest';
import { extractToc } from '../src/toc';

describe('extractToc', () => {
  it('wyodrębnia nagłówki z MDX', () => {
    const mdx = `
# Tytuł (h1 - pomijamy)
## Pierwszy rozdział
Tekst...
### Podrozdział
Więcej tekstu...
## Drugi rozdział
Koniec.
    `;
    const toc = extractToc(mdx);
    expect(toc).toHaveLength(3);
    expect(toc[0]).toMatchObject({ text: 'Pierwszy rozdział', level: 2 });
    expect(toc[1]).toMatchObject({ text: 'Podrozdział', level: 3 });
    expect(toc[2]).toMatchObject({ text: 'Drugi rozdział', level: 2 });
  });

  it('generuje unikalne id', () => {
    const mdx = '## Test nagłówek\n## Inny nagłówek';
    const toc = extractToc(mdx);
    expect(toc[0].id).toBe('test-naglowek');
    expect(toc[1].id).toBe('inny-naglowek');
  });

  it('zwraca pustą tablicę dla tekstu bez nagłówków', () => {
    expect(extractToc('Tylko tekst.')).toEqual([]);
  });
});
