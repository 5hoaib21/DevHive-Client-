// components/SearchResource.tsx
'use client';
import { Button, Input } from '@heroui/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

const SearchResource = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchValue, setSearchValue] = useState(searchParams?.get('search') || '');
  
  const onSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.target as HTMLFormElement;
    const search = (target.elements.namedItem('search') as HTMLInputElement)?.value || searchValue;
    
    const params = new URLSearchParams(searchParams?.toString() || '');
    
    if (search && search.trim()) {
      params.set('search', search.trim());
    } else {
      params.delete('search');
    }
    
    router.push(`/resources?${params.toString()}`);
  };
  
  return (
    <form onSubmit={onSearch} className="flex items-center gap-2">
      <Input 
        name="search"
        type="search" 
        placeholder="Search resources..." 
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        className="flex-1"
      />
      <Button type="submit" size="sm">
        Search
      </Button>
    </form>
  );
};

export default SearchResource;