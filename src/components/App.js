import React from "react";
import Main from "./Main";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SurveyQuestion from "./SurveyAnswering/SurveyAnswering";
import SurveyCreate from "./SurveyCreate/SurveyCreate";
import ProfileSurveys from "./ProfileSurveys/ProfileSurveys";
import SurveyDetails from "./SurveyDetails/SurveyDetails";
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
      <Route path="/create">
        <SurveyCreate appName={appName} accountAddress={accountAddress} />
      </Route>
      <Route path="/profile">
        <ProfileSurveys appName={appName} accountAddress={accountAddress} />
      </Route>
      <Route path="/details/survey/:id">
        <SurveyDetails appName={appName} accountAddress={accountAddress} />
      </Route>
    </Router>
  );
}
export default App;
