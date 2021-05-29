import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import Navbar from "../UI/Navbar";
import AnswerCard from "./AnswerCard";
import SurveyInfo from "./SurveyInfo";
import SurveyReward from "../../abis/SurveyReward.json";
import Web3 from "web3";
const SurveyDetails = (props) => {
  const { id } = useParams();

  const [questionCount, setQuestionCount] = useState(0);
  const [prizePool, setPrizePool] = useState(0);
  const [title, setTitle] = useState("");
  const [questions, setQuestions] = useState([]);

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
      const survey = await surveyRewardContract.methods.surveys(id).call();
      setTitle(survey[0]);
      const questionCount = survey[2].toNumber();
      setQuestionCount(questionCount);
      setPrizePool(survey[5].toNumber());

      const questions = await surveyRewardContract.methods
        .getAllQuestions(id)
        .call({ from: sessionStorage.getItem("address") });

      setQuestions(
        questions.map((question, index) => {
          return window.web3.utils.hexToAscii(question).replace(/\0/g, "");
        })
      );
    } else {
      window.alert("SurveyReward contract not deployed to detected network!");
    }
  }

  return (
    <React.Fragment>
      <Navbar appName={props.appName} accountAddress={props.accountAddress} />
      <SurveyInfo
        questionCount={questionCount}
        prizePool={prizePool}
        title={title}
      />
      {questions.map((question, index) => (
        <AnswerCard
          question={question}
          key={index}
          questionId={index}
          surveyId={id}
        />
      ))}
    </React.Fragment>
  );
};
export default SurveyDetails;
