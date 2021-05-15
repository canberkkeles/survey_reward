import React from "react";
import classes from "../Styles/SurveyCreate.module.css";

const SurveyCreateInfo = (props) => {
  return (
    <div>
      <div className={classes["info-question"]}>
        <p className={classes["info-question__remaining"]}>5</p> Questions added
        to the survey.
      </div>
      <div className={classes["info-participant"]}>
        <p className={classes["info-question__remaining"]}>10</p> Participants
        are expected.
      </div>
    </div>
  );
};
export default SurveyCreateInfo;
