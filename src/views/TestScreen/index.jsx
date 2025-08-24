'use client';
import React, { useState, useMemo, useEffect, useCallback } from 'react';
import TestCard from '@/components/TestCard/TestCard';
import FilterComponent from './components/FilterComponent';
import { Pagination } from '@nextui-org/react';

const allTests = [
  {
    id: 1,
    title: 'TOEIC Practice 1',
    duration: 40,
    participants: 213045,
    comments: 463,
    parts: 4,
    questions: 40,
    category: 'Toeic',
    skills: ['Listening', 'Reading'],
  },
  {
    id: 2,
    title: 'TOEIC Practice 2',
    duration: 40,
    participants: 110904,
    comments: 205,
    parts: 4,
    questions: 40,
    category: 'Toeic',
    skills: ['Listening', 'Reading'],
  },
  {
    id: 3,
    title: 'TOEIC Practice 3',
    duration: 40,
    participants: 77370,
    comments: 220,
    parts: 4,
    questions: 40,
    category: 'Toeic',
    skills: ['Listening', 'Reading'],
  },
  {
    id: 4,
    title: 'TOEIC Practice 4',
    duration: 40,
    participants: 63300,
    comments: 101,
    parts: 4,
    questions: 40,
    category: 'Toeic',
    skills: ['Listening', 'Reading'],
  },
  {
    id: 5,
    title: 'TOEIC Practice 5',
    duration: 40,
    participants: 57564,
    comments: 147,
    parts: 4,
    questions: 40,
    category: 'Toeic',
    skills: ['Listening', 'Reading'],
  },
  {
    id: 6,
    title: 'TOEIC Practice 6',
    duration: 40,
    participants: 53013,
    comments: 114,
    parts: 4,
    questions: 40,
    category: 'Toeic',
    skills: ['Listening', 'Reading'],
  },
  {
    id: 7,
    title: 'TOEIC Practice 7',
    duration: 40,
    participants: 48714,
    comments: 99,
    parts: 4,
    questions: 40,
    category: 'Toeic',
    skills: ['Listening', 'Reading'],
  },
  {
    id: 8,
    title: 'TOEIC Practice 8',
    duration: 40,
    participants: 47019,
    comments: 79,
    parts: 4,
    questions: 40,
    category: 'Toeic',
    skills: ['Listening', 'Reading'],
  },
  {
    id: 9,
    title: 'IELTS Writing Task 1',
    duration: 60,
    participants: 35420,
    comments: 156,
    parts: 2,
    questions: 25,
    category: 'IELTS',
    skills: ['Writing'],
  },
  {
    id: 10,
    title: 'IELTS Speaking Practice',
    duration: 30,
    participants: 28900,
    comments: 89,
    parts: 3,
    questions: 15,
    category: 'IELTS',
    skills: ['Speaking'],
  },
  {
    id: 11,
    title: 'Grammar Foundation',
    duration: 45,
    participants: 45600,
    comments: 234,
    parts: 5,
    questions: 50,
    category: 'Grammar',
    skills: ['Grammar'],
  },
  {
    id: 12,
    title: 'Vocabulary Builder',
    duration: 25,
    participants: 67800,
    comments: 178,
    parts: 3,
    questions: 30,
    category: 'Vocabulary',
    skills: ['Vocabulary'],
  },
];

export default function TestsScreen() {
  const [filter, setFilter] = useState({
    searchTerm: '',
    selectedCategory: 'all',
    selectedSkill: 'all',
    sortBy: 'participants',
  });
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 8;

  // Filter and sort tests
  const filteredTests = useMemo(() => {
    let filtered = allTests.filter((test) => {
      const matchesSearch =
        filter.searchTerm === '' ||
        test.title.toLowerCase().includes(filter.searchTerm.toLowerCase());
      const matchesCategory =
        filter.selectedCategory === 'all' || test.category === filter.selectedCategory;
      const matchesSkill =
        filter.selectedSkill === 'all' || test.skills.includes(filter.selectedSkill);

      return matchesSearch && matchesCategory && matchesSkill;
    });

    // Sort tests
    filtered.sort((a, b) => {
      switch (filter.sortBy) {
        case 'participants':
          return b.participants - a.participants;
        case 'comments':
          return b.comments - a.comments;
        case 'duration':
          return b.duration - a.duration;
        case 'title':
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });

    return filtered;
  }, [filter]);

  // Pagination
  const totalPages = Math.ceil(filteredTests.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentTests = filteredTests.slice(startIndex, endIndex);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [filter]);

  const renderPagination = useCallback(() => {
    if (totalPages) {
      return (
        <div className="flex w-full justify-center">
          <Pagination
            color="primary"
            size="md"
            showControls
            total={totalPages}
            page={currentPage}
            onChange={setCurrentPage}
            dotsJump={totalPages - 1}
          />
        </div>
      );
    }
  }, [totalPages, currentPage]);

  return (
    <div className="p-4 md:p-6">
      <div className="mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-h1">Đề thi thử TOEIC</h1>
          <div className="w-24 h-1 bg-blue-500 mx-auto"></div>
        </div>
        {/* Search and Filters */}
        <FilterComponent filter={filter} setFilter={setFilter} />

        {/* Test Cards Grid */}
        {currentTests.length > 0 && (
          <div className="bg-bgSecondary shadow-lg pb-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 mb-8  p-4 md:p-6">
              {currentTests.map((test) => (
                <TestCard key={test.id} test={test} />
              ))}
            </div>
            {renderPagination()}
          </div>
        )}

        {/* No Results */}
        {currentTests.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-lg mb-4">Không tìm thấy kết quả phù hợp</div>
            <p className="text-gray-500">Thử thay đổi từ khóa tìm kiếm hoặc bộ lọc</p>
          </div>
        )}
      </div>
    </div>
  );
}
