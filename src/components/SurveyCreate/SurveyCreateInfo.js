import React from "react";
import classes from "../Styles/SurveyCreate.module.css";

const SurveyCreateInfo = (props) => {
  const questionCount = props.questionCount;
  const participantCount =
    +props.prize === 0 ? 0 : Math.round(+props.balance / +props.prize);
  return (
    <div>
      <div className={classes["info-question"]}>
        <p className={classes["info-question__remaining"]}>{questionCount}</p>{" "}
        Questions added to the survey.
      </div>
      <div className={classes["info-participant"]}>
        <p className={classes["info-question__remaining"]}>
          {participantCount}
        </p>{" "}
        Participants are expected.
      </div>
    </div>
  );
};
export default SurveyCreateInfo;
