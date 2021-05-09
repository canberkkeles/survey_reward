import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  adressCss: {
    flexGrow: 1,
    textAlign: "right",
    color: "#D6ECEF", //#ECF87F
    fontWeight: "bold",
    fontSize: 14,
  },
  navbarButtons: {
    flexGrow: 1,
    textAlign: "right",
    fontWeight: "bold",
    fontSize: 12,
    color: "white",
  },
}));

export default function Navbar() {
  const classes = useStyles();
  const account = "0xaD3Cd15b8Ad69d7913eB80aC52a6C9016773b36E";
  const appName = "Survey Dapp";
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            {appName}
          </Typography>
          <div style={{ textAlign: "right" }}>
            <Typography variant="h6" className={classes.adressCss}>
              {account}
            </Typography>
            <Button className={classes.navbarButtons}>My Surveys</Button>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
