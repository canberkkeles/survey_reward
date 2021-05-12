import React from "react";
import "./App.css";
import Main from "./Main";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SurveyQuestion from "./SurveyAnswering/SurveyQuestion";
function App() {
  const accountAddress = "0xaD3Cd15b8Ad69d7913eB80aC52a6C9016773b36E";
  const appName = "Survey Dapp";
  return (
    <Router>
      <Route exact path="/">
        <Main appName={appName} accountAddress={accountAddress} />
      </Route>
      <Route path="/fill/survey/:id">
        <SurveyQuestion appName={appName} accountAddress={accountAddress} />
      </Route>
    </Router>
  );
}
export default App;
