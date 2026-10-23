# DevQuiz

DevQuiz is a responsive, timed JavaScript fundamentals quiz built with React. It gives learners a focused place to practice core concepts, track their progress, and review a score at the end of a session.

## Features

- Nine multiple-choice questions covering JavaScript fundamentals
- Ten-minute countdown with automatic session completion
- Question map for jumping between questions
- Answered-question progress indicator
- Score summary and one-click retry
- Responsive layout and keyboard-accessible answer controls

## Run locally

```bash
npm install
npm start
```

Open [http://localhost:3000](http://localhost:3000) to use the quiz.

Create a production build with:

```bash
npm run build
```

## Project structure

- `src/App.js` — quiz state, navigation, progress, and results
- `src/Question.js` — accessible multiple-choice question
- `src/Timer.js` — countdown timer and completion handling
- `src/questions-answers.js` — quiz content and correct answers
- `src/styles.css` — responsive visual design
