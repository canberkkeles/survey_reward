import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
import Button from "@material-ui/core/Button";
import { lightBlue } from "@material-ui/core/colors";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import SurveyProgress from "./SurveyProgress";
import ModalCard from "../UI/ModalCard";
import styles from "../Styles/SurveyModal.module.css";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
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
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));
const open = createMuiTheme({
  palette: {
    primary: lightBlue,
  },
});

export default function SurveyCard(props) {
  const donateAddress = props.conductor;
  const surveyReward = props.surveyReward;
  const accountAddress = props.accountAddress;
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  const surveyTitle = props.title;
  const description = props.description;
  const isOpen = props.isOpen;
  const [donateOpen, setDonateOpen] = useState(false);
  const [donateValue, setDonateValue] = useState(0);

  const details = `This survey has ${props.questionCount} questions. It takes approximately ${props.questionCount} minutes. Thank you for your participation.`;
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleOpen = () => {
    setDonateOpen(true);
  };

  const handleClose = () => {
    setDonateOpen(false);
    setDonateValue(0);
  };

  const handleDonateValueChange = (event) => {
    setDonateValue(event.target.value);
  };
  const handleDonate = (event) => {
    const web3 = window.web3;
    web3.eth.sendTransaction(
      { from: accountAddress, to: donateAddress, value: donateValue },
      function(err, transactionHash) {
        if (!err) handleClose();
        else alert("An Error Occured While Donating");
      }
    );
    event.preventDefault();
  };
  return (
    <React.Fragment>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={donateOpen}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={donateOpen}>
          <ModalCard>
            <p className={styles["donate-header"]}>Donate to conductor</p>
            <form autoComplete="off" onSubmit={handleDonate}>
              <label htmlFor="donate-amount">Donate amount(in wei)</label>
              <br></br>
              <input
                type="number"
                min="0"
                id="donate-amount"
                value={donateValue}
                onChange={handleDonateValueChange}
              ></input>
              <br></br>
              <ThemeProvider theme={open}>
                <div className={styles["donate-button-group"]}>
                  {" "}
                  <Button
                    variant="contained"
                    color="primary"
                    style={{ color: "white" }}
                    type="submit"
                  >
                    Donate
                  </Button>
                </div>
              </ThemeProvider>
            </form>
          </ModalCard>
        </Fade>
      </Modal>
      <Card className={classes.root}>
        <CardHeader
          avatar={
            <Avatar
              src="/broken-image.jpg"
              aria-label="conductor"
              style={{ backgroundColor: "#7e9edf" }}
            ></Avatar>
          }
          action={
            <IconButton aria-label="donate" onClick={handleOpen}>
              <MonetizationOnIcon style={{ color: "#FFDD0E" }} />
            </IconButton>
          }
          title={surveyTitle}
          subheader={`Reward: ${props.prize} Wei`}
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {description}
          </Typography>
        </CardContent>

        <CardActions disableSpacing>
          {isOpen ? (
            <ThemeProvider theme={open}>
              <Button
                variant="contained"
                color="primary"
                style={{ color: "white" }}
                href={`/fill/${props.surveyId}`}
              >
                Begin Survey
              </Button>
              &ensp;&ensp;&ensp;&ensp;
              <SurveyProgress
                questionCount={props.questionCount}
                answered={props.currentQuestion}
              />
            </ThemeProvider>
          ) : (
            <Button
              variant="contained"
              color="primary"
              style={{ color: "white" }}
              disabled
            >
              Survey Closed
            </Button>
          )}

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
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph>Before you start:</Typography>
            <Typography
              paragraph
            >{`Remaning prize pool: ${props.rewardPool}`}</Typography>
            <Typography paragraph>{details}</Typography>
          </CardContent>
        </Collapse>
      </Card>
    </React.Fragment>
  );
}
