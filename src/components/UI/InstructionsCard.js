import React from "react";
import classes from "../Styles/SurveyAnswering.module.css";
const InstructionsCard = (props) => {
  return (
    <div className={`${classes["question-card"]} ${classes["instructions"]}`}>
      {props.children}
    </div>
  );
};
export default InstructionsCard;
