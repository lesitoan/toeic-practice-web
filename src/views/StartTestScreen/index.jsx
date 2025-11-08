'use client';
import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { AlertTriangle } from 'lucide-react';
import MainContent from './components/MainContent/MainContent';
import QuestionNavigation from './components/QuestionNavigation/QuestionNavigation';

export default function StartTestContent() {
  const searchParams = useSearchParams();
  const selectedParts = searchParams.get('parts')?.split(',').map(Number) || [];

  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(7200);
  const [warnings, setWarnings] = useState([]);
  const [showWarning, setShowWarning] = useState(false);

  // Timer
  useEffect(() => {
    let interval = null;
    if (timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => time - 1);
      }, 1000);
    } else {
      handleSubmit(true); // Auto submit khi hết giờ
    }
    return () => clearInterval(interval);
  }, [timeLeft]);

  // Bảo mật & Giám sát
  useEffect(() => {
    const addWarning = (type) => {
      const newWarning = { time: new Date().toLocaleTimeString(), type };
      setWarnings((prev) => [...prev, newWarning]);
      setShowWarning(true);
      setTimeout(() => setShowWarning(false), 3000);
    };

    // Cảnh báo khi đóng trang
    const handleBeforeUnload = (e) => {
      e.preventDefault();
      e.returnValue = '';
    };

    // Phát hiện rời chuột khỏi vùng làm bài
    const handleMouseLeave = (e) => {
      if (
        e.clientY <= 0 ||
        e.clientX <= 0 ||
        e.clientX >= window.innerWidth ||
        e.clientY >= window.innerHeight
      ) {
        addWarning('Rời khỏi vùng làm bài');
      }
    };

    // Phát hiện chuyển tab
    const handleVisibilityChange = () => {
      if (document.hidden) {
        addWarning('Chuyển sang tab khác');
      }
    };

    // Phát hiện thoát fullscreen
    const handleFullscreenChange = () => {
      if (!document.fullscreenElement) {
        addWarning('Thoát chế độ toàn màn hình');
      }
    };

    // Vào fullscreen
    const requestFullscreen = () => {
      document.documentElement.requestFullscreen?.().catch(console.log);
    };

    // Chặn right-click
    const handleContextMenu = (e) => {
      e.preventDefault();
      addWarning('Cố gắng mở context menu');
    };

    // Chặn copy
    const handleCopy = (e) => {
      e.preventDefault();
      addWarning('Cố gắng copy nội dung');
    };

    requestFullscreen();
    window.addEventListener('beforeunload', handleBeforeUnload);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('copy', handleCopy);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('copy', handleCopy);
    };
  }, []);

  const handleAnswer = (answer) => {
    setAnswers({ ...answers, [currentQuestion]: answer });
  };

  const handleSubmit = (autoSubmit = false) => {
    const message = autoSubmit
      ? 'Hết giờ! Bài thi sẽ được nộp tự động.'
      : 'Bạn có chắc muốn nộp bài?';

    if (autoSubmit || window.confirm(message)) {
      // Tính điểm (fake)
      const answeredCount = Object.keys(answers).length;
      const correctCount = Math.floor(answeredCount * 0.7);
      const score = Math.round((correctCount / 200) * 990);

      const result = {
        answers,
        warnings,
        submittedAt: new Date().toISOString(),
        timeSpent: 7200 - timeLeft,
        stats: {
          totalQuestions: 200,
          answeredCount,
          correctCount,
          score,
          listeningScore: Math.round(score * 0.5),
          readingScore: Math.round(score * 0.5),
        },
      };

      // Gửi kết quả về parent
      if (window.opener) {
        window.opener.postMessage({ type: 'TEST_SUBMIT', result }, '*');
      }

      setTimeout(() => window.close(), 500);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {showWarning && (
        <div className="fixed top-4 right-4 z-50 bg-red-500 text-white px-6 py-4 rounded-lg shadow-lg animate-bounce">
          <AlertTriangle className="w-6 h-6" />
          <p className="font-semibold">Cảnh báo vi phạm!</p>
        </div>
      )}

      <div className="space-x-6 my-10 flex">
        <QuestionNavigation
          currentQuestion={currentQuestion}
          jumpToQuestion={setCurrentQuestion}
          timeLeft={timeLeft}
          answers={answers}
          warnings={warnings}
          onSubmit={() => handleSubmit(false)}
        />

        <MainContent
          currentQuestion={currentQuestion}
          answers={answers}
          handleAnswer={handleAnswer}
          setCurrentQuestion={setCurrentQuestion}
        />
      </div>
    </div>
  );
}
