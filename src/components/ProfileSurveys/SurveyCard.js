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
import Button from "@material-ui/core/Button";
import { lightBlue, red } from "@material-ui/core/colors";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";

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

  detailsButton: {
    "&:hover": {
      color: "white",
    },
  },
}));
const open = createMuiTheme({
  palette: {
    primary: lightBlue,
    secondary: red,
  },
});

export default function SurveyCard(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  const surveyTitle = props.title;
  const description = props.description;
  const participantCount = Math.round(+props.rewardPool / +props.prize);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  return (
    <React.Fragment>
      <Card className={classes.root}>
        <CardHeader
          avatar={
            <Avatar
              src="/broken-image.jpg"
              aria-label="conductor"
              style={{ backgroundColor: "#7e9edf" }}
            ></Avatar>
          }
          title={surveyTitle}
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {description}
          </Typography>
        </CardContent>

        <CardActions disableSpacing>
          <ThemeProvider theme={open}>
            <div>
              <Button
                className={classes.detailsButton}
                variant="contained"
                color="primary"
                style={{ color: "white" }}
                href={`/details/${props.surveyId}`}
              >
                Survey Data
              </Button>{" "}
              {props.isOpen ? (
                <Button
                  variant="contained"
                  color="secondary"
                  style={{ color: "white" }}
                >
                  Close Survey
                </Button>
              ) : (
                <Button
                  variant="contained"
                  color="secondary"
                  style={{ color: "white" }}
                  disabled
                >
                  Close Survey
                </Button>
              )}
            </div>
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
            <Typography
              paragraph
            >{`Survey prize is: ${props.prize}`}</Typography>
            <Typography
              paragraph
            >{`Remaning prize pool: ${props.rewardPool}`}</Typography>
            <Typography paragraph>
              Approximately {participantCount} participants can join.
            </Typography>
          </CardContent>
        </Collapse>
      </Card>
    </React.Fragment>
  );
}
