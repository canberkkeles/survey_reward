import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Divider from '@material-ui/core/Divider';
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: 10,
    transition: "0.3s",
    margin: "auto",
    boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
    marginTop: "5%",
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

const SurveyDetailsCard = () => {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  const CardTitle = "Question"

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  
  return (
    <React.Fragment>
      <Card className={classes.root}>
        <CardHeader
          title={CardTitle}
        />
        <CardContent>
          <Typography variant="body2" color="textPrimary" component="p">
            Expand to see the given answers.
          </Typography>
        </CardContent>
        <Divider light/>
        <CardActions disableSpacing>
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
            <Typography paragraph>Answer:</Typography>
            <Divider/>
            <Typography paragraph>Answer:</Typography>
          </CardContent>
        </Collapse>
      </Card>
    </React.Fragment>
  );
}

export default SurveyDetailsCard;