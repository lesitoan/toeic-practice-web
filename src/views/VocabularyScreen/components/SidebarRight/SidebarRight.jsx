import { Award } from 'lucide-react';
import RecentWords from './RecentWords';
import Achievements from './Achievements';
import DailyGoal from './DailyGoal';

export default function SideBarRight() {
  return (
    <div className="space-y-6 bg-bgPrimary shadow-lg p-6 rounded-lg">
      <RecentWords />
      <Achievements />
      <DailyGoal />
    </div>
  );
}
