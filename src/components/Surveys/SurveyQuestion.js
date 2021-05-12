import React from "react";
import Navbar from "../UI/Navbar";
const SurveyQuestion = (props) => {
  const surveyId = props.match.params.id;
  return (
    <div>
      <Navbar />
      <p>Questions for survey with id {surveyId} </p>
    </div>
  );
};
export default SurveyQuestion;
