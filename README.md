# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
# Quiz Application

A dynamic quiz application built with React that tests users' knowledge across various topics. The app features both multiple-choice and integer-based questions, with a timer for each question and detailed performance tracking.

## Features

### Core Functionality
- Multiple question types:
  - Multiple-choice questions with colorful options
  - Integer-based questions with numerical input
- 30-second timer for each question
- Real-time score tracking
- Progress bar showing quiz completion status

### Quiz Experience
- Clear question presentation
- Instant feedback on answers
- Question counter (e.g., "Question 5 of 10")
- Submit confirmation screen at quiz completion

### History & Statistics
- Detailed attempt history
- Score statistics and performance metrics
- Individual question review with:
  - Time spent per question
  - Correct vs user answers
  - Success indicators
- Option to clear history

### User Interface
- Clean, modern design
- Mobile-responsive layout
- Bootstrap-based styling
- Smooth transitions and animations
- Intuitive navigation

## Technologies Used
- React
- React Router
- Styled Components
- Bootstrap
- Local Storage for data persistence
- Vite for build tooling

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. Clone the repository
## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

git clone https://github.com/thisisrow/Quiz-app

2. Navigate to the project directory

cd quiz-app

3. Install dependencies

npm install

4. Start the development server

npm run dev

5. Open your browser and navigate to `http://localhost:5173` to view the application
### Building for Production

To create a production build:

npm run build


The built files will be in the `dist` directory.

## Deployment

The app is deployed and can be accessed at: [Quiz App Live Demo](https://quiz-app-ecru-two.vercel.app/)

## Project Structure
quiz-app/
├── src/
│ ├── components/
│ │ └── Scoreboard.jsx
│ ├── pages/
│ │ ├── Home.jsx
│ │ ├── QuizPage.jsx
│ │ ├── History.jsx
│ │ └── AttemptDetails.jsx
│ ├── data/
│ │ └── quizData.js
│ └── App.jsx
├── public/
├── package.json
└── ...
## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments
- React team for the amazing framework
- Bootstrap team for the responsive design components
- Styled Components for the styling solution
