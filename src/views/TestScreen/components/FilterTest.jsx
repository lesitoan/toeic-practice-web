import { useEffect, useState } from 'react';
import { Search } from 'lucide-react';
import { useForm, Controller } from 'react-hook-form';
import CustomDropdown from '@/components/common/CustomDropdow';
import { Button, Input } from '@nextui-org/react';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import { debounce } from 'lodash';

export default function FilterTest() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const handleSearchChange = debounce((value) => {
    const params = new URLSearchParams(searchParams);
    if (value === '') {
      params.delete('search');
    } else {
      params.set('search', value);
      params.set('page', 1);
    }
    router.push(`${pathname}?${params.toString()}`);
  }, 500);

  const { control, watch } = useForm({
    defaultValues: {
      category: '',
    },
  });

  // const category = watch('category');
  // const skill = watch('skill');
  // const sortBy = watch('sortBy');

  // useEffect(() => {
  //   if (category || sortBy || skill) {
  //     setFilter((prev) => ({
  //       selectedCategory: category || prev.selectedCategory,
  //       selectedSkill: skill || prev.selectedSkill,
  //       sortBy: sortBy || prev.sortBy,
  //     }));
  //   }
  // }, [category, sortBy, skill]);

  // Get unique categories and skills
  const categories = ['Toeic', 'IELTS', 'Grammar', 'Vocabulary'];
  const skills = ['Listening', 'Reading', 'Writing', 'Speaking'];

  return (
    <div className="bg-bgSecondary shadow-lg rounded-lg p-4 md:p-6 mb-8 text-textPrimary">
      <div className="flex flex-col lg:flex-row gap-4 items-end">
        {/* Search Bar */}
        <div className="flex-1">
          <div className="relative">
            <Input
              name="vocabulary"
              placeholder="Nhập tên đề thi..."
              type="text"
              color="primary"
              onChange={(e) => handleSearchChange(e.target.value)}
              classNames={{
                base: '',
                input: 'text-md',
                inputWrapper: '!bg-blue-200 w-[300px] rounded-lg', // box input
              }}
            />
          </div>
        </div>

        {/* Category Filter */}
        <Controller
          name="category"
          control={control}
          render={({ field }) => (
            <CustomDropdown items={categories} value={field.value} onSelect={field.onChange} />
          )}
        />

        {/* Skill Filter */}
        <Controller
          name="skill"
          control={control}
          render={({ field }) => (
            <CustomDropdown items={skills} value={field.value} onSelect={field.onChange} />
          )}
        />

        {/* Sort By */}
        <Controller
          name="sortBy"
          control={control}
          render={({ field }) => (
            <CustomDropdown
              items={['participants', 'comments', 'duration', 'title']}
              value={field.value}
              onSelect={field.onChange}
            />
          )}
        />
      </div>
    </div>
  );
}
