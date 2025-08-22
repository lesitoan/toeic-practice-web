import TestCard from '@/components/TestCard/TestCard';
import { Button } from '@nextui-org/react';

export default function TestList() {
  const testsData = [
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
  ];

  return (
    <div className="p-6 bg-bgSecondary shadow-lg rounded-lg">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-h1">Đề thi mới nhất</h1>
        <div className="flex justify-center">
          <div className="bg-blue-500 w-40 h-1 rounded-full"></div>
        </div>
      </div>

      {/* Tests Grid */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testsData.map((test) => (
            <TestCard key={test.id} test={test} />
          ))}
        </div>
      </div>

      {/* Load More Button */}
      <div className="text-center mt-8">
        <Button color="primary" className="w-[400px]">
          Xem thêm đề thi
        </Button>
      </div>
    </div>
  );
}
