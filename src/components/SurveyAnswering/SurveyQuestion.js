import React from "react";
import Navbar from "../UI/Navbar";
import AnswerProgress from "./AnswerProgress";
import { useParams } from "react-router-dom";
import SurveyHeader from "./SurveyHeader";
import QuestionCard from "../UI/QuestionCard";

const SurveyQuestion = (props) => {
  const { id } = useParams();
  const accountAddress = props.accountAddress;
  const appName = props.appName;
  return (
    <div>
      <Navbar accountAddress={accountAddress} appName={appName} />
      <AnswerProgress />
      <SurveyHeader />
      <QuestionCard />
    </div>
  );
};
export default SurveyQuestion;
