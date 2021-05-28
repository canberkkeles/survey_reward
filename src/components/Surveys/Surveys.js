import React, { useEffect, useState } from "react";
import SurveyCardItems from "./SurveyCardItems";
import FilterSurveys from "./FilterSurveys";

const Surveys = (props) => {
  const accountAddress = props.accountAddress;
  const surveys = props.surveys;
  const surveyReward = props.surveyReward;
  const maxPrize = Math.max(...surveys.map((survey) => +survey[4].toNumber()));
  const maxQuestionCount = Math.max(
    ...surveys.map((survey) => +survey[2].toNumber())
  );

  const [titleFilter, setTitleFilter] = useState("");
  const [minPrizeFilter, setMinPrizeFilter] = useState(0);
  const [maxPrizeFilter, setMaxPrizeFilter] = useState(0);
  const [questionCountFilter, setQuestionCountFilter] = useState(0);

  useEffect(() => {
    setMaxPrizeFilter(maxPrize);
    setQuestionCountFilter(maxQuestionCount);
  }, [surveys]);

  const titleFilterChangeHandler = (filter) => {
    setTitleFilter(filter);
  };
  const minPrizeFilterChangeHandler = (filter) => {
    setMinPrizeFilter(filter);
  };
  const maxPrizeFilterChangeHandler = (filter) => {
    setMaxPrizeFilter(filter);
  };
  const questionCountFilterChangeHandler = (filter) => {
    setQuestionCountFilter(filter);
  };

  const filteredSurveys = surveys.filter((survey) => {
    return (
      survey[0].toUpperCase().indexOf(titleFilter.toUpperCase()) === 0 &&
      (+survey[4].toNumber() >= minPrizeFilter &&
        +survey[4].toNumber() <= maxPrizeFilter) &&
      +survey[2].toNumber() >= +questionCountFilter
    );
  });

  return (
    <React.Fragment>
      <FilterSurveys
        maxPrize={maxPrize}
        maxQuestionCount={maxQuestionCount}
        onTitleFilterChange={titleFilterChangeHandler}
        onMinPrizeFilterChange={minPrizeFilterChangeHandler}
        onMaxPrizeFilterChange={maxPrizeFilterChangeHandler}
        onQuestionCountFilterChange={questionCountFilterChangeHandler}
      />
      <SurveyCardItems
        surveys={filteredSurveys}
        surveyReward={surveyReward}
        accountAddress={accountAddress}
      />
    </React.Fragment>
  );
};
export default Surveys;
