'use client';
import React, { useEffect, useMemo, useState } from 'react';
import TestOverview from './components/TestOverview';
import TestNavigation from './components/TestNavigation';
import Overview from './components/tabs/Overview';
import PartSelection from './components/tabs/PartSelection';
import Answers from './components/tabs/Answers';
import Comments from './components/tabs/Comments';
import { useDispatch, useSelector } from 'react-redux';
import { fetchListTest } from '@/stores/testSlice';

const TestDetailScreen = ({ testSlug }) => {
  const [activeTab, setActiveTab] = useState('overview');
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

  const selectTest = useMemo(() => {
    return listTest.find((test) => test.id === testId);
  }, [listTest, testId]);

  const RenderActiveTab = (activeTab) => {
    switch (activeTab) {
      case 'overview':
        return <Overview testData={listTest} />;
      case 'parts':
        return <PartSelection />;
      case 'answers':
        return <Answers />;
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
