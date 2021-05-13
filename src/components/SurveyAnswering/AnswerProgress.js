import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { lightBlue } from "@material-ui/core/colors";
import LinearProgress from "@material-ui/core/LinearProgress";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";

const progress = createMuiTheme({
  palette: {
    primary: lightBlue,
  },
  typography: {
    body2: {
      fontFamily: ["Seravek", "sans-serif"].join(","),
      fontSize: "1.5em",
    },
  },
});

function LinearProgressWithLabel(props) {
  return (
    <ThemeProvider theme={progress}>
      <Box display="flex" alignItems="center">
        <Box width="100%" mr={1}>
          <LinearProgress
            variant="determinate"
            {...props}
            style={{ height: 15, borderRadius: 5 }}
          />
        </Box>
        <Box minWidth={35}>
          <Typography variant="body2" color="textSecondary">{`${Math.round(
            props.value
          )}%`}</Typography>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
const useStyles = makeStyles({
  root: {
    width: "100%",
    marginTop: "2%",
    height: 5,
  },
});

export default function AnswerProgress(props) {
  const questionCount = props.questionCount;
  const currentQuestion = props.currentQuestion;
  const progress = (+currentQuestion / +questionCount) * 100;
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <LinearProgressWithLabel value={progress} />
    </div>
  );
}
