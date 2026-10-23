import React, { useCallback, useState } from "react";
import "./styles.css";
import Timer from "./Timer.js";
import Question from "./Question.js";
import { quizQuestions } from "./questions-answers.js";

const createInitialAnswers = () =>
  quizQuestions.map(({ id }) => ({ questionID: id, optionID: null }));

export default function App() {
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [timeExpired, setTimeExpired] = useState(false);
  const [answers, setAnswers] = useState(createInitialAnswers);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const currentQuestion = quizQuestions[currentQuestionIndex];
  const currentQuestionAnswer = answers.find(
    (answer) => answer.questionID === currentQuestion.id
  );
  const answeredCount = answers.filter((answer) => answer.optionID !== null)
    .length;
  const score = answers.reduce((total, answer) => {
    const question = quizQuestions.find(
      (item) => item.id === answer.questionID
    );
    return total + (question.correctAnswerId === answer.optionID ? 1 : 0);
  }, 0);

  const selectOption = (questionID, optionID) => {
    setAnswers((currentAnswers) =>
      currentAnswers.map((answer) =>
        answer.questionID === questionID ? { ...answer, optionID } : answer
      )
    );
  };

  const finishQuiz = useCallback((expired = false) => {
    setTimeExpired(expired);
    setQuizCompleted(true);
  }, []);
  const handleTimeComplete = useCallback(() => finishQuiz(true), [finishQuiz]);

  const restartQuiz = () => {
    setAnswers(createInitialAnswers());
    setCurrentQuestionIndex(0);
    setTimeExpired(false);
    setQuizCompleted(false);
  };

  return (
    <main className="app-shell">
      <header className="topbar">
        <a className="brand" href="/" aria-label="DevQuiz home">
          <span className="brand-mark" aria-hidden="true">
            Q
          </span>
          <span>devquiz</span>
        </a>
        <div className="topbar-label">
          <span className="status-dot" />
          JavaScript fundamentals
        </div>
        <a className="topbar-link" href="#about">
          Practice session
        </a>
      </header>

      <section className="quiz-layout" aria-label="JavaScript quiz">
        <aside className="quiz-sidebar">
          <div className="eyebrow">YOUR PROGRESS</div>
          <h1>Keep your<br />momentum.</h1>
          <p className="sidebar-copy">
            A little practice goes a long way. You’ve got this.
          </p>

          <div className="progress-summary">
            <div className="progress-heading">
              <span>Questions answered</span>
              <strong>
                {answeredCount}<span> / {quizQuestions.length}</span>
              </strong>
            </div>
            <div
              className="progress-track"
              role="progressbar"
              aria-label="Questions answered"
              aria-valuenow={answeredCount}
              aria-valuemin={0}
              aria-valuemax={quizQuestions.length}
            >
              <span
                className="progress-fill"
                style={{
                  width: `${(answeredCount / quizQuestions.length) * 100}%`,
                }}
              />
            </div>
          </div>

          <div className="question-navigation">
            <div className="eyebrow">QUESTION MAP</div>
            <div className="question-grid">
              {answers.map((answer, index) => {
                const isCurrent = index === currentQuestionIndex;
                const isAnswered = answer.optionID !== null;
                return (
                  <button
                    className={[
                      "question-number",
                      isCurrent ? "is-current" : "",
                      isAnswered ? "is-answered" : "",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                    key={answer.questionID}
                    type="button"
                    aria-label={`Go to question ${index + 1}${
                      isAnswered ? ", answered" : ", not answered"
                    }`}
                    aria-current={isCurrent ? "step" : undefined}
                    onClick={() => setCurrentQuestionIndex(index)}
                    disabled={quizCompleted}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </button>
                );
              })}
            </div>
            <div className="map-legend">
              <span><i className="legend-dot answered-dot" /> Answered</span>
              <span><i className="legend-dot" /> Unanswered</span>
            </div>
          </div>

          <div className="sidebar-note" id="about">
            <span className="note-icon" aria-hidden="true">✦</span>
            <p><strong>Built for curious minds.</strong><br />Learn something new, one question at a time.</p>
          </div>
        </aside>

        <div className="quiz-main">
          <div className="session-heading">
            <div>
              <div className="eyebrow">DAILY CHALLENGE <span className="challenge-dot">✦</span></div>
              <p>Test what you know. Find out what’s next.</p>
            </div>
            {!quizCompleted && (
              <Timer totalTime="00:10:00" onComplete={handleTimeComplete} />
            )}
          </div>

          {quizCompleted ? (
            <section className="result-card" aria-live="polite">
              <div className="result-icon" aria-hidden="true">
                {timeExpired ? "⏱" : "✦"}
              </div>
              <div className="eyebrow">
                {timeExpired ? "TIME'S UP" : "SESSION COMPLETE"}
              </div>
              <h2>{timeExpired ? "Nice effort." : "You showed up."}</h2>
              <p className="result-copy">
                {timeExpired
                  ? "Your time is up. Every attempt is a chance to get better."
                  : "Here’s how you did on today’s JavaScript challenge."}
              </p>
              <div className="score-display">
                <strong>{score}<span> / {quizQuestions.length}</span></strong>
                <span className="score-caption">correct answers</span>
              </div>
              <p className="answered-caption">
                You answered {answeredCount} of {quizQuestions.length} questions.
              </p>
              <button className="primary-button restart-button" onClick={restartQuiz}>
                Try again <span aria-hidden="true">↗</span>
              </button>
            </section>
          ) : (
            <section className="question-card" aria-live="polite">
              <div className="question-card-top">
                <span className="question-category">JAVASCRIPT <span>·</span> FUNDAMENTALS</span>
                <span className="question-counter">
                  QUESTION <strong>{String(currentQuestionIndex + 1).padStart(2, "0")}</strong>
                  <span> / {String(quizQuestions.length).padStart(2, "0")}</span>
                </span>
              </div>

              <div className="question-card-content">
                <Question
                  displayQuestion={currentQuestion}
                  onSelctOption={selectOption}
                  currentQuestionAnswer={currentQuestionAnswer}
                />
              </div>

              <div className="question-card-footer">
                <button
                  className="secondary-button"
                  type="button"
                  onClick={() =>
                    setCurrentQuestionIndex((index) => Math.max(0, index - 1))
                  }
                  disabled={currentQuestionIndex === 0}
                >
                  <span aria-hidden="true">←</span> Previous
                </button>
                {currentQuestionIndex < quizQuestions.length - 1 ? (
                  <button
                    className="primary-button"
                    type="button"
                    onClick={() =>
                      setCurrentQuestionIndex((index) =>
                        Math.min(quizQuestions.length - 1, index + 1)
                      )
                    }
                  >
                    Next question <span aria-hidden="true">→</span>
                  </button>
                ) : (
                  <button
                    className="primary-button"
                    type="button"
                    onClick={() => finishQuiz()}
                  >
                    Finish quiz <span aria-hidden="true">✓</span>
                  </button>
                )}
              </div>
            </section>
          )}

          <footer className="page-footer">
            <span>Take your time. Trust what you know.</span>
            <span>DEVQUIZ <i>·</i> KEEP LEARNING</span>
          </footer>
        </div>
      </section>
    </main>
  );
}
