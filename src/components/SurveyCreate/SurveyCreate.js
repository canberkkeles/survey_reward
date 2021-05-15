import React from "react";
import Navbar from "../UI/Navbar";
import InstructionsCard from "../UI/InstructionsCard";
import FormCard from "../UI/FormCard";
import SurveyCreateInfo from "./SurveyCreateInfo";
import SurveyCreateForm from "./SurveyCreateForm";
import classes from "../Styles/SurveyCreate.module.css";

const SurveyCreate = (props) => {
  return (
    <React.Fragment>
      <Navbar appName={props.appName} accountAddress={props.accountAddress} />
      <SurveyCreateInfo />
      <InstructionsCard>Some Instructions</InstructionsCard>
      <FormCard>
        <SurveyCreateForm />
      </FormCard>
    </React.Fragment>
  );
};
export default SurveyCreate;
