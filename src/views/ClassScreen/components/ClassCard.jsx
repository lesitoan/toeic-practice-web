import { Users, Calendar, GraduationCap, ArrowRight } from 'lucide-react';
import { Button } from '@nextui-org/react';

export default function ClassCard({ classData, onViewTests }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:scale-105 transition-all duration-300">
      {/* Header with gradient */}
      <div className={`bg-gradient-to-r ${classData.color} p-6 text-white`}>
        <div className="flex items-center justify-between mb-4">
          <span className="text-5xl">{classData.icon}</span>
          <span className="bg-white bg-opacity-20 px-3 py-1 rounded-full text-sm font-medium">
            {classData.level}
          </span>
        </div>
        <h3 className="text-2xl font-bold mb-2">{classData.name}</h3>
        <p className="text-white text-opacity-90 text-sm">{classData.description}</p>
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        {/* Teacher */}
        <div className="flex items-center space-x-3 text-gray-700">
          <GraduationCap className="w-5 h-5 text-blue-600" />
          <span className="font-medium">{classData.teacher}</span>
        </div>

        {/* Students */}
        <div className="flex items-center space-x-3 text-gray-700">
          <Users className="w-5 h-5 text-blue-600" />
          <span>{classData.students} học viên</span>
        </div>

        {/* Schedule */}
        <div className="flex items-center space-x-3 text-gray-700">
          <Calendar className="w-5 h-5 text-blue-600" />
          <span className="text-sm">{classData.schedule}</span>
        </div>

        {/* Action Button */}
        <Button
          color="primary"
          className="w-full mt-4"
          endContent={<ArrowRight className="w-4 h-4" />}
          onPress={() => onViewTests(classData)}
        >
          Xem đề thi
        </Button>
      </div>
    </div>
  );
}
