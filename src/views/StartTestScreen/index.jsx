'use client';
import { useState, useEffect, Suspense, useMemo, use } from 'react';
import { useSearchParams } from 'next/navigation';
import { AlertTriangle } from 'lucide-react';
import { useCookies } from 'react-cookie';
import MainContent from './components/MainContent/MainContent';
import QuestionNavigation from './components/QuestionNavigation/QuestionNavigation';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTestSession, setTestData } from '@/stores/testSlice';
import firebaseService from '@/services/firebase.service';
import testServices from '@/services/test.service';
import { flattenQuestions } from '@/utils/flattenQuestions';
import { toast } from 'react-toastify';
import CradleLoader from '@/components/common/Loading/CradleLoader';
import {
  TEST_ID_TOKEN_NAME,
  TEST_SESSION_COOKIE_NAME,
  TEST_SESSION_EXPIRE_TIME_NAME,
} from './constants';

export default function StartTestScreen({ testSlug }) {
  const [cookies, setCookie, removeCookie] = useCookies([
    TEST_SESSION_COOKIE_NAME,
    TEST_SESSION_EXPIRE_TIME_NAME,
    TEST_ID_TOKEN_NAME,
  ]);
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const selectedParts = searchParams.get('parts')?.split(',').map(Number) || [];
  const { testSessionSelected, loading, idTokenSession, startTime, expireTime, selectedSessionId } =
    useSelector((state) => state.test);

  // làm phẳng câu hỏi
  const { questions, questionsByPosition } = useMemo(
    () => flattenQuestions(testSessionSelected),
    [testSessionSelected]
  );

  const totalQuestions = questions.length;
  const firstQuestionPosition = questions.length > 0 ? questions[0].position : 1;

  const [currentQuestion, setCurrentQuestion] = useState(firstQuestionPosition);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(7200);
  const [warnings, setWarnings] = useState([]);
  const [showWarning, setShowWarning] = useState(false);

  const sessionId = useMemo(() => {
    if (!testSessionSelected?.firebase?.session_path) return null;
    const match = testSessionSelected.firebase.session_path.match(/\/test_sessions\/(\d+)/);
    return match ? parseInt(match[1], 10) : null;
  }, [testSessionSelected]);

  useEffect(() => {
    const getPreviousAnswers = async () => {
      try {
        if (!sessionId || !idTokenSession) return;
        const previousAnswers = await firebaseService.getAnswers(sessionId, idTokenSession);
        if (!previousAnswers || Object.keys(previousAnswers).length === 0) return;

        const positionAnswers = {};
        Object.entries(previousAnswers).forEach(([questionIdKey, ans]) => {
          const questionId = parseInt(questionIdKey, 10);
          if (isNaN(questionId)) return;

          const entry = Object.entries(questionsByPosition).find(([, q]) => q?.id === questionId);
          if (entry) {
            const position = parseInt(entry[0], 10);
            const answerVal = ans != null ? String(ans) : ans;
            positionAnswers[position] = answerVal;
          }
        });
        if (Object.keys(positionAnswers).length > 0) {
          setAnswers((prev) => ({ ...prev, ...positionAnswers }));
        }
      } catch (error) {
        // toast.error('Có lỗi xảy ra khi tải câu trả lời trước đó. Vui lòng thử lại.');
      }
    };
    getPreviousAnswers();
  }, [sessionId, idTokenSession, questionsByPosition]);

  useEffect(() => {
    const fakeTestSlug = 1;
    // lấy dữ liệu phiên làm bài thi từ cookie nếu có
    async function fetchTestSessionFromCookie() {
      try {
        if (
          cookies &&
          cookies[TEST_SESSION_COOKIE_NAME] &&
          cookies[TEST_SESSION_EXPIRE_TIME_NAME] &&
          cookies[TEST_ID_TOKEN_NAME]
        ) {
          const testSessionSelectedDetail = await testServices.getTestDetailBySession(
            cookies[TEST_SESSION_COOKIE_NAME]
          );
          if (!testSessionSelectedDetail) {
            removeCookie(TEST_SESSION_COOKIE_NAME);
            removeCookie(TEST_SESSION_EXPIRE_TIME_NAME);
            removeCookie(TEST_ID_TOKEN_NAME);
            return;
          }
          dispatch(
            setTestData({
              testSessionSelected: testSessionSelectedDetail,
              expireTime: new Date(cookies[TEST_SESSION_EXPIRE_TIME_NAME]).getTime(),
              idToken: cookies[TEST_ID_TOKEN_NAME],
              sessionId: cookies[TEST_SESSION_COOKIE_NAME],
            })
          );
          return;
        }
        dispatch(fetchTestSession(fakeTestSlug));
      } catch (error) {
        removeCookie(TEST_SESSION_COOKIE_NAME);
        removeCookie(TEST_SESSION_EXPIRE_TIME_NAME);
        removeCookie(TEST_ID_TOKEN_NAME);
      }
    }
    fetchTestSessionFromCookie();
  }, [dispatch]);

  useEffect(() => {
    if (testSessionSelected) {
      setCookie(TEST_SESSION_COOKIE_NAME, selectedSessionId, { expires: new Date(expireTime) });
      setCookie(TEST_SESSION_EXPIRE_TIME_NAME, expireTime.toString(), {
        expires: new Date(expireTime),
      });
      setCookie(TEST_ID_TOKEN_NAME, idTokenSession, { expires: new Date(expireTime) });
    }
  }, [testSessionSelected]);

  useEffect(() => {
    if (questions.length > 0 && firstQuestionPosition && !questionsByPosition[currentQuestion]) {
      setCurrentQuestion(firstQuestionPosition);
    }
  }, [questions.length, firstQuestionPosition, currentQuestion, questionsByPosition]);

  useEffect(() => {
    if (startTime && expireTime) {
      setTimeLeft(Math.floor((expireTime - startTime) / 1000));
    }
  }, [startTime, expireTime]);

  // Timer
  useEffect(() => {
    let interval = null;

    if (timeLeft === 120) {
      window.alert('Còn 2 phút nữa là hết giờ làm bài!');
    }

    if (timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => time - 1);
      }, 1000);
    } else {
      window.alert('Thời gian đã hết, hệ thống sẽ tự động nộp bài!');
      handleSubmit(true);
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timeLeft, sessionId]);

  const handleAnswer = async (answer) => {
    if (!sessionId || !idTokenSession) {
      toast.error('Có lỗi xảy ra. Vui lòng thử lại.');
      return;
    }
    setAnswers({ ...answers, [currentQuestion]: answer });

    try {
      const questionData = questionsByPosition[currentQuestion];
      if (!questionData) {
        toast.warning('Không tìm thấy dữ liệu câu hỏi hiện tại. hãy thử lại sau.');
        return;
      }

      const questionId = questionData.id;
      const answerId = typeof answer === 'string' ? parseInt(answer, 10) : answer;
      if (!questionId || !answerId || isNaN(answerId)) {
        toast.warning('Dữ liệu câu trả lời không hợp lệ. Vui lòng thử lại.');
        return;
      }

      await firebaseService.updateAnswer(sessionId, questionId, answerId, idTokenSession);
    } catch (error) {
      toast.error('Có lỗi xảy ra khi lưu câu trả lời. Vui lòng thử lại.');
    }
  };

  const handleSubmit = async (autoSubmit = false) => {
    try {
      if (!sessionId) {
        console.error('Session ID is missing');
        alert('Có lỗi xảy ra. Vui lòng thử lại.');
        return;
      }
      const data = await testServices.submitTestSession(sessionId);
      if (!data) {
        alert('Có lỗi xảy ra khi nộp bài. Vui lòng thử lại.');
        return;
      }

      // xóa cookie phiên làm bài thi
      removeCookie(TEST_SESSION_COOKIE_NAME);
      removeCookie(TEST_SESSION_EXPIRE_TIME_NAME);
      removeCookie(TEST_ID_TOKEN_NAME);

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
        setTimeout(() => {
          window.close();
        }, 500);
      } else {
        window.location.href = `/tests/${testSlug}`;
      }
    } catch (error) {
      toast.error('Có lỗi xảy ra khi nộp bài. Vui lòng thử lại.');
    } finally {
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <CradleLoader size="xl" color="#4F46E5" />
      </div>
    );
  } else if (!testSessionSelected) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-3">
            Không Tìm Thấy Phiên Làm Bài Thi
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Phiên làm bài thi không tồn tại hoặc đã hết hạn. Vui lòng bắt đầu một phiên làm bài thi
            mới.
          </p>
        </div>
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
