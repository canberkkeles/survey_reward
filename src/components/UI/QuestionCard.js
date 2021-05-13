import React from "react";
import "../SurveyAnswering/SurveyAnswering.css";
import Button from "@material-ui/core/Button";
import { green } from "@material-ui/core/colors";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";

const save = createMuiTheme({
  palette: {
    primary: green,
  },
});

const QuestionCard = () => {
  return (
    <div className="question-card">
      <form>
        <label for="answer">Question</label>
        <input
          className="input-answer"
          required
          maxLength="32"
          id="answer"
          placeholder="Your answer"
        ></input>
        <ThemeProvider theme={save}>
          <Button
            size="large"
            variant="contained"
            color="primary"
            style={{ color: "white" }}
          >
            Submit Answer
          </Button>
        </ThemeProvider>
      </form>
    </div>
  );
};
export default QuestionCard;
