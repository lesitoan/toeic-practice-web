'use client';
import { Input } from '@nextui-org/react';
import { debounce } from 'lodash';
import { Search } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export function Filter() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

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
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="mb-4">
        <div className="relative">
          <Search className="absolute left-3 top-3 text-gray-400" size={20} />
          <Input
            name="search"
            placeholder="Tìm kiếm từ vựng..."
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
      </div>

      {/* <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onCategoryChange(category)}
            className={`px-4 py-2 rounded-full font-medium transition-colors ${
              selectedCategory === category
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {category}
          </button>
        ))}
      </div> */}
    </div>
  );
}
