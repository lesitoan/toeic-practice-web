'use client';
import { useState, useEffect } from 'react';
import QuestionNavigation from './components/QuestionNavigation/QuestionNavigation';
import MainContent from './components/MainContent/MainContent';

const StartTestScreen = () => {
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(7200);

  useEffect(() => {
    let interval = null;
    if (timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((timeLeft) => timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      alert('Hết giờ!');
    }
    return () => clearInterval(interval);
  }, [timeLeft]);

  const handleAnswer = (answer) => {
    setAnswers({
      ...answers,
      [currentQuestion]: answer,
    });
  };

  const jumpToQuestion = (questionNum) => {
    setCurrentQuestion(questionNum);
  };

  return (
    <div className="space-x-6 my-10 flex">
      <QuestionNavigation
        currentQuestion={currentQuestion}
        jumpToQuestion={jumpToQuestion}
        timeLeft={timeLeft}
        answers={answers}
      />

      <MainContent
        currentQuestion={currentQuestion}
        answers={answers}
        handleAnswer={handleAnswer}
        setCurrentQuestion={setCurrentQuestion}
      />
    </div>
  );
};

export default StartTestScreen;
