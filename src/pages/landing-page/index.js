import React, { useEffect } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import {
  Drawer,
  CssBaseline,
  AppBar,
  Toolbar,
  List,
  Typography,
  Divider
} from "@material-ui/core";
import {
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import Https from "@material-ui/icons/Https";
import Search from "@material-ui/icons/Search";
import ListIcon from "@material-ui/icons/List";
import Box from "@material-ui/core/Box";
import BannerRotate from "./components/banner/bannerRotate";
import Button from "@material-ui/core/Button";
import LoginModal from "./components/login/loginModal";
import FeatureImage from "./components/featureSection/featureImage";
import BlogSection from "./components/blog-section";
import Footer from "./footer";

const iconSideMenu = [Https, Search, ListIcon];
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex"
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  title: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  hide: {
    display: "none"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    background: "#333",
    width: drawerWidth,
    color: "#acacac"
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: "0 8px",
    ...theme.mixins.toolbar,
    justifyContent: "flex-end"
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(0),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginLeft: 0
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginLeft: drawerWidth
  },
  button: {
    margin: theme.spacing(1)
  },
  btnSticky: {
    color: "#000"
  }
}));

export default function LandingPage() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [handleSignOpen, setHandleSignOpen] = React.useState(false);

  const [scrollAppBar, setScrollAppBar] = React.useState(false);
  const stickyStyle = `${classes.button + " "}${
    scrollAppBar === true ? classes.btnSticky : ""
  }`;

  function listenScrollEvent(e) {
    if (window.scrollY > 80) {
      setScrollAppBar(true);
    } else {
      setScrollAppBar(false);
    }
  }
  let drawInterval;
  useEffect(() => {
    window.addEventListener("scroll", listenScrollEvent);
    return () => {};
  }, []);

  function handleSignClose() {
    setHandleSignOpen(false);
  }
  function handleDrawerOpen() {
    clearInterval(drawInterval);
    setOpen(true);
  }

  function handleDrawerClose() {
    drawInterval = setTimeout(() => setOpen(false), 800);
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open
        })}
        style={
          scrollAppBar === true
            ? {
                background: "#fff",
                zIndex: "3000"
              }
            : {
                boxShadow: "none",
                background: "rgba(256,256,256,0)"
              }
        }
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="Open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon className={stickyStyle} />
          </IconButton>

          <Typography
            variant="h6"
            noWrap
            className={classes.title}
            style={
              open === true
                ? {
                    visibility: "hidden"
                  }
                : { color: "orange", visibility: "visible" }
            }
          >
            LOGO
          </Typography>
          <Button color="inherit" className={stickyStyle}>
            How it works
          </Button>
          <Button color="inherit" className={stickyStyle}>
            Help center
          </Button>
          <Button
            color="inherit"
            className={stickyStyle}
            onClick={() => setHandleSignOpen(true)}
          >
            Signin
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            className={classes.button}
          >
            List Items
          </Button>
        </Toolbar>
      </AppBar>
      <Drawer
        onMouseEnter={handleDrawerOpen}
        className={classes.drawer}
        variant="temporary"
        anchor="left"
        open={open}
        onClose={handleDrawerClose}
        classes={{
          paper: classes.drawerPaper
        }}
      >
        <div className={classes.drawerHeader}>
          <Typography variant="h6" noWrap>
            LOGO
          </Typography>
        </div>
        <Divider />
        <List>
          {["Login/Signup", "Search for item", "List your item"].map(
            (text, index) => {
              return (
                <>
                  <ListItem button key={text}>
                    <ListItemIcon>
                      <Box
                        component={iconSideMenu[index]}
                        style={{ color: "#acacac" }}
                      />
                    </ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItem>
                  <Divider style={{ color: "#3b3b3b" }} />
                </>
              );
            }
          )}
        </List>
      </Drawer>
      <main
        onMouseEnter={handleDrawerClose}
        className={clsx(classes.content, {
          [classes.contentShift]: open
        })}
      >
        <div className={classes.drawerHeader} style={{ zIndex: "3300" }} />
        <BannerRotate />
        <LoginModal
          handleSignOpen={handleSignOpen}
          handleSignClose={handleSignClose}
        />
        <FeatureImage />
        <BlogSection />
        <Footer />
      </main>
    </div>
  );
}
