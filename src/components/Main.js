import React, { useState } from "react";
import Navbar from "./UI/Navbar";
import SurveyCardItems from "./SurveyCardItems";

const DUMMY_SURVEYS = [
  {
    id: "survey1",
    rewardPool: "400",
    prize: "200",
    title: "Cuteberry Survey",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
    questionCount: "12",
    currentQuestion: "5",
  },
  {
    id: "survey2",
    rewardPool: "200",
    prize: "100",
    title: "Cuteburry Survey",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
    questionCount: "10",
    currentQuestion: "2",
  },
  {
    id: "survey3",
    rewardPool: "100",
    prize: "31",
    title: "Sjsjsjsjs Survey",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
    questionCount: "69",
    currentQuestion: "31",
  },
  {
    id: "survey4",
    rewardPool: "120",
    prize: "35",
    title: "Fatih Survey",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
    questionCount: "70",
    currentQuestion: "44",
  },
  {
    id: "survey5",
    rewardPool: "6100",
    prize: "200",
    title: "CanberkBerry Survey",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
    questionCount: "61",
    currentQuestion: "61",
  },
];
const Main = () => {
  const [surveys, setSurveys] = useState(DUMMY_SURVEYS);
  return (
    <div>
      <Navbar />
      <p>Burak da burda</p>
      <SurveyCardItems style={{ height: "100%" }} surveys={surveys} />
    </div>
  );
};

export default Main;
