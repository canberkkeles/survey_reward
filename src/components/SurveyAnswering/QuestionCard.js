import React, { useState } from "react";
import FormCard from "../UI/FormCard";
import AnswerForm from "./AnswerForm";

const QuestionCard = (props) => {
  const questionText = props.questionText;
  const [answerSubmitted, setAnswerSubmitted] = useState("");

  // const answerSubmitHandler = (answer) => {
  //   setAnswerSubmitted(answer);
  //   props.onAnswerQuestion();
  // };

  return (
    <FormCard>
      <AnswerForm
        questionText={questionText}
        onAnswerSubmit={props.onAnswerQuestion}
      />
      <p>{answerSubmitted === "" ? "" : `Your answer is ${answerSubmitted}`}</p>
    </FormCard>
  );
};
export default QuestionCard;
