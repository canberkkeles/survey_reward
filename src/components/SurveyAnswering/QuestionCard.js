import React, { useState } from "react";
import FormCard from "../UI/FormCard";
import AnswerForm from "./AnswerForm";

const QuestionCard = (props) => {
  const questionText = props.questionText;
  const [answerSubmitted, setAnswerSubmitted] = useState("");
  const isCompleted = props.completed;

  return (
    <FormCard>
      {isCompleted ? (
        <p>You have completed this survey and reward has been transfered.</p>
      ) : (
        <AnswerForm
          questionText={questionText}
          onAnswerSubmit={props.onAnswerQuestion}
        />
      )}
    </FormCard>
  );
};
export default QuestionCard;
