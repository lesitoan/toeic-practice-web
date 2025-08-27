'use client';
import React, { useState } from 'react';
import { MOCK_TESTS } from './constants';
import TestOverview from './components/TestOverview';
import TestNavigation from './components/TestNavigation';
import Overview from './components/tabs/Overview';
import PartSelection from './components/tabs/PartSelection';
import Answers from './components/tabs/Answers';
import Comments from './components/tabs/Comments';

const TestDetailScreen = ({ testSlug }) => {
  const [activeTab, setActiveTab] = useState('overview');

  const testData = MOCK_TESTS.find((test) => test.slug === testSlug);

  const RenderActiveTab = (activeTab) => {
    switch (activeTab) {
      case 'overview':
        return <Overview testData={testData} />;
      case 'parts':
        return <PartSelection />;
      case 'answers':
        return <Answers />;
      case 'comments':
        return <Comments testData={testData} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen space-y-10 my-10">
      <TestOverview testData={testData} />

      <div className="bg-bgSecondary rounded-lg shadow-lg">
        <TestNavigation activeTab={activeTab} setActiveTab={setActiveTab} />

        <div className="max-w-7xl mx-auto px-4 py-8">{RenderActiveTab(activeTab)}</div>
      </div>
    </div>
  );
};

export default TestDetailScreen;
