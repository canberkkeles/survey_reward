import React from "react";
import { useParams } from "react-router";
import Navbar from "../UI/Navbar";
import AnswerCard from "./AnswerCard";
import SurveyInfo from "./SurveyInfo";
const SurveyDetails = (props) => {
  const { id } = useParams();
  const questionCount = "5";
  const prizePool = "500";
  return (
    <React.Fragment>
      <Navbar appName={props.appName} accountAddress={props.accountAddress} />
      <SurveyInfo questionCount={questionCount} prizePool={prizePool} />
      <AnswerCard />
      <AnswerCard />
    </React.Fragment>
  );
};
export default SurveyDetails;
