import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Container } from "@material-ui/core";
import Link from "@material-ui/core/Link";

function MadeWithLove() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Built by Decagon 7 "}
      <Link color="inherit" href="https://material-ui.com/">
        (Squad 2
      </Link>
      {" team)"}
    </Typography>
  );
}
const useStyles = makeStyles((theme) => ({
  footer: {
    backgroundColor: theme.palette.background.paper,
    marginTop: theme.spacing(2),
    padding: theme.spacing(6, 0)
  }
}));
export default function Footer() {
  const classes = useStyles();
  return (
    <div>
      <footer className={classes.footer}>
        <Container maxWidth="lg">
          <Typography variant="h6" align="center" gutterBottom />
          <Typography
            variant="subtitle1"
            align="center"
            color="textSecondary"
            component="p"
          >
            &copy; Copyright 2019 bitRental.inc - All Rights Reserved.
          </Typography>
          <MadeWithLove />
        </Container>
      </footer>
    </div>
  );
}
