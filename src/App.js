import "./styles.css";
import Timer from "./Timer.js";
import Question from "./Question.js";
import React, { useState } from "react";
import { quizQuestions } from "./questions-answers.js";

const answers = quizQuestions.map((question) => {
  return {
    questionID: question.id,
    optionID: null,
  };
});
console.log("answers", answers);
const defaultQuizState = {
  currentQuestionIndex: 0,
  answers: answers,
};

export default function App() {
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [quizState, setQuizState] = useState(defaultQuizState);
  const onSelctOption = (questionID, optionID) => {
    setQuizState((quizState) => {
      return {
        ...quizState,
        answers: quizState.answers.map((answer) => {
          if (answer.questionID === questionID) {
            return {
              ...answer,
              optionID: optionID,
            };
          }
          return answer;
        }),
      };
    });
    console.log("New Quiz state", quizState);
  };

  const onTimerComplete = () => {
    console.log("Timer completed");
    setQuizCompleted(true);
  };
  const onPreviousButtonClick = () => {
    setQuizState((quizState) => {
      if (quizState.currentQuestionIndex > 0) {
        return {
          ...quizState,
          currentQuestionIndex: quizState.currentQuestionIndex - 1,
        };
      }
      return quizState;
    });
  };
  const onNextButtonClick = () => {
    setQuizState((quizState) => {
      if (quizState.currentQuestionIndex < quizQuestions.length - 1) {
        return {
          ...quizState,
          currentQuestionIndex: quizState.currentQuestionIndex + 1,
        };
      }
      return quizState;
    });
  };
  const currentQuestion = quizQuestions[quizState.currentQuestionIndex];
  const currentQuestionAnswer = quizState.answers.find((answer) => {
    return answer.questionID === currentQuestion.id;
  });

  const onQuesBoxClick = (questionIndex) => {
    setQuizState((quizState) => {
      return {
        ...quizState,
        currentQuestionIndex: questionIndex,
      };
    });
    // console.log("onQuesBoxClick Clicked", number);
  };
  console.log("QuizState", quizState);
  return (
    <div className="App">
      <header>
        <h1 style={{ textAlign: "center" }}>QUIZ</h1>
        <Timer totalTime="00:10:00" onComplete={onTimerComplete} />
      </header>
      {!quizCompleted && (
        <div className="quizBody">
          <aside className="QuestionBox">
            <div
              style={{
                margin: "10px",
                display: "inline-grid",
                gridAutoRows: "1fr",
                gridTemplateColumns: "1fr 1fr 1fr",
              }}
            >
              {quizState.answers.map((answer, index) => (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "60px",
                    height: "60px",
                    background: answer.optionID ? "green" : "#000",
                    color: "#fff",
                    border: "1px solid #fff",
                    cursor: "pointer",
                  }}
                  onClick={() => onQuesBoxClick(index)}
                >
                  {index + 1}
                </div>
              ))}
            </div>
          </aside>
          <div className="QuesAns">
            <div className="QuizContainer">
              <span>
                {quizState.currentQuestionIndex + 1} of {quizQuestions.length}
              </span>
              <Question
                displayQuestion={currentQuestion}
                onSelctOption={onSelctOption}
                currentQuestionAnswer={currentQuestionAnswer}
              />
              <br />
              <div>
                {quizCompleted && <p>Quiz completed</p>}
                {quizState.currentQuestionIndex !== 0 && (
                  <button onClick={onPreviousButtonClick}>Previous</button>
                )}
                {/* <br /> */}
                {quizState.currentQuestionIndex !==
                  quizQuestions.length - 1 && (
                  <button onClick={onNextButtonClick}>Next</button>
                )}
                {/* <br /> */}
                {quizState.currentQuestionIndex == quizQuestions.length - 1 && (
                  <button onClick={null}>Submit</button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      {quizCompleted && (
        <h2 style={{ textAlign: "center", color: "red" }}>TIME UP!!!</h2>
      )}
    </div>
  );
}

// what qeustion should be displayed now?
// is there previous question to this?
// is there next question?
// How many question are there in total?
// what is the current question number?
// what is the user selected answer to the current question?
