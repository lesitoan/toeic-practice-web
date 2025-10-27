import { Button } from '@nextui-org/react';
import { ChevronRight, Trash } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import collectionServices from '@/services/collection.service';
import { fetchCollections } from '@/stores/collectionSlice';

export default function CourseCard({ collection, viewMode }) {
  const dispatch = useDispatch();

  const handleDelete = async () => {
    try {
      await collectionServices.deleteCollection(collection.id);
      toast.success('Xoá bộ từ vựng thành công.');
      // dispatch(fetchCollections({ type: 'created' }));
      dispatch(fetchCollections({}));
    } catch (error) {
      toast.error('Xoá bộ từ vựng thất bại. Vui lòng thử lại sau.');
    }
  };

  return (
    <div
      key={collection.id}
      className={`bg-blue-100 rounded-2xl shadow-sm hover:shadow-lg transition-all transform hover:scale-105 overflow-hidden ${
        viewMode === 'list' ? 'flex items-center' : ''
      }`}
    >
      <div className={`p-6 ${viewMode === 'list' ? 'flex-1' : ''}`}>
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="text-3xl">📚</div>
            <div>
              <h3 className="text-xl font-bold text-gray-800">
                {collection.name || collection.title}
              </h3>
              <p className="text-sm text-gray-600">{collection.description}</p>
            </div>
          </div>
          <span
            className={`px-3 py-1 bg-gradient-to-r bg-blue-600 text-white text-xs font-semibold rounded-full`}
          >
            {collection.level}
          </span>
        </div>

        <div className="mb-6 space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">{collection.wordCount} từ vựng</span>
            {/* <span className="text-gray-600">{collection.estimatedTime}</span> */}
          </div>

          <div className="w-full h-2 bg-white bg-opacity-50 rounded-full">
            {/* <div
              className={`bg-gradient-to-r bg-green-500 h-2 rounded-full transition-all`}
              style={{ width: `${collection.progress}%` }}
            ></div> */}
          </div>
          {/* <div className="flex justify-between text-xs text-gray-600">
            <span>{collection.progress}% hoàn thành</span>
            <span>
              {Math.round((collection.wordCount * collection.progress) / 100)} /{' '}
              {collection.wordCount}
            </span>
          </div> */}
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {/* {collection.topics.map((topic, index) => (
            <span
              key={index}
              className="px-3 py-1 text-xs font-medium text-gray-700 bg-white rounded-full bg-opacity-70"
            >
              {topic}
            </span>
          ))} */}
        </div>

        <div className="flex gap-3">
          <Button
            color="primary"
            className="w-full h-12 rounded-lg shadow-md cursor-pointer"
            as={Link}
            href={`/collections/${collection.id}`}
          >
            Học ngay
          </Button>
          <Button
            color="default"
            className={`h-12 rounded-lg shadow-md cursor-pointer ${true ? 'bg-red-400' : ''}`}
            onPress={() => handleDelete()}
            // disabled={collection?.type !== 'created'}
          >
            {/* {collection?.type !== 'created' ? (
              <ChevronRight className="w-5 h-5 text-gray-600" />
            ) : (
              <Trash className="w-5 h-5 text-white" />
            )} */}
            <Trash className="w-5 h-5 text-white" />
          </Button>
        </div>
      </div>
    </div>
  );
}
