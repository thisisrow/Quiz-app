import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const HistoryContainer = styled.div.attrs({
  className: 'container py-5'
})``;

const HistoryCard = styled.div.attrs({
  className: 'card mb-3'
})``;

const History = () => {
  const navigate = useNavigate();
  const quizHistory = JSON.parse(localStorage.getItem('quizHistory') || '[]');
  
  const uniqueHistory = quizHistory.reduce((acc, current) => {
    // Check for duplicate entries
    const isDuplicate = acc.some(item => 
      item.date === current.date && item.score === current.score
    );
    if (!isDuplicate) {
      acc.push(current);
    }
    return acc;
  }, []);

  // Sort history by date in descending order
  const sortedHistory = uniqueHistory.sort((a, b) => 
    new Date(b.date) - new Date(a.date)
  );

  const clearQuizHistory = () => {
    localStorage.removeItem('quizHistory');
    window.location.reload(); // Refresh to show empty history
  };

  return (
    <HistoryContainer>
      <div className="row">
        <div className="col-12 mb-4">
          <div className="d-flex justify-content-between align-items-center">
            <h2>Quiz History</h2>
            <button 
              className="btn btn-primary" 
              onClick={() => navigate('/')}
            >
              Back to Home
            </button>
          </div>
        </div>

        {sortedHistory.length === 0 ? (
          <div className="alert alert-info">No quiz attempts yet!</div>
        ) : (
          sortedHistory.map((attempt, index) => (
            <div className="col-md-6 mb-3" key={index}>
              <HistoryCard>
                <div className="card-body">
                  <h5 className="card-title">
                    Attempt #{sortedHistory.length - index}
                  </h5>
                  <p className="card-text">
                    Date: {new Date(attempt.date).toLocaleDateString()}
                  </p>
                  <p className="card-text">
                    Score: {attempt.score} / {attempt.totalQuestions}
                  </p>
                  <div className="progress mb-3">
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
                  <button
                    className="btn btn-sm btn-outline-primary"
                    onClick={() => navigate(`/attempt/${sortedHistory.length - 1 - index}`)}
                  >
                    View Details
                  </button>
                </div>
              </HistoryCard>
            </div>
          ))
        )}
      </div>
      <button className="btn btn-danger" onClick={clearQuizHistory}>
        Clear History
      </button>
    </HistoryContainer>
  );
};

export default History;