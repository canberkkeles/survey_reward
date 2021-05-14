import React, { useState, useRef } from "react";
import Button from "@material-ui/core/Button";
import { lightBlue } from "@material-ui/core/colors";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import classes from "../Styles/SurveyAnswering.module.css";

const save = createMuiTheme({
  palette: {
    primary: lightBlue,
  },
});

const AnswerForm = (props) => {
  const answerInput = useRef();

  const submitHandler = (e) => {
    props.onAnswerSubmit(answerInput.current.value);
    answerInput.current.value = "";
    e.preventDefault();
  };
  const questionText = props.questionText;
  return (
    <form onSubmit={submitHandler} autoComplete="off">
      <label htmlFor="answer">{questionText}</label>
      <input
        className={classes["input-answer"]}
        required
        maxLength="32"
        id="answer"
        placeholder="Your answer"
        ref={answerInput}
      ></input>
      <ThemeProvider theme={save}>
        <Button
          size="large"
          variant="contained"
          color="primary"
          style={{ color: "white" }}
          type="submit"
        >
          Submit Answer
        </Button>
      </ThemeProvider>
    </form>
  );
};
export default AnswerForm;
