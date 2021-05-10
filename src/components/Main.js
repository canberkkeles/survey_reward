import React from "react";
import Navbar from "./UI/Navbar";
import SurveyCard from "./UI/SurveyCard";

export class Main extends React.Component {
  render() {
    return (
      <div>
        <Navbar />

        <p>Burak da burda</p>

        <SurveyCard />
      </div>
    );
  }
}

export default Main;
