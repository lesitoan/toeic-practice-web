import { Pagination } from '@nextui-org/react';
import { useCallback, useEffect } from 'react';
import { MOCK_POSTS, POSTS_PER_PAGE } from '../../constants';
import PostCard from './PostCard';

export default function PostList({ filter, setFilter }) {
  const { category: selectedCategory, q: searchQuery, page: currentPage } = filter;

  const regularPosts = MOCK_POSTS.filter((post) => !post.featured);
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const displayedPosts = MOCK_POSTS.slice(startIndex, startIndex + POSTS_PER_PAGE);
  const totalPages = Math.ceil(MOCK_POSTS.length / POSTS_PER_PAGE);

  useEffect(() => {
    let filtered =
      selectedCategory === 'All'
        ? regularPosts
        : regularPosts.filter((post) => post.category === selectedCategory);

    if (searchQuery) {
      filtered = filtered.filter(
        (post) =>
          post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
          post.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }
  }, [selectedCategory, searchQuery, currentPage]);

  const renderPagination = useCallback(() => {
    if (totalPages) {
      return (
        <div className="flex w-full justify-center">
          <Pagination
            color="primary"
            size="md"
            showControls
            total={totalPages}
            page={currentPage}
            onChange={(newPage) => setFilter({ ...filter, page: newPage })}
            dotsJump={totalPages - 1}
          />
        </div>
      );
    }
  }, [totalPages, currentPage]);

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {displayedPosts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
      {renderPagination()}
    </div>
  );
}
