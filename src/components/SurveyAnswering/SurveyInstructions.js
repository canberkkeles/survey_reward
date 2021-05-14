import React from "react";
import classes from "../Styles/SurveyAnswering.module.css";
const SurveyInstructions = () => {
  return (
    <div className={`${classes["question-card"]} ${classes["instructions"]}`}>
      All data shared is protected.<br></br>
      Every question appears one by one on the page. <br></br>
      Answering the question saves the answer irreversibly.<br></br>
      Rewards are distributed once the survey is completed.<br></br>
      Answers should be concise to match conductor's needs. <br></br>
      Data is stored anonymously(with your address) and therefore answers are
      anonymous.<br></br>
      System detects fraudlent answers, in case of fraudlent activity detection
      all deposit will be transfered to contract.
    </div>
  );
};
export default SurveyInstructions;
