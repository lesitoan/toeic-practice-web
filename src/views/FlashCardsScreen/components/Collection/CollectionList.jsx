import { mockCollections } from '../../constants';
import CollectionCard from './CollectionCard';

export default function CollectionList({ onSelect }) {
  return (
    <div className="bg-bgSecondary rounded-lg shadow-lg p-6">
      <h3 className="text-h3 mb-4">Danh sách bộ sưu tập</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockCollections.map((collection) => (
          <CollectionCard
            key={collection.id}
            collection={collection}
            onStudy={() => onSelect(collection.slug, 'collection')}
          />
        ))}
      </div>
    </div>
  );
}
