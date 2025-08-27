import { Calendar, Clock, TrendingUp } from 'lucide-react';
import { MOCK_POSTS } from '../constants';
import Link from 'next/link';

export default function PostSidebar() {
  const posts = MOCK_POSTS;
  const popularPosts = [...posts].sort((a, b) => b.views - a.views).slice(0, 5);

  const recentPosts = [...posts]
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, 5);

  return (
    <div className="space-y-8">
      {/* Popular Posts */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="flex items-center font-semibold text-gray-900 mb-4">
          <TrendingUp className="w-5 h-5 mr-2 text-blue-600" />
          Popular Posts
        </h3>
        <div className="space-y-4">
          {popularPosts.map((post, index) => (
            <div key={post.id} className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 font-bold text-sm">{index + 1}</span>
              </div>
              <div>
                <Link
                  href={`/blog/${post.id}`}
                  className="font-medium text-gray-900 hover:text-blue-600 text-sm leading-tight block mb-1"
                >
                  {post.title}
                </Link>
                <div className="flex items-center text-xs text-gray-500">
                  <Clock className="w-3 h-3 mr-1" />
                  {post.readTime} min read
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Posts */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="flex items-center font-semibold text-gray-900 mb-4">
          <Calendar className="w-5 h-5 mr-2 text-green-600" />
          Recent Posts
        </h3>
        <div className="space-y-4">
          {recentPosts.map((post) => (
            <div key={post.id}>
              <Link
                href={`/blog/${post.id}`}
                className="font-medium text-gray-900 hover:text-blue-600 text-sm leading-tight block mb-1"
              >
                {post.title}
              </Link>
              <div className="text-xs text-gray-500">
                {new Date(post.publishedAt).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Newsletter */}
      <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6">
        <h3 className="font-semibold text-gray-900 mb-2">Stay Updated</h3>
        <p className="text-gray-600 text-sm mb-4">
          Get the latest TOEIC tips and study guides delivered to your inbox.
        </p>
        <form className="space-y-3">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md text-sm transition-colors"
          >
            Subscribe
          </button>
        </form>
      </div>
    </div>
  );
}
