import React, { useState } from "react";
import Navbar from "../UI/Navbar";
import AnswerProgress from "./AnswerProgress";
import { useParams } from "react-router-dom";
import SurveyHeader from "./SurveyHeader";
import QuestionCard from "../UI/QuestionCard";

const SurveyQuestion = (props) => {
  const { id } = useParams();
  const questionCount = 12;
  const [currentQuestion, setCurrentQuestion] = useState(3);
  const accountAddress = props.accountAddress;
  const appName = props.appName;
  const questionText = "How often do you find yourself thinking of suicide?";

  const answeredQuestionHandler = () => {
    setCurrentQuestion((prevQuestion) => prevQuestion + 1);
  };

  return (
    <div>
      <Navbar accountAddress={accountAddress} appName={appName} />
      <AnswerProgress
        questionCount={questionCount}
        currentQuestion={currentQuestion}
      />
      <SurveyHeader />
      <QuestionCard
        questionText={questionText}
        onAnswerQuestion={answeredQuestionHandler}
      />
    </div>
  );
};
export default SurveyQuestion;
