import React from "react";
import SurveyCard from "./UI/SurveyCard";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  surveyCardContainer: {
    flexGrow: 1,
    display: "grid",
    gridTemplateColumns: "repeat(3, 100fr)",
    columnGap: "15%",
    marginLeft: "12%",
    marginRight: "10%",
    marginTop: "2%",
    gridRowGap: "5%",
  },
}));

const SurveyCardItems = (props) => {
  const classes = useStyles();
  const surveys = props.surveys;
  return (
    <div className={classes.surveyCardContainer}>
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
