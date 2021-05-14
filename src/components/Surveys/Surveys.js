import React, { useState } from "react";
import SurveyCardItems from "./SurveyCardItems";
import FilterSurveys from "./FilterSurveys";

const Surveys = (props) => {
  const surveys = props.surveys;
  const maxPrize = Math.max(...surveys.map((survey) => +survey.prize));
  const maxQuestionCount = Math.max(
    ...surveys.map((survey) => +survey.questionCount)
  );

  const [titleFilter, setTitleFilter] = useState("");
  const [minPrizeFilter, setMinPrizeFilter] = useState(0);
  const [maxPrizeFilter, setMaxPrizeFilter] = useState(maxPrize);
  const [questionCountFilter, setQuestionCountFilter] = useState(
    maxQuestionCount
  );

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
      survey.title.toUpperCase().indexOf(titleFilter.toUpperCase()) === 0 &&
      (+survey.prize >= minPrizeFilter && +survey.prize <= maxPrizeFilter) &&
      +survey.questionCount <= questionCountFilter
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
      <SurveyCardItems surveys={filteredSurveys} />
    </React.Fragment>
  );
};
export default Surveys;
