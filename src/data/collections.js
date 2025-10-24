export const MOCK_COLLECTIONS = [
  {
    id: '1',
    name: 'Bộ từ vựng 1',
    level: 'Cơ bản',
    wordCount: 100,
    description: 'Mô tả bộ từ vựng 1',
    type: 'featured',
    isFavorite: true,
  },
  {
    id: '2',
    name: 'Bộ từ vựng 2',
    level: 'Cơ bản',
    wordCount: 120,
    description: 'Mô tả bộ từ vựng 2',
    type: 'featured',
    isFavorite: false,
  },
  {
    id: '3',
    name: 'Bộ từ vựng 3',
    level: 'Cơ bản',
    wordCount: 80,
    description: 'Mô tả bộ từ vựng 3',
    type: 'featured',
    isFavorite: true,
  },
  {
    id: '4',
    name: 'Bộ từ vựng 4',
    level: 'Cơ bản',
    wordCount: 150,
    description: 'Mô tả bộ từ vựng 4',
    type: 'featured',
    isFavorite: false,
  },
  {
    id: '5',
    name: 'bộ từ vựng của tôi',
    level: 'Cơ bản',
    wordCount: 200,
    description: 'Mô tả bộ từ vựng 5',
    type: 'created',
    isFavorite: true,
  },
];

class FakeCollectionService {
  async getCollections(params) {
    const { type, search } = params || {};
    let data = MOCK_COLLECTIONS;
    if (type) {
      data = data.filter((item) => item.type === type);
    }
    if (search) {
      data = data.filter((item) => item.name.toLowerCase().includes(search.toLowerCase()));
    }
    await new Promise((r) => setTimeout(r, 1500));
    return data;
  }

  async getCollectionById(id) {
    let data = MOCK_COLLECTIONS.find((item) => item.id === id);
    await new Promise((r) => setTimeout(r, 1500));
    return data;
  }

  async createCollection(data) {
    let newCollection = { id: Date.now(), ...data };
    MOCK_COLLECTIONS.push(newCollection);
    await new Promise((r) => setTimeout(r, 1500));
    return newCollection;
  }

  async updateCollection(id, data) {
    let index = MOCK_COLLECTIONS.findIndex((item) => item.id === id);
    if (index !== -1) {
      MOCK_COLLECTIONS[index] = { ...MOCK_COLLECTIONS[index], ...data };
      return MOCK_COLLECTIONS[index];
    }
    await new Promise((r) => setTimeout(r, 1500));
    return null;
  }
  async deleteCollection(id) {
    let index = MOCK_COLLECTIONS.findIndex((item) => item.id === id);
    if (index !== -1) {
      MOCK_COLLECTIONS.splice(index, 1);
      return true;
    }
    await new Promise((r) => setTimeout(r, 1500));
    return false;
  }
}

export const mockCollectionService = new FakeCollectionService();
