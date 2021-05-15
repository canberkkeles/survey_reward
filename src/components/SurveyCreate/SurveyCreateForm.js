import React from "react";
import classes from "../Styles/SurveyCreate.module.css";
import Button from "@material-ui/core/Button";
import { lightBlue } from "@material-ui/core/colors";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
const save = createMuiTheme({
  palette: {
    primary: lightBlue,
  },
});
const SurveyCreateForm = () => {
  return (
    <form autoComplete="off">
      <br></br>
      <label htmlFor="title">Survey Title</label>
      <input
        className={classes["input-answer"]}
        required
        maxLength="32"
        id="title"
        placeholder="Title"
      ></input>
      <br></br>
      <br></br>
      <label htmlFor="prize">Survey Prize In Wei</label>
      <input
        className={classes["input-answer"]}
        required
        maxLength="32"
        id="prize"
        placeholder="Prize"
        type="number"
        min="0"
      ></input>
      <br></br>
      <br></br>
      <label htmlFor="balance">Survey Balance In Wei</label>
      <input
        className={classes["input-answer"]}
        required
        maxLength="32"
        id="balance"
        placeholder="Balance"
        type="number"
        min="0"
      ></input>
      <br></br>
      <br></br>
      <label htmlFor="question">Question</label>
      <input
        className={classes["input-answer"]}
        required
        maxLength="32"
        id="question"
        placeholder="Question"
      ></input>
      <ThemeProvider theme={save}>
        <Button
          size="large"
          variant="contained"
          color="primary"
          style={{
            color: "white",
            marginTop: "2%",
            marginBottom: "2%",
            marginRight: "2%",
            float: "right",
          }}
          type="submit"
        >
          Save Survey
        </Button>
      </ThemeProvider>
    </form>
  );
};
export default SurveyCreateForm;
