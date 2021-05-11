import React from "react";
import "./FilterSurveys.css";
import TextField from "@material-ui/core/TextField";
import Slider from "@material-ui/core/Slider";

const FilterSurveys = (props) => {
  return (
    <div className="surveys-filter">
      &nbsp;
      <p>Filter Surveys</p>
      <div className="surveys-filter__control">
        <TextField label="Title" variant="outlined" />
        <hr></hr>
        <p>Min Price</p>
        <Slider
          valueLabelDisplay="auto"
          max={props.maxPrice}
          defaultValue={0}
        ></Slider>
        <hr></hr>
        <p>Max Price</p>
        <Slider
          valueLabelDisplay="auto"
          defaultValue={props.maxPrice}
          max={props.maxPrice}
        ></Slider>
      </div>
      <p>Question Count</p>
      <TextField label="Question Count" variant="outlined" />
      &nbsp;
    </div>
  );
};
export default FilterSurveys;
