import React, { useState } from "react";

const Question = ({
  displayQuestion,
  onSelctOption,
  currentQuestionAnswer,
}) => {
  console.log("displayQuestion", displayQuestion);
  console.log("currentQuestionAnswer", currentQuestionAnswer);

  const { id, question, options } = displayQuestion;
  return (
    <div style={{ width: "100%" }} key={id}>
      <h3>{question}</h3>
      <div className="options">
        {options.map((option) => {
          return (
            <label style={{ fontSize: "20px" }} key={option.id}>
              <input
                type="radio"
                name={id}
                checked={currentQuestionAnswer.optionID == option.id}
                onChange={(e) => {
                  onSelctOption(id, option.id);
                }}
              />
              {option.label}
            </label>
          );
        })}
      </div>
    </div>
  );
};

export default Question;
