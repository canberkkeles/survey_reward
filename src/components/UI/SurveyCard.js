import React from "react";
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
import CircularStatic from "./CircularStatic";

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
}));
const theme = createMuiTheme({
  palette: {
    primary: lightBlue,
  },
});
export default function SurveyCard() {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [rewardPool, setRewardPool] = React.useState(400);
  const prize = "500 Wei";
  const surveyTitle = "Reaction Time Survey";
  const description =
    "Hello and welcome to the survey. This Survey is about neuroscience and reaction time of a person.";
  const questionCount = 12;
  const [currentQuestion, setCurrentQuestion] = React.useState(5);
  const details = `This survey has ${questionCount} questions. It takes approximately ${questionCount} minutes. Thank you for your participation.`;
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          // Icon dedik
          <Avatar
            src="/broken-image.jpg"
            aria-label="conductor"
            style={{ backgroundColor: "#7e9edf" }}
          ></Avatar>
        }
        action={
          <IconButton aria-label="donate">
            <MonetizationOnIcon style={{ color: "#FFDD0E" }} />
          </IconButton>
        }
        title={surveyTitle}
        subheader={`Reward: ${prize}`}
      />

      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {description}
        </Typography>
      </CardContent>

      <CardActions disableSpacing>
        <ThemeProvider theme={theme}>
          <Button
            variant="contained"
            color="primary"
            style={{ color: "white" }}
          >
            Begin Survey
          </Button>
          &ensp;&ensp;&ensp;&ensp;
          <CircularStatic
            questionCount={questionCount}
            answered={currentQuestion}
          />
        </ThemeProvider>
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
          >{`Remaning prize pool: ${rewardPool}`}</Typography>
          <Typography paragraph>{details}</Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
