import React, { useState } from "react";
import Navbar from "./UI/Navbar";
import Surveys from "./Surveys/Surveys";

const DUMMY_SURVEYS = [
  {
    id: "0",
    rewardPool: "400",
    prize: "200",
    title: "Cuteberry Survey",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
    questionCount: "12",
    currentQuestion: "5",
    open: true,
  },
  {
    id: "1",
    rewardPool: "200",
    prize: "100",
    title: "Cuteburry Survey",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
    questionCount: "10",
    currentQuestion: "2",
    open: true,
  },
  {
    id: "2",
    rewardPool: "100",
    prize: "31",
    title: "Sjsjsjsjs Survey",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
    questionCount: "69",
    currentQuestion: "31",
    open: true,
  },
  {
    id: "3",
    rewardPool: "120",
    prize: "35",
    title: "Fatih Survey",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
    questionCount: "70",
    currentQuestion: "44",
    open: false,
  },
  {
    id: "4",
    rewardPool: "6100",
    prize: "200",
    title: "CanberkBerry Survey",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
    questionCount: "61",
    currentQuestion: "61",
    open: true,
  },
];
const Main = () => {
  const [surveys, setSurveys] = useState(DUMMY_SURVEYS);
  return (
    <div>
      <Navbar />
      <Surveys surveys={surveys} />
    </div>
  );
};

export default Main;
