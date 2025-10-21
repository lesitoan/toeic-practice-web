import { useRouter } from 'next/navigation';

export function LearningModes({ modes, collectionId }) {
  const router = useRouter();

  return (
    <div className="mb-8 bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-bold text-gray-800 mb-4">Chọn phương pháp học</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {modes.map((mode) => (
          <div
            key={mode.name}
            className={`flex flex-col items-center justify-center p-6 ${mode.customClassName} text-white rounded-lg hover:shadow-lg transition-all hover:scale-105 ${!mode.isActive ? 'opacity-80 cursor-not-allowed' : 'cursor-pointer'}`}
          >
            <button
              className={`flex flex-col items-center justify-center ${!mode.isActive ? 'cursor-not-allowed' : ''}`}
              onClick={() => router.push(`${mode.url}/${collectionId}`)}
              disabled={!mode.isActive}
            >
              <mode.icon size={32} className="mb-2" />
              <span className="font-semibold text-center">{mode.name}</span>
              <span className="text-xs mt-1 opacity-90">{mode.description}</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
