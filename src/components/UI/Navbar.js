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
  title: {
    flexGrow: 1,
    cursor: "pointer",
    fontFamily: ["Seravek", "sans-serif"].join(","),
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
    fontSize: 14,
    color: "white",
  },
  logo: {
    flexGrow: 1,
    color: "white",
    fontWeight: "bold",
    fontSize: 25,
    textDecoration: "none",
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
          <Typography
            variant="h5"
            className={classes.title}
            onClick={() => alert("Redirecting to home page <3")}
          >
            {appName}
          </Typography>

          <div style={{ textAlign: "right" }}>
            <Typography variant="h6" className={classes.adressCss}>
              {account}
            </Typography>
            <Button className={classes.navbarButtons}>Create Survey</Button>
            <Button className={classes.navbarButtons}>My Surveys</Button>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
