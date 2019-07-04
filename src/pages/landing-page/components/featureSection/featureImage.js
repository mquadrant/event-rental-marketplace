import React from "react";
import FeatureItem from "./featureItem";
import { Grid, Typography, Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  heroContent: {
    padding: theme.spacing(8, 0, 6)
  },
  featureItems: {
    padding: theme.spacing(0, 2)
  }
}));

export default function FeatureImage() {
  const classes = useStyles();
  return (
    <div>
      <Container maxWidth="sm" component="main" className={classes.heroContent}>
        <Typography
          component="h1"
          variant="h4"
          align="center"
          color="textPrimary"
          gutterBottom
        >
          Feature Event Items
        </Typography>
        <Typography
          variant="h6"
          align="center"
          color="textSecondary"
          component="p"
        >
          Get the best facilities for your events.
        </Typography>
      </Container>
      <Grid container spacing={2} className={classes.featureItems}>
        <Grid container item md={3} sm={6}>
          <FeatureItem />
        </Grid>
        <Grid container item md={3} sm={6}>
          <FeatureItem />
        </Grid>
        <Grid container item md={3} sm={6}>
          <FeatureItem />
        </Grid>
        <Grid container item md={3} sm={6}>
          <FeatureItem />
        </Grid>
      </Grid>
    </div>
  );
}
