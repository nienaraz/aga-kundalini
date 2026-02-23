'use client';

import { useState, useCallback } from 'react';

type FilterState = {
  category: string;
  tags: string[];
  durationRange?: [number, number];
  intensity?: number;
};

type FilterBarProps = {
  categories: string[];
  tags: string[];
  onFilter: (filters: FilterState) => void;
  showDuration?: boolean;
  showIntensity?: boolean;
};

const durationOptions = [
  { label: 'Wszystkie', value: [0, 999] as [number, number] },
  { label: '1-3 min', value: [1, 3] as [number, number] },
  { label: '5-10 min', value: [5, 10] as [number, number] },
  { label: '10-20 min', value: [10, 20] as [number, number] },
  { label: '20+ min', value: [20, 999] as [number, number] },
];

export function FilterBar({ categories, tags, onFilter, showDuration = false, showIntensity = false }: FilterBarProps) {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [durationRange, setDurationRange] = useState<[number, number]>([0, 999]);
  const [intensity, setIntensity] = useState<number>(0);
  const [tagsOpen, setTagsOpen] = useState(false);

  const emitFilter = useCallback(
    (updates: Partial<{ category: string; tags: string[]; durationRange: [number, number]; intensity: number }>) => {
      onFilter({
        category: updates.category ?? selectedCategory,
        tags: updates.tags ?? selectedTags,
        durationRange: updates.durationRange ?? durationRange,
        intensity: updates.intensity ?? intensity,
      });
    },
    [selectedCategory, selectedTags, durationRange, intensity, onFilter]
  );

  function handleCategoryChange(cat: string) {
    const next = cat === selectedCategory ? '' : cat;
    setSelectedCategory(next);
    emitFilter({ category: next });
  }

  function handleTagToggle(tag: string) {
    const next = selectedTags.includes(tag) ? selectedTags.filter((t) => t !== tag) : [...selectedTags, tag];
    setSelectedTags(next);
    emitFilter({ tags: next });
  }

  function handleDurationChange(range: [number, number]) {
    setDurationRange(range);
    emitFilter({ durationRange: range });
  }

  function handleIntensityChange(level: number) {
    const next = level === intensity ? 0 : level;
    setIntensity(next);
    emitFilter({ intensity: next });
  }

  const pillBase = "px-4 py-2 rounded-2xl text-body-sm transition-colors duration-200";
  const pillActive = "bg-sage-600 text-white shadow-soft";
  const pillInactive = "bg-warm-100/60 text-earth-600 hover:bg-warm-200/60";

  return (
    <div className="space-y-4 mb-10">
      {/* Category pills */}
      <div className="flex flex-wrap gap-2 items-center">
        <span className="text-xs font-medium uppercase tracking-[0.12em] text-earth-400 mr-1">Kategoria:</span>
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => handleCategoryChange(cat)}
            className={`${pillBase} ${selectedCategory === cat ? pillActive : pillInactive}`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Tags dropdown */}
      {tags.length > 0 && (
        <div className="relative">
          <button
            type="button"
            onClick={() => setTagsOpen((v) => !v)}
            className="flex items-center gap-2 px-4 py-2 rounded-2xl text-body-sm bg-warm-100/60 text-earth-600 hover:bg-warm-200/60 transition-colors"
          >
            Tagi
            {selectedTags.length > 0 && (
              <span className="bg-sage-600 text-white text-xs px-2 py-0.5 rounded-full">{selectedTags.length}</span>
            )}
            <svg className={`w-3.5 h-3.5 transition-transform ${tagsOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>
          </button>

          {tagsOpen && (
            <div className="absolute top-full mt-2 left-0 z-10 bg-white border border-warm-200/60 rounded-3xl shadow-soft-lg p-4 min-w-48 max-h-60 overflow-y-auto">
              {tags.map((tag) => (
                <label key={tag} className="flex items-center gap-2.5 py-1.5 px-2 text-body-sm text-earth-700 hover:bg-warm-50 rounded-xl cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedTags.includes(tag)}
                    onChange={() => handleTagToggle(tag)}
                    className="rounded border-earth-300 text-sage-600 focus:ring-sage-500"
                  />
                  {tag}
                </label>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Duration filter */}
      {showDuration && (
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-xs font-medium uppercase tracking-[0.12em] text-earth-400 mr-1">Czas:</span>
          {durationOptions.map((opt) => (
            <button
              key={opt.label}
              type="button"
              onClick={() => handleDurationChange(opt.value)}
              className={`${pillBase} ${durationRange[0] === opt.value[0] && durationRange[1] === opt.value[1] ? pillActive : pillInactive}`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}

      {/* Intensity filter */}
      {showIntensity && (
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium uppercase tracking-[0.12em] text-earth-400 mr-1">Intensywność:</span>
          {[1, 2, 3, 4, 5].map((level) => (
            <button
              key={level}
              type="button"
              onClick={() => handleIntensityChange(level)}
              aria-label={`Intensywność ${level}`}
              className={`w-8 h-8 rounded-xl text-xs font-medium transition-colors ${intensity === level ? 'bg-sage-600 text-white' : 'bg-warm-100/60 text-earth-600 hover:bg-warm-200/60'}`}
            >
              {level}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
