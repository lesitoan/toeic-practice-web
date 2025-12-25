import { Award } from 'lucide-react';
import RecentWords from './RecentWords';
import Achievements from './Achievements';
import DailyGoal from './DailyGoal';
import VocabularyTranslatorSidebar from './VocabularyTranslatorSidebar';

export default function SideBarRight() {
  return (
    <div className="space-y-6 bg-bgPrimary shadow-lg p-6 rounded-lg">
      <VocabularyTranslatorSidebar />
      <div className="border-t pt-6">
        <Achievements />
      </div>
      <DailyGoal />
    </div>
  );
}
