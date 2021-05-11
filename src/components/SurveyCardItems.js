import React from "react";
import SurveyCard from "./UI/SurveyCard";

const SurveyCardItems = (props) => {
  const surveys = props.surveys;
  return (
    <div>
      {surveys.map((survey) => (
        <SurveyCard
          key={survey.id}
          rewardPool={survey.rewardPool}
          prize={survey.prize}
          title={survey.title}
          description={survey.description}
          questionCount={survey.questionCount}
          currentQuestion={survey.currentQuestion}
        />
      ))}
    </div>
  );
};
export default SurveyCardItems;
