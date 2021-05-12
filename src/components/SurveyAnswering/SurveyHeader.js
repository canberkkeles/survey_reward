import React from "react";
import "./SurveyAnswering.css";

const SurveyHeader = () => {
  const surveyConductor = "0x9818101924771cC285D34029F9E9b7aaA87f9569";
  return (
    <div className="header">
      <div className="header__questions">5 questions remaining</div>
      <div className="header__title">Research on Cuteberry</div>
      <div className="header__conductor">Conductor: {surveyConductor}</div>
    </div>
  );
};
export default SurveyHeader;
