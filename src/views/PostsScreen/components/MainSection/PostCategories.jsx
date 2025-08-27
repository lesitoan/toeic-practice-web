import { CATEGORIES } from '../../constants';

export default function PostCategories({ filter, setFilter }) {
  const onCategoryChange = (category) => {
    setFilter({ ...filter, category });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <h3 className="font-semibold text-gray-900 mb-3">Categories</h3>
      <div className="flex flex-wrap gap-2">
        {CATEGORIES.map((category) => (
          <button
            key={category.name}
            onClick={() => onCategoryChange(category.name)}
            className={`px-3 py-2 rounded-full text-sm font-medium transition-colors ${
              filter.category === category.name
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {category.name} {category.count && `(${category.count})`}
          </button>
        ))}
      </div>
    </div>
  );
}
