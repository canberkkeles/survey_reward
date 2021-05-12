import React from "react";
import Navbar from "../UI/Navbar";
import { useParams } from "react-router-dom";
const SurveyQuestion = (props) => {
  const { id } = useParams();
  const accountAddress = props.accountAddress;
  const appName = props.appName;
  return (
    <div>
      <Navbar accountAddress={accountAddress} appName={appName} />
      <p>Questions for survey with id {id} </p>
    </div>
  );
};
export default SurveyQuestion;
