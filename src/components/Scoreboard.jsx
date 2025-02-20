import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const ScoreboardContainer = styled.div.attrs({
  className: 'container py-5'
})``;

const ScoreCard = styled.div.attrs({
  className: 'card'
})``;

const Scoreboard = ({ score, totalQuestions, answers, onRetry }) => {
  const navigate = useNavigate();
  
  return (
    <ScoreboardContainer>
      <ScoreCard>
        <div className="card-body text-center">
          <h2 className="card-title mb-4">Quiz Complete!</h2>
          
          <div className="mb-4">
            <h3>Your Score: {score} out of {totalQuestions}</h3>
            <div className="progress mt-3">
              <div 
                className="progress-bar" 
                role="progressbar"
                style={{ width: `${(score / totalQuestions) * 100}%` }}
              >
                {Math.round((score / totalQuestions) * 100)}%
              </div>
            </div>
          </div>

          <div className="mb-4">
            <h4>Question Summary</h4>
            {answers.map((answer, index) => (
              <div 
                key={index}
                className={`alert ${answer.isCorrect ? 'alert-success' : 'alert-danger'} text-start`}
              >
                <p className="mb-1"><strong>Q{index + 1}:</strong> {answer.question}</p>
                <p className="mb-1">Your answer: {answer.userAnswer}</p>
                <p className="mb-1">Correct answer: {answer.correctAnswer}</p>
                <small>Time spent: {answer.timeSpent} seconds</small>
              </div>
            ))}
          </div>

          <div className="d-grid gap-3 col-md-6 mx-auto">
            <button 
              className="btn btn-primary"
              onClick={onRetry}
            >
              Try Again
            </button>
            <button 
              className="btn btn-secondary"
              onClick={() => navigate('/history')}
            >
              View History
            </button>
            <button 
              className="btn btn-outline-primary"
              onClick={() => navigate('/')}
            >
              Back to Home
            </button>
          </div>
        </div>
      </ScoreCard>
    </ScoreboardContainer>
  );
};

export default Scoreboard; 