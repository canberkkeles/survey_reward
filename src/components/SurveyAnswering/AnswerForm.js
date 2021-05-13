import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import { green } from "@material-ui/core/colors";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import "../Styles/SurveyAnswering.css";

const save = createMuiTheme({
  palette: {
    primary: green,
  },
});

const AnswerForm = (props) => {
  const [answer, setAnswer] = useState("");

  const submitHandler = (e) => {
    props.onAnswerSubmit(answer);
    e.preventDefault();
  };
  const answerChangeHandler = (e) => {
    setAnswer(e.target.value);
  };
  const questionText = props.questionText;
  return (
    <form onSubmit={submitHandler}>
      <label htmlFor="answer">{questionText}</label>
      <input
        className="input-answer"
        required
        maxLength="32"
        id="answer"
        placeholder="Your answer"
        value={answer}
        onChange={answerChangeHandler}
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
