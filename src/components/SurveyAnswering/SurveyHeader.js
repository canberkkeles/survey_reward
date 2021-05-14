import React from "react";
import classes from "../Styles/SurveyAnswering.module.css";
const SurveyHeader = (props) => {
  const surveyConductor = props.surveyConductor;
  const questionsRemaining = props.questionsRemaining;
  const title = props.surveyTitle;

  return (
    <div className={classes["header"]}>
      <div className={classes["header__questions"]}>
        <p className={classes["header__questions-remaining"]}>
          {questionsRemaining}
        </p>{" "}
        Questions Remaining
      </div>
      <div className={classes["header__title"]}>{title}</div>
      <div className={classes["header__conductor"]}>
        Conductor: {surveyConductor}
      </div>
    </div>
  );
};
export default SurveyHeader;
