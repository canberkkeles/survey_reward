import React, { useEffect, useState } from "react";
import Web3 from "web3";
import SurveyReward from "../abis/SurveyReward.json";
import Main from "./Main";
import { BrowserRouter as Router, Route } from "react-router-dom";
import SurveyQuestion from "./SurveyAnswering/SurveyAnswering";
import SurveyCreate from "./SurveyCreate/SurveyCreate";
import ProfileSurveys from "./ProfileSurveys/ProfileSurveys";
import SurveyDetails from "./SurveyDetails/SurveyDetails";

function App() {
  const [accountAddress, setAccountAddress] = useState("");
  const [appName, setAppName] = useState("");
  const [surveyReward, setSurveyReward] = useState();
  const [surveys, setSurveys] = useState([]);

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
    const web3 = window.web3;
    const accounts = await web3.eth.requestAccounts();
    setAccountAddress(accounts[0]);

    const networkId = await web3.eth.net.getId();
    const networkData = SurveyReward.networks[networkId];
    if (networkData) {
      const surveyRewardContract = web3.eth.Contract(
        SurveyReward.abi,
        networkData.address
      );
      setSurveyReward(surveyRewardContract);
      const applicationName = await surveyRewardContract.methods.name().call();
      setAppName(applicationName);
      const surveyCount = await surveyRewardContract.methods
        .surveyCount()
        .call();
      for (let i = 0; i < surveyCount; i++) {
        const survey = await surveyRewardContract.methods.surveys(i).call();
        setSurveys((prevState) => [...prevState, survey]);
      }
    } else {
      window.alert("SurveyReward contract not deployed to detected network!");
    }
  }

  return (
    <Router>
      <Route exact path="/">
        <Main
          appName={appName}
          accountAddress={accountAddress}
          surveys={surveys}
        />
      </Route>
      <Route path="/fill/:id">
        <SurveyQuestion appName={appName} accountAddress={accountAddress} />
      </Route>
      <Route path="/create">
        <SurveyCreate appName={appName} accountAddress={accountAddress} />
      </Route>
      <Route path="/profile">
        <ProfileSurveys appName={appName} accountAddress={accountAddress} />
      </Route>
      <Route path="/details/:id">
        <SurveyDetails appName={appName} accountAddress={accountAddress} />
      </Route>
    </Router>
  );
}
export default App;
