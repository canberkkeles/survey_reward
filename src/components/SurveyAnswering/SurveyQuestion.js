import React, { useState } from "react";
import Navbar from "../UI/Navbar";
import AnswerProgress from "./AnswerProgress";
import { useParams } from "react-router-dom";
import SurveyHeader from "./SurveyHeader";
import QuestionCard from "../UI/QuestionCard";
import SurveyInstructions from "./SurveyInstructions";

const SurveyQuestion = (props) => {
  const { id } = useParams();
  const questionCount = 12;
  const [currentQuestion, setCurrentQuestion] = useState(3);
  const [questionsRemaining, setQuestionsRemaining] = useState(9);
  const accountAddress = props.accountAddress;
  const appName = props.appName;
  const surveyTitle = "Emotional Studies";
  const questionText = "How often do you find yourself thinking of suicide?";
  const conductor = "0x9818101924771cC285D34029F9E9b7aaA87f9569";

  const answeredQuestionHandler = () => {
    setCurrentQuestion((prevQuestion) => prevQuestion + 1);
    setQuestionsRemaining((prevRemaining) =>
      prevRemaining >= 1 ? prevRemaining - 1 : 0
    );
  };

  return (
    <React.Fragment>
      <Navbar accountAddress={accountAddress} appName={appName} />
      <AnswerProgress
        questionCount={questionCount}
        currentQuestion={currentQuestion}
      />
      <SurveyHeader
        questionsRemaining={questionsRemaining}
        surveyTitle={surveyTitle}
        surveyConductor={conductor}
      />
      <SurveyInstructions />
      <QuestionCard
        questionText={questionText}
        onAnswerQuestion={answeredQuestionHandler}
      />
    </React.Fragment>
  );
};
export default SurveyQuestion;
