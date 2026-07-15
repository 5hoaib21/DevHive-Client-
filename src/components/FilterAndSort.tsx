'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { X } from 'lucide-react';

const categories = ['development', 'design', 'marketing', 'writing', 'education', 'business'];
const languages = ['javascript', 'python', 'typescript', 'go', 'rust'];
const difficulties = ['beginner', 'intermediate', 'advanced'];
const sortOptions = [
  { value: 'latest', label: 'Latest' },
  { value: 'popular', label: 'Most Popular' },
  { value: 'copied', label: 'Most Copied' },
];

const FilterAndSort = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const updateFilters = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value && value !== 'all' && value !== '') {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push('/resources?' + params.toString());
  };

  const currentCategory = searchParams.get('category') || '';
  const currentLanguage = searchParams.get('language') || '';
  const currentDifficulty = searchParams.get('difficulty') || '';
  const currentSort = searchParams.get('sort') || 'latest';

  const activeFilters: { key: string; label: string }[] = [];
  if (currentCategory) activeFilters.push({ key: 'category', label: currentCategory });
  if (currentLanguage) activeFilters.push({ key: 'language', label: currentLanguage });
  if (currentDifficulty) activeFilters.push({ key: 'difficulty', label: currentDifficulty });
  if (currentSort !== 'latest') activeFilters.push({ key: 'sort', label: currentSort });

  const clearAll = () => router.push('/resources');

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        <select
          value={currentCategory}
          onChange={(e) => updateFilters('category', e.target.value)}
          className="dh-input w-auto min-w-[140px]"
        >
          <option value="">All Categories</option>
          {categories.map((c) => <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>)}
        </select>

        <select
          value={currentLanguage}
          onChange={(e) => updateFilters('language', e.target.value)}
          className="dh-input w-auto min-w-[140px]"
        >
          <option value="">All Languages</option>
          {languages.map((l) => <option key={l} value={l}>{l.charAt(0).toUpperCase() + l.slice(1)}</option>)}
        </select>

        <select
          value={currentDifficulty}
          onChange={(e) => updateFilters('difficulty', e.target.value)}
          className="dh-input w-auto min-w-[140px]"
        >
          <option value="">All Levels</option>
          {difficulties.map((d) => <option key={d} value={d}>{d.charAt(0).toUpperCase() + d.slice(1)}</option>)}
        </select>

        <select
          value={currentSort}
          onChange={(e) => updateFilters('sort', e.target.value)}
          className="dh-input w-auto min-w-[140px]"
        >
          {sortOptions.map((opt) => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
        </select>

        {activeFilters.length > 0 && (
          <button onClick={clearAll} className="dh-btn dh-btn-ghost text-xs text-dh-danger">
            <X size={14} /> Clear
          </button>
        )}
      </div>

      {activeFilters.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {activeFilters.map((filter) => (
            <span key={filter.key} className="dh-badge dh-badge-category">
              {filter.label}
              <button onClick={() => updateFilters(filter.key, '')} className="ml-1 hover:text-dh-danger">x</button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default FilterAndSort;
