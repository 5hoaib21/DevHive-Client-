'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { X, SlidersHorizontal, ChevronDown } from 'lucide-react';
import { useState } from 'react';

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
  const [isFilterOpen, setIsFilterOpen] = useState(false);

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

  const activeFilters: { key: string; label: string; value: string }[] = [];
  if (currentCategory) activeFilters.push({ key: 'category', label: 'Category', value: currentCategory });
  if (currentLanguage) activeFilters.push({ key: 'language', label: 'Language', value: currentLanguage });
  if (currentDifficulty) activeFilters.push({ key: 'difficulty', label: 'Level', value: currentDifficulty });
  if (currentSort !== 'latest') activeFilters.push({ key: 'sort', label: 'Sort', value: currentSort });

  const clearAll = () => router.push('/resources');

  const getFilterLabel = (key: string, value: string) => {
    if (key === 'category') return value.charAt(0).toUpperCase() + value.slice(1);
    if (key === 'language') return value.charAt(0).toUpperCase() + value.slice(1);
    if (key === 'difficulty') return value.charAt(0).toUpperCase() + value.slice(1);
    if (key === 'sort') {
      const option = sortOptions.find(opt => opt.value === value);
      return option ? option.label : value;
    }
    return value;
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Desktop Filters */}
      <div className="hidden md:flex items-center gap-3 flex-wrap">
        <div className="flex items-center gap-2 flex-wrap">
          <select
            value={currentCategory}
            onChange={(e) => updateFilters('category', e.target.value)}
            className="px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:border-dh-teal focus:ring-2 focus:ring-dh-teal/20 outline-none transition-all"
          >
            <option value="">All Categories</option>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c.charAt(0).toUpperCase() + c.slice(1)}
              </option>
            ))}
          </select>

          <select
            value={currentLanguage}
            onChange={(e) => updateFilters('language', e.target.value)}
            className="px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:border-dh-teal focus:ring-2 focus:ring-dh-teal/20 outline-none transition-all"
          >
            <option value="">All Languages</option>
            {languages.map((l) => (
              <option key={l} value={l}>
                {l.charAt(0).toUpperCase() + l.slice(1)}
              </option>
            ))}
          </select>

          <select
            value={currentDifficulty}
            onChange={(e) => updateFilters('difficulty', e.target.value)}
            className="px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:border-dh-teal focus:ring-2 focus:ring-dh-teal/20 outline-none transition-all"
          >
            <option value="">All Levels</option>
            {difficulties.map((d) => (
              <option key={d} value={d}>
                {d.charAt(0).toUpperCase() + d.slice(1)}
              </option>
            ))}
          </select>

          <select
            value={currentSort}
            onChange={(e) => updateFilters('sort', e.target.value)}
            className="px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:border-dh-teal focus:ring-2 focus:ring-dh-teal/20 outline-none transition-all"
          >
            {sortOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        {activeFilters.length > 0 && (
          <button
            onClick={clearAll}
            className="px-3 py-2 text-sm text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors flex items-center gap-1"
          >
            <X className="h-4 w-4" />
            Clear All
          </button>
        )}
      </div>

      {/* Mobile Filters */}
      <div className="md:hidden">
        <button
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg flex items-center justify-between hover:border-gray-300 transition-colors"
        >
          <span className="flex items-center gap-2 text-gray-700">
            <SlidersHorizontal className="h-4 w-4" />
            Filters & Sorting
            {activeFilters.length > 0 && (
              <span className="px-2 py-0.5 bg-dh-teal text-white text-xs rounded-full">
                {activeFilters.length}
              </span>
            )}
          </span>
          <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform ${isFilterOpen ? 'rotate-180' : ''}`} />
        </button>

        {isFilterOpen && (
          <div className="mt-3 p-4 bg-white border border-gray-200 rounded-lg space-y-4">
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1.5">Category</label>
                <select
                  value={currentCategory}
                  onChange={(e) => updateFilters('category', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:border-dh-teal focus:ring-2 focus:ring-dh-teal/20 outline-none"
                >
                  <option value="">All Categories</option>
                  {categories.map((c) => (
                    <option key={c} value={c}>
                      {c.charAt(0).toUpperCase() + c.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1.5">Language</label>
                <select
                  value={currentLanguage}
                  onChange={(e) => updateFilters('language', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:border-dh-teal focus:ring-2 focus:ring-dh-teal/20 outline-none"
                >
                  <option value="">All Languages</option>
                  {languages.map((l) => (
                    <option key={l} value={l}>
                      {l.charAt(0).toUpperCase() + l.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1.5">Level</label>
                <select
                  value={currentDifficulty}
                  onChange={(e) => updateFilters('difficulty', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:border-dh-teal focus:ring-2 focus:ring-dh-teal/20 outline-none"
                >
                  <option value="">All Levels</option>
                  {difficulties.map((d) => (
                    <option key={d} value={d}>
                      {d.charAt(0).toUpperCase() + d.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1.5">Sort By</label>
                <select
                  value={currentSort}
                  onChange={(e) => updateFilters('sort', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:border-dh-teal focus:ring-2 focus:ring-dh-teal/20 outline-none"
                >
                  {sortOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>

              {activeFilters.length > 0 && (
                <button
                  onClick={clearAll}
                  className="w-full px-4 py-2 bg-red-50 text-red-600 text-sm font-medium rounded-lg hover:bg-red-100 transition-colors"
                >
                  Clear All Filters
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Active Filters Tags */}
      {activeFilters.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {activeFilters.map((filter) => (
            <span
              key={filter.key}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-dh-teal/10 text-dh-teal text-sm rounded-full"
            >
              <span className="font-medium">{filter.label}:</span>
              {getFilterLabel(filter.key, filter.value)}
              <button
                onClick={() => updateFilters(filter.key, '')}
                className="ml-1 hover:text-dh-teal/70 transition-colors"
              >
                <X className="h-3 w-3" />
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default FilterAndSort;