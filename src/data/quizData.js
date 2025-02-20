// Multiple-Choice Questions
const multipleChoiceQuestions = [
    {
      id: 1,
      question: "Which planet is closest to the Sun?",
      options: ["Venus", "Mercury", "Earth", "Mars"],
      answer: "Mercury",
      type: "multiple-choice"
    },
    {
      id: 2,
      question: "Which data structure organizes items in a First-In, First-Out (FIFO) manner?",
      options: ["Stack", "Queue", "Tree", "Graph"],
      answer: "Queue",
      type: "multiple-choice"
    },
    {
      id: 3,
      question: "Which of the following is primarily used for structuring web pages?",
      options: ["Python", "Java", "HTML", "C++"],
      answer: "HTML",
      type: "multiple-choice"
    },
    {
      id: 4,
      question: "Which chemical symbol stands for Gold?",
      options: ["Au", "Gd", "Ag", "Pt"],
      answer: "Au",
      type: "multiple-choice"
    },
    {
      id: 5,
      question: "Which of these processes is not typically involved in refining petroleum?",
      options: ["Fractional distillation", "Cracking", "Polymerization", "Filtration"],
      answer: "Filtration",
      type: "multiple-choice"
    }
  ];
  
  // Integer-Type Questions
  const integerQuestions = [
    {
      id: 1,
      question: "What is the value of 12 + 28?",
      answer: 40,
      type: "integer"
    },
    {
      id: 2,
      question: "How many states are there in the United States?",
      answer: 50,
      type: "integer"
    },
    {
      id: 3,
      question: "In which year was the Declaration of Independence signed?",
      answer: 1776,
      type: "integer"
    },
    {
      id: 4,
      question: "What is the value of pi rounded to the nearest integer?",
      answer: 3,
      type: "integer"
    },
    {
      id: 5,
      question: "If a car travels at 60 mph for 2 hours, how many miles does it travel?",
      answer: 120,
      type: "integer"
    }
  ];
  
  export { multipleChoiceQuestions, integerQuestions };