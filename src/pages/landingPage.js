import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import BannerRotate from "../components/banner/bannerRotate";
import LoginModal from "../components/login/loginModal";
import FeatureImage from "../components/featureSection/featureImage";
import BlogSection from "../components/blog-section";
import Footer from "../components/footer";

const useStyles = makeStyles((theme) => ({
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: "0 8px",
    ...theme.mixins.toolbar,
    justifyContent: "flex-end"
  }
}));

export default function LandingPage(props) {
  const classes = useStyles();
  const { handleSignOpen, handleSignClose } = props;
  return (
    <div>
      <div className={classes.drawerHeader} style={{ zIndex: "3300" }} />
      <BannerRotate />
      <LoginModal
        handleSignOpen={handleSignOpen}
        handleSignClose={handleSignClose}
      />
      <FeatureImage />
      <BlogSection />
      <Footer />
    </div>
  );
}
