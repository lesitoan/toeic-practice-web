import { useEffect, useState } from 'react';
import { Search } from 'lucide-react';
import { useForm, Controller } from 'react-hook-form';
import CustomDropdown from '@/components/common/CustomDropdow';
import { Button, Input } from '@nextui-org/react';

export default function FilterComponent({ filter, setFilter }) {
  const [searchTerm, setSearchTerm] = useState('');

  const { control, handleSubmit, watch } = useForm({
    defaultValues: {
      category: '',
    },
  });

  const category = watch('category');
  const skill = watch('skill');
  const sortBy = watch('sortBy');

  useEffect(() => {
    if (searchTerm || category || sortBy || skill) {
      setFilter((prev) => ({
        searchTerm: searchTerm || prev.searchTerm,
        selectedCategory: category || prev.selectedCategory,
        selectedSkill: skill || prev.selectedSkill,
        sortBy: sortBy || prev.sortBy,
      }));
    }
  }, [searchTerm, category, sortBy, skill]);

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
              onChange={(e) => setSearchTerm(e.target.value)}
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
