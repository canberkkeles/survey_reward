import React from "react";
import SurveyCard from "./SurveyCard";
import styles from "../Styles/Profile.module.css";
const SurveyCardItems = (props) => {
  const surveys = props.surveys;
  const surveyReward = props.surveyReward;
  const accountAddress = props.accountAddress;
  return (
    <div className={styles["survey-card-container"]}>
      {surveys.map((survey, index) => {
        return (
          <SurveyCard
            key={survey.id}
            surveyId={survey.id}
            rewardPool={survey[5].toNumber()}
            prize={survey[4].toNumber()}
            title={survey[0]}
            description={survey[6]}
            questionCount={survey[2].toNumber()}
            currentQuestion={survey.checkpoint}
            isOpen={survey[3]}
            conductor={survey[1]}
            surveyReward={surveyReward}
            accountAddress={accountAddress}
          />
        );
      })}
    </div>
  );
};
export default SurveyCardItems;
