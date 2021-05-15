import React, { useState } from "react";
import classes from "../Styles/SurveyCreate.module.css";
import Button from "@material-ui/core/Button";
import { lightBlue, red } from "@material-ui/core/colors";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
const save = createMuiTheme({
  palette: {
    primary: lightBlue,
    secondary: red,
  },
});

const SurveyCreateForm = (props) => {
  const [questions, setQuestions] = useState([]);
  const [formData, setFormData] = useState({});

  const addQuestionHandler = () => {
    setQuestions((prevState) => [...prevState, 0]);
    props.onQuestionCountChange(1);
  };
  const removeQuestionHandler = () => {
    setQuestions((prevState) => prevState.slice(0, -1));
    props.onQuestionCountChange(-1);
  };

  const onChangeHandler = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
    if (event.target.name === "prize") {
      props.onPrizeChange(event.target.value);
    } else if (event.target.name === "balance") {
      props.onBalanceChange(event.target.value);
    }
  };

  const addSurveyHandler = (event) => {
    const finalData = { ...formData, questionCount: questions.length + 1 };
    console.log(finalData);
    event.preventDefault();
  };
  return (
    <form autoComplete="off" onSubmit={addSurveyHandler}>
      <br></br>
      <label htmlFor="title">Survey Title</label>
      <input
        className={classes["input-answer"]}
        required
        maxLength="32"
        id="title"
        name="title"
        placeholder="Title"
        onChange={onChangeHandler}
      ></input>
      <br></br>
      <br></br>
      <label htmlFor="prize">Survey Prize In Wei</label>
      <input
        className={classes["input-answer"]}
        required
        maxLength="32"
        id="prize"
        name="prize"
        placeholder="Prize"
        type="number"
        min="0"
        onChange={onChangeHandler}
      ></input>
      <br></br>
      <br></br>
      <label htmlFor="balance">Survey Balance In Wei</label>
      <input
        className={classes["input-answer"]}
        required
        maxLength="32"
        id="balance"
        name="balance"
        placeholder="Balance"
        type="number"
        min="0"
        onChange={onChangeHandler}
      ></input>
      <br></br>
      <br></br>
      <label htmlFor="question">Question #1</label>
      <input
        className={classes["input-answer"]}
        required
        maxLength="32"
        id="question"
        name="question1"
        placeholder="Question"
        onChange={onChangeHandler}
      ></input>
      <br></br>
      <br></br>
      {questions.map((element, index) => (
        <div key={index}>
          <label htmlFor="question">{`Question #${index + 2}`}</label>
          <input
            className={classes["input-answer"]}
            required
            maxLength="32"
            id="question"
            name={`question${index + 2}`}
            placeholder="Question"
            onChange={onChangeHandler}
          ></input>
          <br></br>
          <br></br>
        </div>
      ))}
      <ThemeProvider theme={save}>
        <div>
          <Button
            size="large"
            variant="contained"
            color="primary"
            style={{
              color: "white",
              marginTop: "2%",
              marginBottom: "2%",
              marginLeft: "2%",
              float: "left",
            }}
            onClick={addQuestionHandler}
          >
            Add Question
          </Button>
          <Button
            size="large"
            variant="contained"
            color="secondary"
            style={{
              color: "white",
              marginTop: "2%",
              marginBottom: "2%",
              marginLeft: "2%",
              float: "left",
            }}
            onClick={removeQuestionHandler}
          >
            Remove Question
          </Button>
        </div>

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
