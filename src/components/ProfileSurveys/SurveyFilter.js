import React, { useState } from "react";
import classes from "../Styles/FilterSurveys.module.css";
import TextField from "@material-ui/core/TextField";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";

const ProfileSurveyFilter = (props) => {
  const [statusFilter, setStatusFilter] = useState("open");
  const handleTitleChange = (event) => {
    props.onTitleChange(event.target.value);
  };
  const handleStatusChange = (event) => {
    if (event.target.value === "open") {
      props.onStatusChange(true);
      setStatusFilter("open");
    } else if (event.target.value === "closed") {
      props.onStatusChange(false);
      setStatusFilter("closed");
    }
  };
  return (
    <div className={classes["surveys-filter"]}>
      &nbsp;
      <p>Filter Surveys</p>
      <div className={classes["surveys-filter__control"]}>
        <TextField label="Title" onChange={handleTitleChange} />
        <hr></hr>
        <p>Survey Status</p>

        <FormControl component="fieldset" onChange={handleStatusChange}>
          <RadioGroup aria-label="status" name="status" value={statusFilter}>
            <FormControlLabel value="open" control={<Radio />} label="Open" />
            <FormControlLabel
              value="closed"
              control={<Radio />}
              label="Closed"
            />
          </RadioGroup>
        </FormControl>
      </div>
    </div>
  );
};
export default ProfileSurveyFilter;
