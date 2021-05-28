import React, { useState, useEffect } from "react";
import Navbar from "./UI/Navbar";
import Surveys from "./Surveys/Surveys";

const Main = (props) => {
  const surveyReward = props.surveyReward;
  const surveys = props.surveys;
  const accountAddress = props.accountAddress;
  const appName = props.appName;
  return (
    <React.Fragment>
      <Navbar accountAddress={accountAddress} appName={appName} />
      <Surveys
        surveys={surveys}
        surveyReward={surveyReward}
        accountAddress={accountAddress}
      />
    </React.Fragment>
  );
};

export default Main;
