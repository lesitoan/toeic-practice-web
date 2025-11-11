'use client';
import { useState, useEffect, Suspense, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { AlertTriangle } from 'lucide-react';
import MainContent from './components/MainContent/MainContent';
import QuestionNavigation from './components/QuestionNavigation/QuestionNavigation';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTestSession } from '@/stores/testSlice';
import firebaseService from '@/services/firebase.service';
import testServices from '@/services/test.service';

// Utility function to flatten questions from testSessionSelected
const flattenQuestions = (testSessionSelected) => {
  if (!testSessionSelected?.parts) return { questions: [], questionsByPosition: {} };

  const questions = [];
  const questionsByPosition = {};

  testSessionSelected.parts.forEach((part) => {
    part.items?.forEach((item) => {
      if (item.kind === 'single' && item.question) {
        const question = {
          ...item.question,
          part: part.part,
          passage: null,
          itemKind: 'single',
        };
        questions.push(question);
        questionsByPosition[question.position] = question;
      } else if (item.kind === 'passage' && item.questions) {
        item.questions.forEach((question) => {
          const questionWithPassage = {
            ...question,
            part: part.part,
            passage: item.passage,
            itemKind: 'passage',
            positionStart: item.position_start,
            positionEnd: item.position_end,
          };
          questions.push(questionWithPassage);
          questionsByPosition[question.position] = questionWithPassage;
        });
      }
    });
  });

  // Sort by position
  questions.sort((a, b) => a.position - b.position);

  return { questions, questionsByPosition };
};

export default function StartTestContent({ testSlug }) {
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const selectedParts = searchParams.get('parts')?.split(',').map(Number) || [];
  const { testSessionSelected, loading, idTokenSession } = useSelector((state) => state.test);

  // Flatten questions from testSessionSelected
  const { questions, questionsByPosition } = useMemo(
    () => flattenQuestions(testSessionSelected),
    [testSessionSelected]
  );

  const totalQuestions = questions.length;
  const firstQuestionPosition = questions.length > 0 ? questions[0].position : 1;

  // Extract sessionId from testSessionSelected.firebase.session_path
  // Example: "/test_sessions/23" -> 23
  const sessionId = useMemo(() => {
    if (!testSessionSelected?.firebase?.session_path) return null;
    const match = testSessionSelected.firebase.session_path.match(/\/test_sessions\/(\d+)/);
    return match ? parseInt(match[1], 10) : null;
  }, [testSessionSelected]);

  const [currentQuestion, setCurrentQuestion] = useState(firstQuestionPosition);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(7200);
  const [warnings, setWarnings] = useState([]);
  const [showWarning, setShowWarning] = useState(false);

  useEffect(() => {
    const fakeTestSlug = 6;
    // Gọi API để bắt đầu phiên làm bài thi
    dispatch(fetchTestSession(fakeTestSlug));
  }, [dispatch]);

  // Update currentQuestion when questions are loaded
  useEffect(() => {
    if (questions.length > 0 && firstQuestionPosition && !questionsByPosition[currentQuestion]) {
      setCurrentQuestion(firstQuestionPosition);
    }
  }, [questions.length, firstQuestionPosition, currentQuestion, questionsByPosition]);

  console.log('loading>>>>>>>>>>>>>>>>>>:', loading);
  console.log('idTokenSession>>>>>>>>>>>>>>>>>>:', idTokenSession);
  console.log('testSessionSelected>>>>>>>>>>>>>>>>>>:', testSessionSelected);

  // Timer
  // useEffect(() => {
  //   let interval = null;
  //   if (timeLeft > 0) {
  //     interval = setInterval(() => {
  //       setTimeLeft((time) => time - 1);
  //     }, 1000);
  //   } else {
  //     handleSubmit(true); // Auto submit khi hết giờ
  //   }
  //   return () => clearInterval(interval);
  // }, [timeLeft]);

  // Bảo mật & Giám sát
  // useEffect(() => {
  //   const addWarning = (type) => {
  //     const newWarning = { time: new Date().toLocaleTimeString(), type };
  //     setWarnings((prev) => [...prev, newWarning]);
  //     setShowWarning(true);
  //     setTimeout(() => setShowWarning(false), 3000);
  //   };

  //   // Cảnh báo khi đóng trang
  //   const handleBeforeUnload = (e) => {
  //     e.preventDefault();
  //     e.returnValue = '';
  //   };

  //   // Phát hiện rời chuột khỏi vùng làm bài
  //   const handleMouseLeave = (e) => {
  //     if (
  //       e.clientY <= 0 ||
  //       e.clientX <= 0 ||
  //       e.clientX >= window.innerWidth ||
  //       e.clientY >= window.innerHeight
  //     ) {
  //       addWarning('Rời khỏi vùng làm bài');
  //     }
  //   };

  //   // Phát hiện chuyển tab
  //   const handleVisibilityChange = () => {
  //     if (document.hidden) {
  //       addWarning('Chuyển sang tab khác');
  //     }
  //   };

  //   // Phát hiện thoát fullscreen
  //   const handleFullscreenChange = () => {
  //     if (!document.fullscreenElement) {
  //       addWarning('Thoát chế độ toàn màn hình');
  //     }
  //   };

  //   // Vào fullscreen
  //   const requestFullscreen = () => {
  //     document.documentElement.requestFullscreen?.().catch(console.log);
  //   };

  //   // Chặn right-click
  //   const handleContextMenu = (e) => {
  //     e.preventDefault();
  //     addWarning('Cố gắng mở context menu');
  //   };

  //   // Chặn copy
  //   const handleCopy = (e) => {
  //     e.preventDefault();
  //     addWarning('Cố gắng copy nội dung');
  //   };

  //   requestFullscreen();
  //   window.addEventListener('beforeunload', handleBeforeUnload);
  //   document.addEventListener('mouseleave', handleMouseLeave);
  //   document.addEventListener('visibilitychange', handleVisibilityChange);
  //   document.addEventListener('fullscreenchange', handleFullscreenChange);
  //   document.addEventListener('contextmenu', handleContextMenu);
  //   document.addEventListener('copy', handleCopy);

  //   return () => {
  //     window.removeEventListener('beforeunload', handleBeforeUnload);
  //     document.removeEventListener('mouseleave', handleMouseLeave);
  //     document.removeEventListener('visibilitychange', handleVisibilityChange);
  //     document.removeEventListener('fullscreenchange', handleFullscreenChange);
  //     document.removeEventListener('contextmenu', handleContextMenu);
  //     document.removeEventListener('copy', handleCopy);
  //   };
  // }, []);

  const handleAnswer = async (answer) => {
    // Update local state immediately for UI responsiveness
    setAnswers({ ...answers, [currentQuestion]: answer });

    // Send answer to Firebase Realtime Database
    if (sessionId && idTokenSession) {
      try {
        // Get current question data to extract question ID
        const questionData = questionsByPosition[currentQuestion];
        if (!questionData) {
          console.warn('Question data not found for position:', currentQuestion);
          return;
        }

        const questionId = questionData.id;
        // answer can be either answer ID (number) or answer ID as string
        const answerId = typeof answer === 'string' ? parseInt(answer, 10) : answer;

        if (!questionId || !answerId || isNaN(answerId)) {
          console.warn('Missing or invalid questionId or answerId:', {
            questionId,
            answerId,
            originalAnswer: answer,
          });
          return;
        }

        // PATCH will automatically replace old value if question already has an answer
        await firebaseService.updateAnswer(sessionId, questionId, answerId, idTokenSession);
      } catch (error) {
        console.error('Error updating answer to Firebase:', error);
        // Optionally show a subtle error notification to user
        // For now, we'll just log it and continue
      }
    } else {
      console.warn('Cannot update answer: missing sessionId or idTokenSession', {
        sessionId,
        hasIdToken: !!idTokenSession,
      });
    }
  };

  const handleSubmit = async (autoSubmit = false) => {
    const message = autoSubmit
      ? 'Hết giờ! Bài thi sẽ được nộp tự động.'
      : 'Bạn có chắc muốn nộp bài?';

    if (autoSubmit || window.confirm(message)) {
      try {
        if (!sessionId) {
          console.error('Session ID is missing');
          alert('Có lỗi xảy ra. Vui lòng thử lại.');
          return;
        }

        // Submit test session
        const data = await testServices.submitTestSession(sessionId);
        console.log('Submit test session response data:', data);

        // Gửi kết quả về parent window để hiển thị popup
        if (window.opener && !window.opener.closed) {
          window.opener.postMessage(
            {
              type: 'TEST_SUBMIT',
              result: {
                session_id: data?.session_id,
                score: data?.score,
                correct_count: data?.correct_count,
                total_questions: data?.total_questions,
                status: data?.status,
                submitted_at: data?.submitted_at,
              },
            },
            '*'
          );
        }

        // Đóng tab sau khi submit
        setTimeout(() => {
          window.close();
        }, 500);
      } catch (error) {
        console.error('Error submitting test:', error);
        alert('Có lỗi xảy ra khi nộp bài. Vui lòng thử lại.');
      }
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

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
          onSubmit={handleSubmit}
          questions={questions}
          questionsByPosition={questionsByPosition}
          totalQuestions={totalQuestions}
          testSessionSelected={testSessionSelected}
        />

        <MainContent
          currentQuestion={currentQuestion}
          answers={answers}
          handleAnswer={handleAnswer}
          setCurrentQuestion={setCurrentQuestion}
          questionsByPosition={questionsByPosition}
          totalQuestions={totalQuestions}
          testSessionSelected={testSessionSelected}
        />
      </div>
    </div>
  );
}
