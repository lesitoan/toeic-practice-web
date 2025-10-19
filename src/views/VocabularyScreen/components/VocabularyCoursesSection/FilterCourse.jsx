import { Search, Filter } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { debounce } from 'lodash';
import { COLLECTION_FILTERS } from '../../constants';
import { Input } from '@nextui-org/react';

export default function FilterCourse({ filter, setFilter }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const handleTabChange = (tab) => {
    const params = new URLSearchParams(searchParams);
    params.set(tab.key, tab.value);
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleSearchChange = debounce((value) => {
    const params = new URLSearchParams(searchParams);
    if (value === '') {
      params.delete('search');
    } else {
      params.set('search', value);
    }
    router.push(`${pathname}?${params.toString()}`);
  }, 500);

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 mb-8">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />

          <Input
            name="search"
            placeholder="Tìm kiếm bộ từ vựng..."
            type="text"
            color="primary"
            onValueChange={handleSearchChange}
            classNames={{
              base: 'h-12',
              input: `text-md`,
              inputWrapper: `!h-[300px] !rounded-lg`,
            }}
          />
        </div>
        {/* <button className="flex items-center gap-2 px-6 py-3 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors">
          <Filter className="w-5 h-5" />
          Lọc
        </button> */}
      </div>

      {/* Quick Filter Tabs */}
      <div className="flex flex-wrap gap-2 mt-4">
        {COLLECTION_FILTERS.map((tab) => (
          <button
            key={tab.value}
            onClick={() => handleTabChange(tab)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              filter.type === tab.value
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
}
