'use client';
import PostHeader from './components/PostHeader';
import { FeaturedPost } from './components/FeaturedPost';
import { MOCK_POSTS } from './constants';
import MainSection from './components/MainSection/MainSection';
import PostSidebar from './components/PostSidebar';

export default function PostsScreen() {
  const featuredPost = MOCK_POSTS.find((post) => post.featured);

  return (
    <div className="min-h-screen space-y-10 mb-10">
      <PostHeader />

      <div className="mx-auto space-y-10">
        {featuredPost && <FeaturedPost post={featuredPost} />}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 rounded-lg shadow-lg bg-bgSecondary p-6">
          <div className="lg:col-span-3">
            <MainSection />
          </div>

          <div className="lg:col-span-1">
            <PostSidebar />
          </div>
        </div>
      </div>
    </div>
  );
}
