'use client';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Star } from 'lucide-react';
import { COMMENTS } from '../../constants';

const COMMENTS_STORAGE_KEY = 'test_comments';

export default function Comments({ testData }) {
  const params = useParams();
  const testId = params.testSlug;

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [allComments, setAllComments] = useState([]);

  // Load comments from localStorage + fake data on mount
  useEffect(() => {
    const savedComments = localStorage.getItem(COMMENTS_STORAGE_KEY);
    let userComments = [];
    
    if (savedComments) {
      try {
        const parsed = JSON.parse(savedComments);
        userComments = parsed[testId] || [];
      } catch (error) {
        console.error('Failed to parse comments:', error);
      }
    }
    
    // Combine user comments with fake comments
    setAllComments([...userComments, ...COMMENTS]);
  }, [testId]);

  const handleSubmit = () => {
    if (!comment.trim() || rating === 0) return;

    const newComment = {
      id: `user_${Date.now()}`,
      user: 'Bạn',
      avatar: '👤',
      rating: rating,
      comment: comment.trim(),
      date: new Date().toLocaleDateString('vi-VN'),
    };

    // Save to localStorage
    const savedComments = localStorage.getItem(COMMENTS_STORAGE_KEY);
    let commentsData = {};
    
    if (savedComments) {
      try {
        commentsData = JSON.parse(savedComments);
      } catch (error) {
        console.error('Failed to parse comments:', error);
      }
    }

    if (!commentsData[testId]) {
      commentsData[testId] = [];
    }
    
    commentsData[testId].unshift(newComment);
    localStorage.setItem(COMMENTS_STORAGE_KEY, JSON.stringify(commentsData));

    // Reload page to show new comment
    window.location.reload();
  };

  const renderStars = (currentRating, interactive = false, onStarClick = null) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        onClick={() => interactive && onStarClick && onStarClick(i + 1)}
        className={`w-${interactive ? '6' : '4'} h-${interactive ? '6' : '4'} ${
          i < currentRating
            ? 'fill-yellow-400 text-yellow-400'
            : 'text-gray-300'
        } ${interactive ? 'hover:text-yellow-400 cursor-pointer' : ''}`}
      />
    ));
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Bình luận và đánh giá</h2>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="flex">{renderStars(Math.floor(testData.rating))}</div>
              <span className="font-semibold">{testData.rating}/5</span>
              <span className="text-gray-500">({allComments.length} đánh giá)</span>
            </div>
          </div>
        </div>

        {/* Comment Form */}
        <div className="mb-8 p-4 bg-gray-50 rounded-lg">
          <h3 className="font-semibold mb-4">Chia sẻ trải nghiệm của bạn</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Đánh giá</label>
              <div className="flex gap-1">
                {renderStars(rating, true, setRating)}
              </div>
              {rating > 0 && (
                <span className="text-sm text-gray-600 mt-1 block">
                  {rating}/5 sao
                </span>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Bình luận</label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows="4"
                placeholder="Chia sẻ cảm nghĩ của bạn về đề thi này..."
              />
            </div>
            <button
              onClick={handleSubmit}
              disabled={!comment.trim() || rating === 0}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Gửi bình luận
            </button>
          </div>
        </div>

        {/* Comments List */}
        <div className="space-y-4">
          {allComments.map((commentItem) => (
            <div key={commentItem.id} className="p-4 border rounded-lg">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-lg">
                  {commentItem.avatar}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-semibold">{commentItem.user}</span>
                    <div className="flex">{renderStars(commentItem.rating)}</div>
                    <span className="text-gray-500 text-sm">{commentItem.date}</span>
                  </div>
                  <p className="text-gray-700">{commentItem.comment}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
