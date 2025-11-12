'use client';
import React, { useEffect, useMemo, useState } from 'react';
import TestOverview from './components/TestOverview';
import TestNavigation from './components/TestNavigation';
import Overview from './components/tabs/Overview';
import PartSelection from './components/tabs/PartSelection';
import Answers from './components/tabs/Answers';
import Comments from './components/tabs/Comments';
import History from './components/tabs/History';
import { useDispatch, useSelector } from 'react-redux';
import { fetchListTest } from '@/stores/testSlice';
import CradleLoader from '@/components/common/Loading/CradleLoader';
import { AlertCircle, ArrowLeft, Home } from 'lucide-react';

const TestDetailScreen = ({ testSlug }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [testResults, setTestResults] = useState([]);
  const dispatch = useDispatch();

  const { listTest, loading } = useSelector((state) => state.test);

  // handle theo id nhưng chưa sửa
  const testId = Number(testSlug);

  useEffect(() => {
    dispatch(fetchListTest({}));
  }, [dispatch]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeTab]);

  // FAKE LƯU KẾT QUẢ THI VÀO LOCALSTORAGE 0 chưa có api get lịch sử thi
  // Load test results from localStorage on mount
  useEffect(() => {
    const storedResults = localStorage.getItem('testResults');
    if (storedResults) {
      try {
        setTestResults(JSON.parse(storedResults));
      } catch (error) {
        console.error('Error loading test results from localStorage:', error);
      }
    }
  }, []);

  // Save test results to localStorage whenever it changes
  useEffect(() => {
    if (testResults.length > 0) {
      localStorage.setItem('testResults', JSON.stringify(testResults));
    }
  }, [testResults]);

  // Handle test result from PartSelection
  const handleTestResult = (result) => {
    const newResult = {
      ...result,
      test_id: testId,
      id: Date.now(), // Unique ID for the result
    };
    setTestResults((prev) => [newResult, ...prev]);
    // Switch to history tab to show the result
    setActiveTab('history');
  };
  //END FAKE LƯU KẾT QUẢ THI VÀO LOCALSTORAGE 0 chưa có api get lịch sử thi

  const selectTest = useMemo(() => {
    return listTest.find((test) => test.id === testId);
  }, [listTest, testId]);

  const RenderActiveTab = (activeTab) => {
    switch (activeTab) {
      case 'overview':
        return <Overview testData={listTest} />;
      case 'parts':
        return <PartSelection onTestResult={handleTestResult} />;
      case 'answers':
        return <Answers />;
      case 'history':
        return <History testResults={testResults} testId={testId} />;
      case 'comments':
        return <Comments testData={listTest} />;
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="min-h-[80vh] bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <CradleLoader size="xl" color="#4F46E5" />
      </div>
    );
  } else if (!selectTest) {
    return (
      <div className="min-h-[80vh] bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-red-100 rounded-full mb-6">
            <AlertCircle className="w-10 h-10 text-red-600" />
          </div>

          <h2 className="text-2xl font-bold text-gray-800 mb-3">Không tìm thấy bài test</h2>
          <p className="text-gray-600 mb-8 leading-relaxed">
            Bài test bạn đang tìm kiếm không tồn tại hoặc đã bị xóa. Vui lòng kiểm tra lại đường dẫn
            hoặc quay về trang chủ.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white border-2 border-indigo-600 text-indigo-600 font-semibold rounded-lg hover:bg-indigo-50 transition-all duration-200 shadow-sm hover:shadow-md"
            >
              <ArrowLeft className="w-4 h-4" />
              Quay lại
            </button>

            <button
              onClick={() => (window.location.href = '/')}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-all duration-200 shadow-md hover:shadow-lg"
            >
              <Home className="w-4 h-4" />
              Về trang chủ
            </button>
          </div>
          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              Cần hỗ trợ?{' '}
              <a href="/contact" className="text-indigo-600 hover:text-indigo-700 font-medium">
                Liên hệ với chúng tôi
              </a>
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen space-y-10 my-10">
      <TestOverview testData={selectTest} />

      <div className="bg-bgSecondary rounded-lg shadow-lg">
        <TestNavigation activeTab={activeTab} setActiveTab={setActiveTab} />

        <div className="max-w-7xl mx-auto px-4 py-8">{RenderActiveTab(activeTab)}</div>
      </div>
    </div>
  );
};

export default TestDetailScreen;
