import React, { useState } from "react";
import "../Styles/SurveyAnswering.css";
import AnswerForm from "../SurveyAnswering/AnswerForm";

const QuestionCard = (props) => {
  const questionText = props.questionText;
  const [answerSubmitted, setAnswerSubmitted] = useState("");

  const answerSubmitHandler = (answer) => {
    setAnswerSubmitted(answer);
    props.onAnswerQuestion();
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
