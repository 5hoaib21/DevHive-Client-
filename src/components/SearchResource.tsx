'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import { Search, X } from 'lucide-react';
import { useState } from 'react';

const SearchResource = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchValue, setSearchValue] = useState(searchParams?.get('search') || '');

  const onSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams?.toString() || '');
    if (searchValue && searchValue.trim()) {
      params.set('search', searchValue.trim());
    } else {
      params.delete('search');
    }
    router.push(`/resources?${params.toString()}`);
  };

  const clearSearch = () => {
    setSearchValue('');
    const params = new URLSearchParams(searchParams?.toString() || '');
    params.delete('search');
    router.push(`/resources?${params.toString()}`);
  };

  return (
    <form onSubmit={onSearch} className="w-full max-w-2xl mx-auto">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="search"
          placeholder="Search resources by title, description, or tags..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="w-full pl-10 pr-24 py-3 bg-white border border-gray-200 rounded-xl focus:border-dh-teal focus:ring-2 focus:ring-dh-teal/20 outline-none transition-all duration-200 text-gray-900 placeholder-gray-400"
        />
        <div className="absolute inset-y-0 right-0 flex items-center pr-2 space-x-1">
          {searchValue && (
            <button
              type="button"
              onClick={clearSearch}
              className="p-1.5 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          )}
          <button
            type="submit"
            className="px-4 py-1.5 bg-dh-teal text-white text-sm font-medium rounded-lg hover:bg-dh-teal/90 transition-colors"
          >
            Search
          </button>
        </div>
      </div>
    </form>
  );
};

export default SearchResource;