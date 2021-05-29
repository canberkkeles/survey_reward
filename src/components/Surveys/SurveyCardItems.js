import React from "react";
import SurveyCard from "./SurveyCard";
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
    alignItems: "center",
  },
}));

const SurveyCardItems = (props) => {
  const classes = useStyles();
  const surveys = props.surveys;
  const surveyReward = props.surveyReward;
  const accountAddress = props.accountAddress;
  return (
    <div className={classes.surveyCardContainer}>
      {surveys.map((survey, index) => (
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
      ))}
    </div>
  );
};
export default SurveyCardItems;
