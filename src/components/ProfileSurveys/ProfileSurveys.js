import React, { useState, useEffect } from "react";
import Navbar from "../UI/Navbar";
import SurveyCardItems from "./SurveyCardItems";
import SurveyFilter from "./SurveyFilter";

const ProfileSurveys = (props) => {
  const [titleFilter, setTitleFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState(true);

  const handleTitleFilterChange = (title) => {
    setTitleFilter(title);
  };

  const handleStatusFilterChange = (filter) => {
    setStatusFilter(filter);
  };

  const filteredSurveys = props.surveys.filter((survey) => {
    console.log(survey);
    return (
      survey[0].toUpperCase().indexOf(titleFilter.toUpperCase()) === 0 &&
      survey[3] === statusFilter &&
      window.web3.utils.hexToAscii(survey[1]) ===
        window.web3.utils.hexToAscii(sessionStorage.getItem("address"))
    );
  });

  return (
    <React.Fragment>
      <Navbar appName={props.appName} accountAddress={props.accountAddress} />
      <SurveyFilter
        onTitleChange={handleTitleFilterChange}
        onStatusChange={handleStatusFilterChange}
      />
      <SurveyCardItems
        surveys={filteredSurveys}
        surveyReward={props.surveyReward}
      />
    </React.Fragment>
  );
};
export default ProfileSurveys;
