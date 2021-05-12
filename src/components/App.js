import React from "react";
import "./App.css";
import Main from "./Main";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SurveyQuestion from "./Surveys/SurveyQuestion";
function App() {
  return (
    <Router>
      <Route exact path="/" component={Main} />
      <Route path="/fill/survey/:id" component={SurveyQuestion} />
    </Router>
  );
}
export default App;
