import { useEffect, useState } from 'react';
import { Play } from 'lucide-react';
import { Button } from '@nextui-org/react';
import { useRouter, useParams } from 'next/navigation';
import { PARTS } from '../../constants';

export default function PartSelection() {
  const router = useRouter();
  const params = useParams();
  const [selectedParts, setSelectedParts] = useState([]);
  const [testResult, setTestResult] = useState(null);

  const handlePartSelect = (partId) => {
    setSelectedParts((prev) =>
      prev.includes(partId) ? prev.filter((id) => id !== partId) : [...prev, partId]
    );
  };

  const handleStartTest = () => {
    if (selectedParts.length === 0) return;

    // Mở tab mới với route thi
    window.open(
      `/tests/${params.testSlug}/start?parts=${selectedParts.join(',')}`,
      '_blank',
      'width=1920,height=1080'
    );
  };

  // Nếu có kết quả, hiển thị kết quả
  if (testResult) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-8">
        {/* Component hiển thị kết quả (copy từ artifact) */}
      </div>
    );
  }

  useEffect(() => {
    const handleMessage = (event) => {
      if (event.data.type === 'TEST_SUBMIT') {
        setTestResult(event.data.result);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Chọn phần thi muốn luyện tập</h2>
          <div className="flex gap-2">
            <button
              onClick={() => setSelectedParts(PARTS.map((p) => p.id))}
              className="px-4 py-2 text-sm bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
            >
              Chọn tất cả
            </button>
            <button
              onClick={() => setSelectedParts([])}
              className="px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Bỏ chọn tất cả
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {PARTS.map((part) => (
            <div
              key={part.id}
              onClick={() => handlePartSelect(part.id)}
              className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                selectedParts.includes(part.id)
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center gap-4">
                <div
                  className={`w-6 h-6 rounded border-2 flex items-center justify-center ${
                    selectedParts.includes(part.id)
                      ? 'border-blue-500 bg-blue-500'
                      : 'border-gray-300'
                  }`}
                >
                  {selectedParts.includes(part.id) && (
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className={`px-2 py-1 text-xs rounded-full font-medium ${
                        part.type === 'Listening'
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-green-100 text-green-700'
                      }`}
                    >
                      {part.type}
                    </span>
                  </div>
                  <h3 className="font-semibold">{part.name}</h3>
                  <p className="text-sm text-gray-600">
                    {part.questions} câu • {part.duration} phút
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-gray-50 rounded-lg flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600 mb-2">
              <span className="font-semibold">Đã chọn:</span> {selectedParts.length}/{PARTS.length}{' '}
              phần
            </p>
            {selectedParts.length > 0 && (
              <p className="text-sm text-gray-600">
                <span className="font-semibold">Tổng thời gian:</span>{' '}
                {PARTS.filter((p) => selectedParts.includes(p.id)).reduce(
                  (total, p) => total + p.duration,
                  0
                )}{' '}
                phút
              </p>
            )}
          </div>
          <Button
            onPress={handleStartTest}
            className={`${selectedParts.length > 0 ? 'hover:bg-blue-700 cursor-pointer' : 'opacity-80 cursor-not-allowed'} bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors flex items-center gap-2`}
            disabled={selectedParts.length === 0}
          >
            <Play className="w-5 h-5" />
            Bắt đầu thi
          </Button>
        </div>
      </div>
    </div>
  );
}
