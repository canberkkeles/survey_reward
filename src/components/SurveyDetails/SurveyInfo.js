import React from "react";
import classes from "../Styles/SurveyCreate.module.css";
import InstructionsCard from "../UI/InstructionsCard";
const SurveyInfo = (props) => {
  return (
    <div>
      <div className={classes["info-question"]}>
        <p className={classes["info-question__remaining"]}>
          {props.questionCount}
        </p>{" "}
        Questions are in the survey.
      </div>
      <div className={classes["info-participant"]}>
        <p className={classes["info-question__remaining"]}>{props.prizePool}</p>{" "}
        Remaining balance.
      </div>
      <InstructionsCard>Title</InstructionsCard>
    </div>
  );
};
export default SurveyInfo;