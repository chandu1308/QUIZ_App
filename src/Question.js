import React from "react";

export default function Question({
  displayQuestion,
  onSelctOption,
  currentQuestionAnswer,
}) {
  const { id, question, options } = displayQuestion;

  return (
    <div className="question-content">
      <h2>{question}</h2>
      <fieldset className="options">
        <legend className="sr-only">Choose one answer</legend>
        {options.map((option, index) => {
          const isSelected = currentQuestionAnswer.optionID === option.id;
          return (
            <label
              className={`option-card${isSelected ? " is-selected" : ""}`}
              key={option.id}
            >
              <input
                type="radio"
                name={id}
                value={option.id}
                checked={isSelected}
                onChange={() => onSelctOption(id, option.id)}
              />
              <span className="option-letter" aria-hidden="true">
                {String.fromCharCode(65 + index)}
              </span>
              <span className="option-label">{option.label}</span>
              <span className="option-indicator" aria-hidden="true" />
            </label>
          );
        })}
      </fieldset>
    </div>
  );
}
