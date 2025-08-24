'use client';
import React, { useState } from 'react';
import Overview from './components/Overview';
import Progress from './components/Progress';
import Achievements from './components/Achievements';
import Activity from './components/Activity';
import SettingComponent from './components/SettingComponent';
import UserInfo from './components/UserInfo';
import BannerPro from './components/BannerPro';
import { PERSONAL_INFO, TABS } from './constants';
import { Button } from '@nextui-org/react';

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState(TABS[0].id);
  const [personalInfo, setPersonalInfo] = useState(PERSONAL_INFO);
  const [saveStatus, setSaveStatus] = useState({ type: '', message: '' });

  const renderTab = () => {
    switch (activeTab) {
      case 'overview':
        return <Overview />;
      case 'progress':
        return <Progress />;
      case 'achievements':
        return <Achievements />;
      case 'activity':
        return <Activity />;
      case 'settings':
        return (
          <SettingComponent
            personalInfo={personalInfo}
            setPersonalInfo={setPersonalInfo}
            saveStatus={saveStatus}
            setSaveStatus={setSaveStatus}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen space-y-6 my-6">
      <UserInfo />

      <div className="bg-bgSecondary shadow-lg rounded-lg mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <BannerPro />

        <div className="flex space-x-2 mb-8 bg-gray-100 p-1 rounded-lg w-fit">
          {TABS.map((tab) => (
            <Button
              key={tab.id}
              onPress={() => setActiveTab(tab.id)}
              className={`min-w-[150px] font-medium rounded-lg transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-200'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-blue-600'
              }`}
            >
              {tab.label}
            </Button>
          ))}
        </div>

        {renderTab()}
      </div>
    </div>
  );
};

export default ProfilePage;
