import React from "react";
import SurveyCard from "./SurveyCard";
import styles from "../Styles/Profile.module.css";
const SurveyCardItems = (props) => {
  const surveys = props.surveys;
  return (
    <div className={styles["survey-card-container"]}>
      {surveys.map((survey) => (
        <SurveyCard
          key={survey.id}
          surveyId={survey.id}
          rewardPool={survey.rewardPool}
          prize={survey.prize}
          title={survey.title}
          description={survey.description}
          questionCount={survey.questionCount}
          currentQuestion={survey.currentQuestion}
          isOpen={survey.open}
        />
      ))}
    </div>
  );
};
export default SurveyCardItems;
