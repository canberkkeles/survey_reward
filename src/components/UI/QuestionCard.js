import React, { useState } from "react";
import "../Styles/SurveyAnswering.css";
import AnswerForm from "../SurveyAnswering/AnswerForm";

const QuestionCard = () => {
  const questionText = "How often do you find yourself thinking of suicide?";
  const [answerSubmitted, setAnswerSubmitted] = useState("");

  const answerSubmitHandler = (answer) => {
    setAnswerSubmitted(answer);
  };

  return (
    <div className="question-card">
      <AnswerForm
        questionText={questionText}
        onAnswerSubmit={answerSubmitHandler}
      />
      <p>{answerSubmitted === "" ? "" : `Your answer is ${answerSubmitted}`}</p>
    </div>
  );
};
export default QuestionCard;
