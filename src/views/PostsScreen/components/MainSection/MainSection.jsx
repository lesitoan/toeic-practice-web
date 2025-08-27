import { useEffect, useState } from 'react';
import PostCard from './PostCard';
import PostCategories from './PostCategories';
import SearchPost from './SearchPost';
import PostList from './PostList';

export default function MainSection() {
  const [filter, setFilter] = useState({
    category: 'All',
    q: '',
    page: 1,
  });

  useEffect(() => {
    const query = new URLSearchParams();

    if (filter.q) query.set('q', filter.q);
    if (filter.category && filter.category !== 'All') query.set('category', filter.category);
    if (filter.page && filter.page !== 1) query.set('page', filter.page);

    const queryString = query.toString();
    const newUrl = queryString ? `?${queryString}` : window.location.pathname;
    window.history.replaceState(null, '', newUrl);
  }, [filter]);

  return (
    <div className="lg:col-span-3">
      <div className="mb-8 space-y-6">
        <SearchPost filter={filter} setFilter={setFilter} />

        <PostCategories filter={filter} setFilter={setFilter} />
      </div>

      <PostList filter={filter} setFilter={setFilter} />
    </div>
  );
}
