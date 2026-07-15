'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import { Search } from 'lucide-react';
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

  return (
    <form onSubmit={onSearch} className="max-w-md mx-auto">
      <div className="flex items-center gap-2 p-1.5 rounded-lg bg-white border border-dh-border focus-within:border-dh-teal focus-within:ring-2 focus-within:ring-teal-100 transition-all">
        <div className="pl-3 text-gray-400">
          <Search size={16} />
        </div>
        <input
          name="search"
          type="search"
          placeholder="Search resources..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="flex-1 py-2 bg-transparent text-sm text-gray-900 outline-none placeholder-gray-400"
        />
        <button type="submit" className="dh-btn dh-btn-primary text-xs py-1.5 px-3">
          Search
        </button>
      </div>
    </form>
  );
};

export default SearchResource;
