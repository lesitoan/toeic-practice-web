'use client';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Calendar, Clock, Eye, Heart, Tag, User } from 'lucide-react';
import { Button } from '@nextui-org/react';
import { MOCK_POSTS } from '@/views/PostsScreen/constants';
import { useMemo } from 'react';

export default function PostDetailPage() {
  const params = useParams();
  const router = useRouter();
  const postId = params.id;

  const post = useMemo(() => {
    return MOCK_POSTS.find((p) => p.id === postId);
  }, [postId]);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Không tìm thấy bài viết</h1>
          <Button color="primary" onPress={() => router.push('/posts')}>
            Quay về danh sách bài viết
          </Button>
        </div>
      </div>
    );
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  // Related posts (random 3 posts excluding current)
  const relatedPosts = useMemo(() => {
    return MOCK_POSTS.filter((p) => p.id !== postId && p.category === post.category).slice(0, 3);
  }, [postId, post.category]);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Back Button */}
        <Button
          variant="light"
          startContent={<ArrowLeft className="w-4 h-4" />}
          onPress={() => router.back()}
          className="mb-6"
        >
          Quay lại
        </Button>

        {/* Article */}
        <article className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Hero Image */}
          <div className="w-full h-96 bg-gradient-to-r from-blue-500 to-purple-500 relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-white text-6xl font-bold opacity-20">
                {post.category.toUpperCase()}
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-8 md:p-12">
            {/* Category Badge */}
            <div className="mb-4">
              <span className="inline-block bg-blue-100 text-blue-600 px-4 py-1 rounded-full text-sm font-medium">
                {post.category}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">{post.title}</h1>

            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-6 text-gray-600 text-sm mb-8 pb-8 border-b">
              <div className="flex items-center space-x-2">
                <User className="w-4 h-4" />
                <span>{post.author.name}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4" />
                <span>{formatDate(post.publishedAt)}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4" />
                <span>{post.readTime} phút đọc</span>
              </div>
              <div className="flex items-center space-x-2">
                <Eye className="w-4 h-4" />
                <span>{post.views.toLocaleString()} lượt xem</span>
              </div>
              <div className="flex items-center space-x-2">
                <Heart className="w-4 h-4" />
                <span>{post.likes} lượt thích</span>
              </div>
            </div>

            {/* Excerpt */}
            <div className="text-xl text-gray-700 mb-8 p-6 bg-gray-50 rounded-lg border-l-4 border-blue-500">
              {post.excerpt}
            </div>

            {/* Article Content */}
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 leading-relaxed mb-6">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                exercitation ullamco laboris nisi ut aliquip ex ea commando consequat.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                Why is TOEIC Important?
              </h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
                fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                culpa qui officia deserunt mollit anim id est laborum.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Key Strategies</h2>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mb-6">
                <li>Practice regularly with authentic TOEIC materials</li>
                <li>Focus on time management during the test</li>
                <li>Build your vocabulary systematically</li>
                <li>Develop your listening skills daily</li>
                <li>Review grammar rules and common patterns</li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Practical Tips</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium
                doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore
                veritatis et quasi architecto beatae vitae dicta sunt explicabo.
              </p>

              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 my-6">
                <p className="text-yellow-900">
                  <strong>Pro Tip:</strong> Consistency is key! Study for 30 minutes every day
                  instead of cramming for hours once a week.
                </p>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Conclusion</h2>
              <p className="text-gray-700 leading-relaxed">
                Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed
                quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
              </p>
            </div>

            {/* Tags */}
            <div className="mt-10 pt-8 border-t">
              <div className="flex items-center flex-wrap gap-2">
                <Tag className="w-4 h-4 text-gray-600" />
                {post.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Author Bio */}
            <div className="mt-10 pt-8 border-t">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Về tác giả</h3>
              <div className="flex items-start space-x-4">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                  {post.author.name.charAt(0)}
                </div>
                <div>
                  <div className="font-semibold text-gray-900">{post.author.name}</div>
                  <div className="text-gray-600 text-sm">{post.author.bio}</div>
                </div>
              </div>
            </div>
          </div>
        </article>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Bài viết liên quan</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedPosts.map((relatedPost) => (
                <div
                  key={relatedPost.id}
                  onClick={() => router.push(`/posts/${relatedPost.id}`)}
                  className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform"
                >
                  <div className="h-40 bg-gradient-to-r from-blue-400 to-purple-400"></div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                      {relatedPost.title}
                    </h3>
                    <p className="text-sm text-gray-600 line-clamp-2">{relatedPost.excerpt}</p>
                    <div className="mt-3 flex items-center text-xs text-gray-500">
                      <Clock className="w-3 h-3 mr-1" />
                      {relatedPost.readTime} phút đọc
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
