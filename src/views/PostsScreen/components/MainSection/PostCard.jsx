import { Calendar, Clock, Eye, Heart, User } from 'lucide-react';
import Link from 'next/link';

export default function PostCard({ post }) {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <article className="bg-white rounded-lg shadow-md hover:shadow-lg overflow-hidden hover:scale-105 transition-all duration-200 cursor-pointer">
      {/* Image */}
      <div className="relative h-48 bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
        <div className="text-white text-center">
          <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center mb-2 mx-auto">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
          </div>
          <p className="text-xs opacity-75">Blog Post</p>
        </div>
      </div>

      <div className="p-6">
        {/* Category */}
        <div className="mb-3">
          <span className="inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">
            {post.category}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-lg font-semibold text-gray-900 mb-3 leading-tight">
          <Link href={`/blog/${post.id}`} className="hover:text-blue-600 transition-colors">
            {post.title}
          </Link>
        </h3>

        {/* Excerpt */}
        <p className="text-gray-600 text-sm mb-4 leading-relaxed">{post.excerpt}</p>

        {/* Meta */}
        <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
          <div className="flex items-center space-x-3">
            <div className="flex items-center">
              <User className="w-3 h-3 mr-1" />
              {post.author.name}
            </div>
            <div className="flex items-center">
              <Calendar className="w-3 h-3 mr-1" />
              {formatDate(post.publishedAt)}
            </div>
          </div>
          <div className="flex items-center">
            <Clock className="w-3 h-3 mr-1" />
            {post.readTime} min
          </div>
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <div className="flex items-center space-x-4 text-xs text-gray-500">
            <div className="flex items-center">
              <Eye className="w-3 h-3 mr-1" />
              {post.views}
            </div>
            <div className="flex items-center">
              <Heart className="w-3 h-3 mr-1" />
              {post.likes}
            </div>
          </div>

          <Link
            href={`/blog/${post.id}`}
            className="text-blue-600 hover:text-blue-700 text-sm font-medium"
          >
            Read more →
          </Link>
        </div>
      </div>
    </article>
  );
}
