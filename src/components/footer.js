import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Container } from "@material-ui/core";

function MadeWithLove() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Built by Decadev 07, "}
      {" team SQD 02."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  footer: {
    backgroundColor: theme.palette.background.paper,
    marginTop: theme.spacing(1),
    padding: theme.spacing(6, 0)
  }
}));
export default function Footer() {
  const classes = useStyles();
  return (
    <div>
      <footer className={classes.footer}>
        <Container maxWidth="100%">
          <Typography
            variant="subtitle1"
            align="center"
            color="textSecondary"
            component="p"
          >
            &copy; Copyright 2019 BitRental.inc - All Rights Reserved.
          </Typography>
          <MadeWithLove />
        </Container>
      </footer>
    </div>
  );
}
