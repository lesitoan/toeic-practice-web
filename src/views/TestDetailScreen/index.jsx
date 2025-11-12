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
    return <div>Loading...</div>;
  } else if (!selectTest) {
    return <div>Test not found</div>;
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
