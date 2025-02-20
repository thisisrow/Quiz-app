import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';

const DetailsContainer = styled.div.attrs({
  className: 'container py-5'
})``;

const DetailCard = styled.div.attrs({
  className: 'card mb-4'
})``;

const QuestionCard = styled.div.attrs({
  className: 'card mb-3'
})`
  border-left: 4px solid;
  border-left-color: ${props => props.$isCorrect ? '#28a745' : '#dc3545'};
`;

const AttemptDetails = () => {
  const navigate = useNavigate();
  const { attemptId } = useParams();
  
  // Get quiz history from localStorage
  const quizHistory = JSON.parse(localStorage.getItem('quizHistory') || '[]');
  const attempt = quizHistory[quizHistory.length - 1 - parseInt(attemptId)];

  if (!attempt) {
    return (
      <DetailsContainer>
        <div className="alert alert-danger">Attempt not found!</div>
        <button 
          className="btn btn-primary"
          onClick={() => navigate('/history')}
        >
          Back to History
        </button>
      </DetailsContainer>
    );
  }

  return (
    <DetailsContainer>
      <DetailCard>
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="card-title mb-0">Attempt Details</h2>
            <button 
              className="btn btn-primary"
              onClick={() => navigate('/history')}
            >
              Back to History
            </button>
          </div>

          <div className="row mb-4">
            <div className="col-md-4">
              <div className="card bg-light">
                <div className="card-body">
                  <h5>Score</h5>
                  <h2>{attempt.score} / {attempt.totalQuestions}</h2>
                  <div className="progress">
                    <div 
                      className="progress-bar" 
                      role="progressbar"
                      style={{ 
                        width: `${(attempt.score / attempt.totalQuestions) * 100}%` 
                      }}
                    >
                      {Math.round((attempt.score / attempt.totalQuestions) * 100)}%
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card bg-light">
                <div className="card-body">
                  <h5>Date</h5>
                  <p>{new Date(attempt.date).toLocaleString()}</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card bg-light">
                <div className="card-body">
                  <h5>Average Time</h5>
                  <p>
                    {Math.round(
                      attempt.answers.reduce((acc, curr) => acc + curr.timeSpent, 0) / 
                      attempt.answers.length
                    )} seconds per question
                  </p>
                </div>
              </div>
            </div>
          </div>

          <h4>Question Details</h4>
          {attempt.answers.map((answer, index) => (
            <QuestionCard key={index} $isCorrect={answer.isCorrect}>
              <div className="card-body">
                <div className="d-flex justify-content-between">
                  <h5 className="card-title">Question {index + 1}</h5>
                  <span className={`badge ${answer.isCorrect ? 'bg-success' : 'bg-danger'}`}>
                    {answer.isCorrect ? 'Correct' : 'Incorrect'}
                  </span>
                </div>
                <p className="card-text">{answer.question}</p>
                <div className="row">
                  <div className="col-md-4">
                    <small className="text-muted">Your Answer:</small>
                    <p className={answer.isCorrect ? 'text-success' : 'text-danger'}>
                      {answer.userAnswer}
                    </p>
                  </div>
                  <div className="col-md-4">
                    <small className="text-muted">Correct Answer:</small>
                    <p className="text-success">{answer.correctAnswer}</p>
                  </div>
                  <div className="col-md-4">
                    <small className="text-muted">Time Spent:</small>
                    <p>{answer.timeSpent} seconds</p>
                  </div>
                </div>
              </div>
            </QuestionCard>
          ))}
        </div>
      </DetailCard>
    </DetailsContainer>
  );
};

export default AttemptDetails;