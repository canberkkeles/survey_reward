import React from "react";
import classes from "../Styles/SurveyAnswering.module.css";
const FormCard = (props) => {
  return <div className={classes["question-card"]}>{props.children}</div>;
};
export default FormCard;
