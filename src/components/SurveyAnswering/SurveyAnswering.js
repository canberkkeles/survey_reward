import React, { useEffect, useState } from "react";
import Navbar from "../UI/Navbar";
import AnswerProgress from "./AnswerProgress";
import { useParams } from "react-router-dom";
import SurveyHeader from "./SurveyHeader";
import QuestionCard from "./QuestionCard";
import InstructionsCard from "../UI/InstructionsCard";
import SurveyReward from "../../abis/SurveyReward.json";
import Web3 from "web3";

const SurveyAnswering = (props) => {
  const { id } = useParams();
  const [surveyReward, setSurveyReward] = useState(null);
  const [questionCount, setQuestionCount] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [surveyTitle, setSurveyTitle] = useState("");
  const [questionText, setQuestionText] = useState("");
  const [conductor, setConductor] = useState("");

  const accountAddress = props.accountAddress;
  const appName = props.appName;

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
      const survey = await surveyRewardContract.methods.surveys(id).call();
      const checkpoint = await surveyRewardContract.methods
        .getCheckpoint(id)
        .call({ from: accountAddress });
      console.log(checkpoint.toNumber());
      setQuestionCount(survey[2].toNumber());
      setCurrentQuestion(checkpoint.toNumber());
      setSurveyTitle(survey[0]);
      setConductor(survey[1]);
      const question = await surveyRewardContract.methods
        .getQuestionFromSurvey(id, checkpoint)
        .call();
      setQuestionText(window.web3.utils.hexToAscii(question));
    } else {
      window.alert("SurveyReward contract not deployed to detected network!");
    }
  }

  const answeredQuestionHandler = (answer) => {
    if (currentQuestion === 0) {
      surveyReward.methods
        .answerQuestion(
          id,
          currentQuestion,
          window.web3.utils.asciiToHex(answer)
        )
        .send({ from: accountAddress, value: 200 })
        .once("receipt", (receipt) => console.log(receipt));
    } else {
      surveyReward.methods
        .answerQuestion(
          id,
          currentQuestion,
          window.web3.utils.asciiToHex(answer)
        )
        .send({ from: accountAddress })
        .once("receipt", (receipt) => console.log(receipt));
    }
  };

  return (
    <React.Fragment>
      <Navbar accountAddress={accountAddress} appName={appName} />
      <AnswerProgress
        questionCount={questionCount}
        currentQuestion={currentQuestion}
      />
      <SurveyHeader
        questionsRemaining={questionCount - currentQuestion}
        surveyTitle={surveyTitle}
        surveyConductor={conductor}
      />
      <InstructionsCard>
        {" "}
        All data shared is protected.<br></br>
        Every question appears one by one on the page. <br></br>
        Answering the question saves the answer irreversibly.<br></br>
        Rewards are distributed once the survey is completed.<br></br>
        Answers should be concise to match conductor's needs. <br></br>
        Data is stored anonymously(with your address) and therefore answers are
        anonymous.<br></br>
        System detects fraudlent answers, in case of fraudlent activity
        detection all deposit will be transfered to contract.
      </InstructionsCard>

      <QuestionCard
        questionText={questionText}
        onAnswerQuestion={answeredQuestionHandler}
      />
    </React.Fragment>
  );
};
export default SurveyAnswering;
