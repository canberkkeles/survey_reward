import React, { useState } from "react";
import Navbar from "../UI/Navbar";
import AnswerProgress from "./AnswerProgress";
import { useParams } from "react-router-dom";
import SurveyHeader from "./SurveyHeader";
import QuestionCard from "./QuestionCard";
import InstructionsCard from "../UI/InstructionsCard";

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
      <InstructionsCard>
        {" "}
        All data shared is protected.<br></br>
        Every question appears one by one on the page. <br></br>
        Answering the question saves the answer irreversibly.<br></br>
        Rewards are distributed once the survey is completed.<br></br>
        Answers should be concise to match conductor's needs. <br></br>
        Data is stored anonymously(with your address) and therefore answers are
        anonymous.<br></br>
        System detects fraudlent answers, in case of fraudlent activity
        detection all deposit will be transfered to contract.
      </InstructionsCard>

      <QuestionCard
        questionText={questionText}
        onAnswerQuestion={answeredQuestionHandler}
      />
    </React.Fragment>
  );
};
export default SurveyQuestion;
