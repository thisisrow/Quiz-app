import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import QuizPage from './pages/QuizPage';
import History from './pages/History';
import Scoreboard from './components/Scoreboard';
import AttemptDetails from './pages/AttemptDetails';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quiz" element={<QuizPage />} />
        <Route path="/history" element={<History />} />
        <Route path="/scoreboard" element={<Scoreboard />} />
        <Route path="/attempt/:attemptId" element={<AttemptDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
