import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import styles from "../Styles/SurveyDetails.module.css";
import SurveyReward from "../../abis/SurveyReward.json";
import Web3 from "web3";

const useStyles = makeStyles((theme) => ({
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },

  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
}));
export default function AnswerCard(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  const [answers, setAnswers] = useState([]);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

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
    const networkId = await window.web3.eth.net.getId();
    const networkData = SurveyReward.networks[networkId];
    if (networkData) {
      const surveyRewardContract = window.web3.eth.Contract(
        SurveyReward.abi,
        networkData.address
      );
      const answers = await surveyRewardContract.methods
        .getAnswers(props.surveyId, props.questionId)
        .call({ from: sessionStorage.getItem("address") });
      setAnswers(
        answers.map((answer) => {
          return window.web3.utils.hexToAscii(answer).replace(/\0/g, "");
        })
      );
    } else {
      window.alert("SurveyReward contract not deployed to detected network!");
    }
  }

  return (
    <React.Fragment>
      <Card className={styles["answer-card"]}>
        <CardHeader />
        <CardContent>
          <Typography
            variant="body2"
            color="textSecondary"
            component="p"
            className={styles["answer-card-text"]}
          >
            {props.question}
          </Typography>
        </CardContent>
        <div style={{ float: "right" }}>
          {" "}
          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded,
            })}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </div>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            {answers.map((answer) => (
              <Typography component="p" className={styles["answer"]}>
                {answer}
              </Typography>
            ))}
          </CardContent>
        </Collapse>
      </Card>
    </React.Fragment>
  );
}
