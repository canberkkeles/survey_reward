import React, { useState } from "react";
import classes from "../Styles/SurveyAnswering.module.css";
import AnswerForm from "./AnswerForm";

const QuestionCard = (props) => {
  const questionText = props.questionText;
  const [answerSubmitted, setAnswerSubmitted] = useState("");

  const answerSubmitHandler = (answer) => {
    setAnswerSubmitted(answer);
    props.onAnswerQuestion();
  };

  return (
    <div className={classes["question-card"]}>
      <AnswerForm
        questionText={questionText}
        onAnswerSubmit={answerSubmitHandler}
      />
      <p>{answerSubmitted === "" ? "" : `Your answer is ${answerSubmitted}`}</p>
    </div>
  );
};
export default QuestionCard;
