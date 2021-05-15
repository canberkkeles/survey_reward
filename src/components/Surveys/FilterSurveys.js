import React from "react";
import classes from "../Styles/FilterSurveys.module.css";
import TextField from "@material-ui/core/TextField";
import Slider from "@material-ui/core/Slider";

const FilterSurveys = (props) => {
  const maxPrize = props.maxPrize;
  const maxQuestionCount = props.maxQuestionCount;
  const titleChangeHandler = (event) => {
    props.onTitleFilterChange(event.target.value);
  };

  const minPrizeChangeHandler = (event, value) => {
    props.onMinPrizeFilterChange(value);
  };

  const maxPrizeChangeHandler = (event, value) => {
    props.onMaxPrizeFilterChange(value);
  };

  const questionCountChangeHandler = (event) => {
    if (event.target.value === "") {
      props.onQuestionCountFilterChange(+maxQuestionCount);
    } else props.onQuestionCountFilterChange(event.target.value);
  };

  return (
    <div className={classes["surveys-filter"]}>
      &nbsp;
      <p>Filter Surveys</p>
      <div className={classes["surveys-filter__control"]}>
        <TextField label="Title" onChange={titleChangeHandler} />
        <hr></hr>
        <p>Min Prize</p>
        <Slider
          valueLabelDisplay="auto"
          max={maxPrize}
          defaultValue={0}
          onChange={minPrizeChangeHandler}
        ></Slider>
        <hr></hr>
        <p>Max Prize</p>
        <Slider
          valueLabelDisplay="auto"
          defaultValue={maxPrize}
          max={maxPrize}
          onChange={maxPrizeChangeHandler}
        ></Slider>
      </div>
      <p>Max Question Count</p>
      <TextField
        type="number"
        label="Question Count"
        onChange={questionCountChangeHandler}
      />
      &nbsp;
    </div>
  );
};
export default FilterSurveys;
