import { use, useCallback, useEffect, useState } from 'react';
import { Edit2, X, Save } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'next/navigation';
import { fetchCollectionById, setSelectedCollection } from '@/stores/collectionSlice';
import collectionServices from '@/services/collection.service';
import { toast } from 'react-toastify';

export function CollectionHeader() {
  const dispatch = useDispatch();
  const [isEditingName, setIsEditingName] = useState(false);
  const [editedName, setEditedName] = useState('');
  const { selectedCollection } = useSelector((state) => state.collection);
  const { collectionId } = useParams();

  console.log('Selected Collection in Header:', selectedCollection);

  useEffect(() => {
    dispatch(fetchCollectionById(collectionId));

    return () => {
      dispatch(setSelectedCollection(null));
    };
  }, [collectionId]);

  useEffect(() => {
    setEditedName(selectedCollection?.title || '');
  }, [selectedCollection]);

  const handleSaveName = useCallback(async () => {
    try {
      await collectionServices.updateCollectionName(collectionId, { name: editedName });
      setIsEditingName(false);
      dispatch(fetchCollectionById(collectionId));
    } catch (error) {
      toast.error('Cập nhật tên bộ sưu tập thất bại. Vui lòng thử lại sau.');
    }
  }, [editedName]);

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <div className="flex-1">
          {isEditingName ? (
            <div className="flex items-center gap-2 mb-2">
              <input
                type="text"
                value={editedName}
                onChange={(e) => setEditedName(e.target.value)}
                className="text-3xl font-bold text-gray-800 border-2 border-indigo-600 rounded-lg px-3 py-1 focus:outline-none"
              />
            </div>
          ) : (
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              {selectedCollection?.title || 'Đang tải...'}
            </h1>
          )}
          <p className="text-gray-600">{selectedCollection?.description || ''}</p>
        </div>
        <button
          onClick={() => {
            if (isEditingName) {
              setIsEditingName(false);
            } else {
              setIsEditingName(true);
            }
          }}
          className="ml-4 p-2 hover:bg-gray-200 rounded-lg transition-colors"
          title={isEditingName ? 'Hủy' : 'Đổi tên bộ sưu tập'}
        >
          {isEditingName ? (
            <X size={24} className="text-gray-600" />
          ) : (
            <Edit2 size={24} className="text-gray-600" />
          )}
        </button>
      </div>

      {isEditingName && (
        <div className="flex gap-2">
          <button
            onClick={handleSaveName}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <Save size={18} />
            Lưu
          </button>
          <button
            onClick={() => setIsEditingName(false)}
            className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition-colors"
          >
            Hủy
          </button>
        </div>
      )}
    </div>
  );
}
