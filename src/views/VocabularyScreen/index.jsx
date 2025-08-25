'use client';
import StatsSection from './components/StatList';
import { studyMethods } from './constants';
import VocabularyCoursesSection from './components/VocabularyCoursesSection/VocabularyCoursesSection';
import MethodCard from './components/MethodCard';
import SideBarRight from './components/SidebarRight/SidebarRight';

export default function VocabularyLearningPage() {
  return (
    <div className="min-h-screen my-10">
      <div className="mx-auto space-y-6">
        <StatsSection />

        <div className="grid lg:grid-cols-3 space-x-6">
          <div className="lg:col-span-2 bg-bgPrimary shadow-lg p-6 rounded-lg">
            <VocabularyCoursesSection />

            <div className="mt-12">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Phương pháp học</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {studyMethods.map((method, index) => (
                  <MethodCard
                    key={index}
                    icon={method.icon}
                    title={method.title}
                    description={method.description}
                  />
                ))}
              </div>
            </div>
          </div>

          <SideBarRight />
        </div>
      </div>
    </div>
  );
}
