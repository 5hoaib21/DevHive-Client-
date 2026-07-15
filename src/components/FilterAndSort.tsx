
'use client';

import { useRouter, useSearchParams } from 'next/navigation';

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
    router.push(params.toString() ? `/resources?${params.toString()}` : '/resources');
  };

  const currentCategory = searchParams.get('category') || '';
  const currentLanguage = searchParams.get('language') || '';
  const currentDifficulty = searchParams.get('difficulty') || '';
  const currentSort = searchParams.get('sort') || 'latest';

  const activeFilters = [];
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
          className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Categories</option>
          <option value="development">Development</option>
          <option value="design">Design</option>
          <option value="marketing">Marketing</option>
          <option value="writing">Writing</option>
          <option value="education">Education</option>
          <option value="business">Business</option>
        </select>

        <select
          value={currentLanguage}
          onChange={(e) => updateFilters('language', e.target.value)}
          className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Languages</option>
          <option value="javascript">JavaScript</option>
          <option value="python">Python</option>
          <option value="typescript">TypeScript</option>
          <option value="go">Go</option>
          <option value="rust">Rust</option>
        </select>

        <select
          value={currentDifficulty}
          onChange={(e) => updateFilters('difficulty', e.target.value)}
          className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Levels</option>
          <option value="beginner">Beginner</option>
          <option value="intermediate">Intermediate</option>
          <option value="advanced">Advanced</option>
        </select>

        <select
          value={currentSort}
          onChange={(e) => updateFilters('sort', e.target.value)}
          className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="latest">Latest</option>
          <option value="popular">Most Popular</option>
          <option value="copied">Most Copied</option>
        </select>

        {activeFilters.length > 0 && (
          <button
            onClick={clearAll}
            className="px-3 py-1.5 text-sm text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
          >
            Clear All
          </button>
        )}
      </div>

      {activeFilters.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {activeFilters.map((filter) => (
            <span
              key={filter.key}
              className="inline-flex items-center gap-1 px-2.5 py-1 bg-blue-50 text-blue-700 text-xs rounded-full"
            >
              {filter.label}
              <button
                onClick={() => updateFilters(filter.key, '')}
                className="hover:text-red-500 ml-0.5"
              >
                ×
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default FilterAndSort;