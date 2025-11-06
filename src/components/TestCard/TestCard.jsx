import React from 'react';
import { Clock, Users, MessageSquare, FileText } from 'lucide-react';
import { Button } from '@nextui-org/react';
import { useRouter } from 'next/navigation';

export default function TestCard({ test }) {
  const router = useRouter();

  const handleStartTest = () => {
    router.push(`/tests/${test?.id}`);
  };

  return (
    <div className="bg-gray-700 rounded-lg p-4 border border-gray-700 hover:border-gray-600 hover:scale-105 transition-all duration-200 cursor-pointer">
      {/* Test Title */}
      <h3 className="text-white font-semibold text-lg mb-3">{test?.name}</h3>

      {/* Stats Row */}
      <div className="flex items-center gap-4 mb-3 text-gray-400 text-sm">
        <div className="flex items-center gap-1">
          <Clock className="w-4 h-4" />
          <span>{test?.duration || 120} phút</span>
        </div>
        <div className="flex items-center gap-1">
          <Users className="w-4 h-4" />
          <span>{test?.participants}</span>
        </div>
        <div className="flex items-center gap-1">
          <MessageSquare className="w-4 h-4" />
          <span>{test?.comments || Math.floor(Math.random() * 100)}</span>
        </div>
      </div>

      {/* Test Info */}
      <p className="text-gray-400 text-sm mb-4">7 phần thi | 200 câu hỏi</p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        <span className="bg-blue-600 text-blue-100 px-2 py-1 rounded text-xs font-medium">
          #{test?.category}
        </span>
        <ul className="flex flex-wrap gap-2">
          {/* {test.skills.length > 0 &&
            test.skills.map((skill, index) => (
              <li
                key={index}
                className="bg-green-600 text-green-100 px-2 py-1 rounded text-xs font-medium"
              >
                #{skill}
              </li>
            ))} */}
          <li className="bg-green-600 text-green-100 px-2 py-1 rounded text-xs font-medium">
            #Nghe
          </li>
          <li className="bg-green-600 text-green-100 px-2 py-1 rounded text-xs font-medium">
            #Đọc
          </li>
        </ul>
      </div>

      {/* Action Button */}
      <Button color="primary" className="w-full !rounded-lg" size="sm" onPress={handleStartTest}>
        Làm đề thi
      </Button>
    </div>
  );
}
