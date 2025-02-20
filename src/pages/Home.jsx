import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="container-fluid bg-dark text-light d-flex justify-content-center align-items-center vh-100" style={{ position: "relative", overflow: "hidden" }}>
      {/* Animated Background */}
      
      
      <div className="text-center p-5 shadow-lg" style={{ backdropFilter: "blur(10px)", backgroundColor: "rgba(255, 255, 255, 0.2)", borderRadius: "15px", zIndex: 1 }}>
        <h1 className="mb-3"> Welcome to the Quiz App </h1>
        <h5 className="mb-4">Test your knowledge with exciting quizzes!</h5>
        <div className="d-flex flex-column flex-md-row justify-content-center gap-3">
          <Link to="/quiz" className="btn btn-primary btn-lg">Start Quiz</Link>
          <Link to="/history" className="btn btn-outline-light btn-lg">View History</Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
