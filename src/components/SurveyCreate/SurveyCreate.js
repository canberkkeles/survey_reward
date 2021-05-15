import React, { useState } from "react";
import Navbar from "../UI/Navbar";
import InstructionsCard from "../UI/InstructionsCard";
import FormCard from "../UI/FormCard";
import SurveyCreateInfo from "./SurveyCreateInfo";
import SurveyCreateForm from "./SurveyCreateForm";

const SurveyCreate = (props) => {
  const [questionCount, setQuestionCount] = useState(1);
  const [prize, setPrize] = useState(0);
  const [balance, setBalance] = useState(0);

  const questionCountHandler = (value) => {
    setQuestionCount((prevState) =>
      prevState + value >= 1 ? prevState + value : 1
    );
  };

  const prizeChangeHandler = (prize) => {
    setPrize(+prize);
  };

  const balanceChangeHandler = (balance) => {
    setBalance(+balance);
  };

  return (
    <React.Fragment>
      <Navbar appName={props.appName} accountAddress={props.accountAddress} />
      <SurveyCreateInfo
        questionCount={questionCount}
        balance={balance}
        prize={prize}
      />
      <InstructionsCard>
        In order to prepare a survey, title, prize and balance should be set.
        <br></br>
        After setting necessary information question should be entered.<br></br>
        Existence of at least one question is a must. <br></br>
        More questions may be added using the Add Question button.<br></br>
        Likewise last added question can be removed using Remove Question
        button.
        <br></br>
        When the survey is ready, click Save Survey button.<br></br>
        Once the survey is added, no change can be done.<br></br>
        At the top of the page, program automatically calculates the question
        amount and expected participant amount with the help of data received.
      </InstructionsCard>
      <FormCard>
        <SurveyCreateForm
          onQuestionCountChange={questionCountHandler}
          onPrizeChange={prizeChangeHandler}
          onBalanceChange={balanceChangeHandler}
        />
      </FormCard>
    </React.Fragment>
  );
};
export default SurveyCreate;
