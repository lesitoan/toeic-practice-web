import { Button } from '@nextui-org/react';

export default function MethodCard({ icon: Icon, title, description, action = 'Bắt đầu học' }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-lg transition-all transform hover:scale-105 text-center">
      <div className="text-4xl mb-4">{Icon}</div>
      <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600 text-sm mb-4">{description}</p>
      <Button className="w-full bg-primary-gradient text-white py-2 rounded-lg font-medium hover:shadow-lg transition-all">
        {action}
      </Button>
    </div>
  );
}
