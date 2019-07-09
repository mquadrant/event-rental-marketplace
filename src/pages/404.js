import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Paper, Container } from "@material-ui/core";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "80vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  paper: {
    padding: 30
  }
}));
export default function NotFound() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Container maxWidth="sm">
        <Paper container align="center" className={classes.paper}>
          <Typography variant="h4" gutterBottom>
            Nothing to see here
          </Typography>
          <Typography variant="h5" gutterBottom>
            404 Page not found
          </Typography>
          <Typography variant="subtitle1">
            We're really sorry, but we can't find the page you're looking for.
          </Typography>
        </Paper>
      </Container>
    </div>
  );
}
