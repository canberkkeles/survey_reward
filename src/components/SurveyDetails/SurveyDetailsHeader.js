import React from "react";
import classes from "../Styles/SurveyAnswering.module.css";

const SurveyDetailsHeader = (props) => {
  const Balance = 500;
  const questionsRemaining = props.questionsRemaining;
  const title = props.surveyTitle;

  return (
    <div className={classes["header"]}>
      <div className={classes["header__questions"]}>
        <p className={classes["header__questions-remaining"]}>
          {questionsRemaining}
        </p>{" "}
        Questions In the Survey
      </div>
      <div className={classes["header__title"]}>{title}</div>
      <div className={classes["header__conductor"]}>
        <p className={classes["header__questions-remaining"]}>
            {Balance}
        </p> {" "}
        Is Your Remaining Balance.
      </div>
    </div>
  );
};
export default SurveyDetailsHeader;