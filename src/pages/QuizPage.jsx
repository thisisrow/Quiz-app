import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { multipleChoiceQuestions, integerQuestions } from '../data/quizData';
import Scoreboard from '../components/Scoreboard';

const QuizContainer = styled.div.attrs({
  className: 'container py-5'
})`
  background-color: #f8f9fa;
  min-height: 100vh;
`;

const QuestionCard = styled.div.attrs({
  className: 'card p-4'
})``;

const ProgressBar = styled.div.attrs({
  className: 'progress mb-4'
})`
  height: 10px;
`;

const ProgressFill = styled.div.attrs({
  className: 'progress-bar bg-success'
})``;

const ScoreDisplay = styled.div.attrs({
  className: 'alert alert-primary mb-4'
})``;

const Timer = styled.div.attrs({
  className: 'alert alert-warning mb-4'
})``;

const OptionButton = styled.button.attrs(({ $index }) => ({
  className: `btn btn-lg w-100 mb-3 ${
    $index === 0 ? 'btn-primary' :
    $index === 1 ? 'btn-success' :
    $index === 2 ? 'btn-danger' :
    'btn-dark'
  }`
}))`
  display: flex;
  align-items: center;
  gap: 10px;
  justify-content: flex-start;
  padding: 15px;
  color: white !important;

  i {
    font-size: 1.5rem;
  }

  &:hover {
    opacity: 0.9;
    transform: translateY(-2px);
    transition: all 0.2s;
    color: white !important;
  }
`;

const IntegerInput = styled.input.attrs({
  className: 'form-control form-control-lg mb-3'
})``;

const SubmitButton = styled.button.attrs({
  className: 'btn btn-primary btn-lg'
})``;

const QuizPage = () => {
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [quizComplete, setQuizComplete] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [integerAnswer, setIntegerAnswer] = useState('');
  const [showSubmit, setShowSubmit] = useState(false);
  const [saveCounter, setSaveCounter] = useState(0);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const allQuestions = [...multipleChoiceQuestions, ...integerQuestions];
  const totalQuestions = allQuestions.length;

  useEffect(() => {
    if (timeLeft > 0 && !quizComplete) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !quizComplete) {
      handleAnswer(null);
    }
  }, [timeLeft, quizComplete]);

  const handleAnswer = (answer) => {
    const currentQuestion = allQuestions[currentQuestionIndex];
    const isCorrect = answer === currentQuestion.answer;
    
    const isLastQuestion = currentQuestionIndex === totalQuestions - 1;

    if (!answers.find(a => a.question === currentQuestion.question)) {
      const newAnswer = {
        question: currentQuestion.question,
        userAnswer: answer || "Time's up!",
        correctAnswer: currentQuestion.answer,
        isCorrect,
        timeSpent: 30 - timeLeft
      };

      setAnswers(prev => [...prev, newAnswer]);

      if (isCorrect) {
        setScore(prev => prev + 1);
      }
    }

    if (isLastQuestion) {
      setShowSubmit(true);
      setTimeLeft(0);
    } else {
      setCurrentQuestionIndex(prev => prev + 1);
      setTimeLeft(30);
      setIntegerAnswer('');
    }
  };

  const handleIntegerSubmit = (e) => {
    e.preventDefault();
    handleAnswer(parseInt(integerAnswer));
  };

  const handleSubmitQuiz = () => {
    if (hasSubmitted) return;
    
    setSaveCounter(prev => prev + 1);
    
    const finalScore = score;
    const quizResult = {
      id: Date.now(),
      date: new Date().toISOString(),
      score: finalScore,
      totalQuestions,
      answers: [...answers]
    };

    const existingHistory = JSON.parse(localStorage.getItem('quizHistory') || '[]');
    const isDuplicate = existingHistory.some(entry => 
      entry.date === quizResult.date && entry.score === quizResult.score
    );

    if (!isDuplicate) {
      const updatedHistory = [...existingHistory, quizResult];
      localStorage.setItem('quizHistory', JSON.stringify(updatedHistory));
    }

    setHasSubmitted(true);
    setQuizComplete(true);
  };

  const restartQuiz = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setTimeLeft(30);
    setQuizComplete(false);
    setAnswers([]);
    setIntegerAnswer('');
    setHasSubmitted(false);
  };

  useEffect(() => {
    return () => {
      setSaveCounter(0);
    };
  }, []);

  if (quizComplete) {
    return (
      <Scoreboard
        score={score}
        totalQuestions={totalQuestions}
        answers={answers}
        onRetry={restartQuiz}
      />
    );
  }

  const currentQuestion = allQuestions[currentQuestionIndex];
  const progress = ((currentQuestionIndex) / totalQuestions) * 100;

  return (
    <QuizContainer>
      <ProgressBar>
        <ProgressFill style={{ width: `${progress}%` }} />
      </ProgressBar>

      <ScoreDisplay>
        Score: {score} / {totalQuestions}
      </ScoreDisplay>

      {!showSubmit && <Timer>Time remaining: {timeLeft} seconds</Timer>}

      {showSubmit ? (
        <QuestionCard>
          <div className="text-center">
            <h3 className="mb-4">Quiz Complete!</h3>
            <p>You've answered all questions. Ready to submit?</p>
            <button 
              className="btn btn-primary btn-lg"
              onClick={handleSubmitQuiz}
            >
              Submit Quiz
            </button>
          </div>
        </QuestionCard>
      ) : (
        <QuestionCard>
          <div className="d-flex justify-content-between align-items-center">
            <h3 className="mb-4">Question {currentQuestionIndex + 1} of {totalQuestions}</h3>
            <button 
              className="btn btn-primary" 
              onClick={() => navigate('/')}
            >
              Back to Home
            </button>
          </div>
          
          
          <h3 className="mb-4">{currentQuestion.question}</h3>
          
          {currentQuestion.type === 'multiple-choice' ? (
            <div className="row g-3">
              
              {currentQuestion.options.map((option, index) => (
                <div className="col-12 col-md-6" key={index}>
                  <OptionButton
                    $index={index}
                    onClick={() => handleAnswer(option)}
                  >
                    <i className={
                      index === 0 ? 'bi bi-circle-fill' :
                      index === 1 ? 'bi bi-triangle-fill' :
                      index === 2 ? 'bi bi-square-fill' :
                      'bi bi-umbrella-fill'
                    }></i>
                    {option}
                  </OptionButton>
                </div>
              ))}
            </div>
          ) : (
            <form onSubmit={handleIntegerSubmit}>
              <div className="row g-3">
                <div className="col-12 col-md-8">
                  <IntegerInput
                    type="number"
                    value={integerAnswer}
                    onChange={(e) => setIntegerAnswer(e.target.value)}
                    placeholder="Enter your answer"
                    required
                  />
                </div>
                <div className="col-12 col-md-4">
                  <SubmitButton type="submit">
                    Submit Answer
                  </SubmitButton>
                </div>
              </div>
            </form>
          )}
        </QuestionCard>
      )}
      
    </QuizContainer>
  );
};

export default QuizPage; 