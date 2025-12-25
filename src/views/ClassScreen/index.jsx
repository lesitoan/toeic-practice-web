'use client';
import { useState, useMemo, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@nextui-org/react';
import ClassCard from './components/ClassCard';
import ClassTestView from './components/ClassTestView';
import { MOCK_CLASSES } from './constants';

const CLASS_RESULTS_KEY = 'class_test_results';

export default function ClassScreen() {
  const [selectedClass, setSelectedClass] = useState(null);
  const [assignedTest, setAssignedTest] = useState(null);
  const [testResults, setTestResults] = useState({});

  // Get test list from Redux store
  const { listTest } = useSelector((state) => state.test);

  // Load test results from localStorage on mount
  useEffect(() => {
    const savedResults = localStorage.getItem(CLASS_RESULTS_KEY);
    if (savedResults) {
      try {
        setTestResults(JSON.parse(savedResults));
      } catch (error) {
        console.error('Failed to parse test results:', error);
      }
    }
  }, []);

  // Listen for test submission results
  useEffect(() => {
    const handleMessage = (event) => {
      if (event.data?.type === 'TEST_SUBMIT' && selectedClass && assignedTest) {
        const result = event.data.result;
        
        // Save result to state and localStorage
        const resultKey = `${selectedClass.id}_${assignedTest.id}`;
        const newResults = {
          ...testResults,
          [resultKey]: {
            ...result,
            classId: selectedClass.id,
            className: selectedClass.name,
            testId: assignedTest.id,
            testName: assignedTest.name || assignedTest.title,
            timestamp: new Date().toISOString(),
          },
        };
        
        setTestResults(newResults);
        localStorage.setItem(CLASS_RESULTS_KEY, JSON.stringify(newResults));
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [selectedClass, assignedTest, testResults]);

  // Get random test from list
  const getRandomTest = () => {
    if (listTest && listTest.length > 0) {
      const randomIndex = listTest.length - 1;
      return listTest[randomIndex];
    }
    return null;
  };

  const handleViewTests = (classData) => {
    setSelectedClass(classData);
    const randomTest = getRandomTest();
    setAssignedTest(randomTest);
  };

  const handleBack = () => {
    setSelectedClass(null);
    setAssignedTest(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          {selectedClass && (
            <Button
              variant="light"
              startContent={<ArrowLeft className="w-4 h-4" />}
              onPress={handleBack}
              className="mb-4"
            >
              Quay lại danh sách lớp
            </Button>
          )}
          
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {selectedClass ? selectedClass.name : 'Lớp học của tôi'}
            </h1>
            <p className="text-gray-600 text-lg">
              {selectedClass
                ? 'Đề thi được gán cho lớp học'
                : 'Chọn lớp học để xem đề thi được gán'}
            </p>
          </div>
        </div>

        {/* Content */}
        {selectedClass ? (
          <ClassTestView 
            classData={selectedClass} 
            test={assignedTest}
            testResult={testResults[`${selectedClass.id}_${assignedTest?.id}`]}
          />
        ) : (
          <div className="grid md:grid-cols-2 gap-8">
            {MOCK_CLASSES.map((classData) => (
              <ClassCard
                key={classData.id}
                classData={classData}
                onViewTests={handleViewTests}
              />
            ))}
          </div>
        )}

        {/* Empty State */}
        {!selectedClass && MOCK_CLASSES.length === 0 && (
          <div className="text-center py-12 bg-white rounded-2xl shadow-lg">
            <p className="text-gray-600 text-lg mb-4">Bạn chưa tham gia lớp học nào</p>
            <Button color="primary">Tìm lớp học</Button>
          </div>
        )}
      </div>
    </div>
  );
}
