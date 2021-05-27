import React, { useState } from "react";
import SurveyCardItems from "./SurveyCardItems";
import FilterSurveys from "./FilterSurveys";

const Surveys = (props) => {
  const surveys = props.surveys;
  const maxPrize = Math.max(...surveys.map((survey) => +survey[4].toNumber()));
  const maxQuestionCount = Math.max(
    ...surveys.map((survey) => +survey[2].toNumber())
  );
  const [titleFilter, setTitleFilter] = useState("");
  const [minPrizeFilter, setMinPrizeFilter] = useState(0);
  const [maxPrizeFilter, setMaxPrizeFilter] = useState(400); // TODO:PROBLEMATIC
  const [questionCountFilter, setQuestionCountFilter] = useState(2); // TODO:PROBLEMATIC
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
      +survey[2].toNumber() <= questionCountFilter
    );
  });
  console.log(filteredSurveys);

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
