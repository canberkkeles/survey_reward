import React from "react";
import classes from "../Styles/SurveyModal.module.css";
const ModalCard = (props) => {
  return <div className={classes["donate-modal"]}>{props.children}</div>;
};
export default ModalCard;
