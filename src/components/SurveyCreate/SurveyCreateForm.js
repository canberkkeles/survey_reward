import React, { useEffect, useState } from "react";
import classes from "../Styles/SurveyCreate.module.css";
import Button from "@material-ui/core/Button";
import { lightBlue, red } from "@material-ui/core/colors";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import Web3 from "web3";
import SurveyReward from "../../abis/SurveyReward.json";
const save = createMuiTheme({
  palette: {
    primary: lightBlue,
    secondary: red,
  },
});

const SurveyCreateForm = (props) => {
  const accountAddress = props.accountAddress;
  const [surveyReward, setSurveyReward] = useState(null);

  const [questions, setQuestions] = useState([]);
  const [formData, setFormData] = useState({});

  useEffect(async () => {
    await loadWeb3();
    await loadBlockchainData();
  }, []);
  async function loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable;
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
    }
  }
  async function loadBlockchainData() {
    const networkId = await window.web3.eth.net.getId();
    const networkData = SurveyReward.networks[networkId];
    if (networkData) {
      const surveyRewardContract = window.web3.eth.Contract(
        SurveyReward.abi,
        networkData.address
      );
      setSurveyReward(surveyRewardContract);
    } else {
      window.alert("SurveyReward contract not deployed to detected network!");
    }
  }
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

  const addSurveyHandler = async (event) => {
    const formSubmitData = { ...formData, questionCount: questions.length + 1 };
    const { questionCount } = formSubmitData;
    const questionKeys = [];
    for (let i = 1; i <= questionCount; i++) {
      questionKeys.push(`question${i}`);
    }
    let surveyData = {};
    let surveyQuestionsData = [];
    for (const property in formSubmitData) {
      if (property.indexOf("question") === -1) {
        surveyData[property] = formSubmitData[property];
      } else {
        if (questionKeys.indexOf(property) > -1) {
          surveyQuestionsData.push(
            window.web3.utils.asciiToHex(formSubmitData[property])
          );
        }
      }
    }
    await surveyReward.methods
      .createSurvey(
        surveyData["title"],
        +surveyData["prize"],
        surveyData["description"],
        surveyQuestionsData
      )
      .send({ from: accountAddress, value: +surveyData["balance"] })
      .once("receipt", (receipt) => {});
    event.preventDefault();
  };
  return (
    <form autoComplete="off" onSubmit={addSurveyHandler}>
      <br></br>
      <label htmlFor="title">Survey Title</label>
      <input
        className={classes["input-answer"]}
        required
        id="title"
        name="title"
        placeholder="Title"
        onChange={onChangeHandler}
      ></input>
      <br></br>
      <br></br>
      <label htmlFor="title">Survey Description</label>
      <input
        className={classes["input-answer"]}
        required
        id="description"
        name="description"
        placeholder="Description"
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
