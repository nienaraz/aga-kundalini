import { describe, it, expect } from 'vitest';
import { slugify, deslugify } from '../src/slug';

describe('slugify', () => {
  it('zamienia polskie znaki', () => {
    expect(slugify('Układ nerwowy')).toBe('uklad-nerwowy');
    expect(slugify('Ścieżka')).toBe('sciezka');
    expect(slugify('źródło')).toBe('zrodlo');
    expect(slugify('Ćwiczenie łagodne')).toBe('cwiczenie-lagodne');
  });

  it('zamienia spacje i usuwa znaki specjalne', () => {
    expect(slugify('Oddech & ciało')).toBe('oddech-cialo');
    expect(slugify('  wiele  spacji  ')).toBe('wiele-spacji');
    expect(slugify('test!@#$%')).toBe('test');
  });

  it('zwraca pusty string dla pustego wejścia', () => {
    expect(slugify('')).toBe('');
  });

  it('obsługuje wielkie litery', () => {
    expect(slugify('WIELKIE LITERY')).toBe('wielkie-litery');
  });
});

describe('deslugify', () => {
  it('zamienia myślniki na spacje i kapitalizuje', () => {
    expect(deslugify('uklad-nerwowy')).toBe('Uklad nerwowy');
    expect(deslugify('reaktywnosc-vs-odpowiedz')).toBe('Reaktywnosc vs odpowiedz');
  });
});
