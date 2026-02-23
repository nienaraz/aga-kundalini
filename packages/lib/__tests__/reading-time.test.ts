import { describe, it, expect } from 'vitest';
import { calculateReadingTime } from '../src/reading-time';

describe('calculateReadingTime', () => {
  it('oblicza czas czytania', () => {
    const text = Array(400).fill('słowo').join(' ');
    const result = calculateReadingTime(text);
    expect(result.words).toBe(400);
    expect(result.minutes).toBe(2); // 400/200 = 2
  });

  it('zaokrągla w górę', () => {
    const text = Array(250).fill('słowo').join(' ');
    const result = calculateReadingTime(text);
    expect(result.minutes).toBe(2); // ceil(250/200) = 2
  });

  it('minimum 1 minuta', () => {
    const result = calculateReadingTime('krótki tekst');
    expect(result.minutes).toBe(1);
  });

  it('obsługuje pusty tekst', () => {
    const result = calculateReadingTime('');
    expect(result.minutes).toBe(1);
    expect(result.words).toBe(0);
  });
});
