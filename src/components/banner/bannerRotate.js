import React, { useEffect, useState } from "react";
import { ImageA, ImageB, ImageC } from "../../images/banner_image";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import "./banner.css";
import SearchBarForm from "./searchBarForm";

const images = [ImageA, ImageB, ImageC];

const eachBannerStyle = {
  bannerItem: {
    backgroundSize: "cover",
    backgroundPosition: "center",
    backkgroundRepeat: "no-repeat"
  }
};
const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2)
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6)
  },
  heroButtons: {
    marginTop: theme.spacing(4)
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8)
  },
  searchBar: {
    marginTop: 50
  }
}));

const intervalTime = 5000;
const auto = true;

export default function BannerRotate() {
  const classStyle = eachBannerStyle;
  const classes = useStyles();
  const [slideCount, setSlideCount] = useState(0);
  useEffect(() => {
    if (auto) {
      const interval = setInterval(() => {
        if (slideCount === images.length - 1) setSlideCount(0);
        else setSlideCount((slideCount) => slideCount + 1);
      }, intervalTime);
      return () => clearInterval(interval);
    } else return;
  }, [slideCount]);

  return (
    <div className="banner">
      <div className="slider" id="main-banner">
        {images.map((image, index) => {
          return (
            <div
              key={index}
              className={`slide ${index === slideCount ? "current" : ""}`}
              style={{
                ...classStyle.bannerItem,
                backgroundImage: `url(${image})`
              }}
            >
              <div className="content">
                <Container maxWidth="sm">
                  <Typography
                    component="h2"
                    variant="h3"
                    align="center"
                    style={{ color: "#fff" }}
                    gutterBottom
                  >
                    Find Event Rental Items
                  </Typography>
                  <Typography
                    variant="h6"
                    align="center"
                    style={{ color: "#fff" }}
                    paragraph
                  >
                    Who knows your next neighbor might have what you are looking
                    for. Get the best rental service ever!
                  </Typography>
                </Container>
                <Container maxWidth="md" className={classes.searchBar}>
                  <div className={classes.heroButtons}>
                    <Grid container spacing={2} justify="center">
                      <Grid item>
                        <SearchBarForm />
                      </Grid>
                    </Grid>
                  </div>
                </Container>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
