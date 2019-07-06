import React, { useEffect } from "react";
import clsx from "clsx";
import { Link, withRouter } from "react-router-dom";
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
import Button from "@material-ui/core/Button";
import LoginModal from "../components/login/loginModal";

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
    marginLeft: drawerWidth - 10,
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
    width: drawerWidth,
    color: "#acacac",
    background: "#333"
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
    textTransform: "Capitalize",
    margin: theme.spacing(1),
    fontSize: "16px"
  },
  btnSticky: {
    color: "#000"
  }
}));

function Layout(props) {
  const classes = useStyles();
  const {
    returnCallModal,
    callModal,
    location: { pathname },
    children
  } = props;
  const [open, setOpen] = React.useState(false);
  const [handleSignOpen, setHandleSignOpen] = React.useState(false);

  const [scrollAppBar, setScrollAppBar] = React.useState(false);
  const stickyStyle = `${classes.button + " "}${
    scrollAppBar === true ? classes.btnSticky : ""
  }`;
  useEffect(() => {
    if (callModal) {
      setHandleSignOpen(true);
    }
    return () => {};
  }, [callModal]);
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
    returnCallModal(false);
  }
  function handleDrawerOpen() {
    clearInterval(drawInterval);
    setOpen(true);
  }

  function handleDrawerFastClose() {
    setOpen(false);
  }
  function handleDrawerClose() {
    drawInterval = setTimeout(() => setOpen(false), 400);
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <LoginModal
        handleSignOpen={handleSignOpen}
        handleSignClose={handleSignClose}
      />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open
        })}
        style={
          pathname === "/"
            ? scrollAppBar === true
              ? {
                  background: "#fff",
                  zIndex: "3000"
                }
              : {
                  boxShadow: "none",
                  background: "rgba(256,256,256,0)"
                }
            : scrollAppBar === true
            ? {
                background: "#fff",
                zIndex: "3000"
              }
            : null
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
          {
            <Typography
              variant="h6"
              noWrap
              className={classes.title}
              style={
                open
                  ? {
                      visibility: "hidden"
                    }
                  : {
                      visibility: "visible",
                      color: "orange"
                    }
              }
            >
              LOGO
            </Typography>
          }
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
            component={Link}
            to={`/signup`}
          >
            Get Started
          </Button>
        </Toolbar>
      </AppBar>
      <Drawer
        onMouseEnter={handleDrawerOpen}
        onMouseLeave={handleDrawerClose}
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
        <Divider style={{ color: "#3b3b3b" }} />
        <List>
          {["Login/Signup", "Search for item", "List your item"].map(
            (text, index) => (
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
            )
          )}
        </List>
      </Drawer>
      <main
        onMouseEnter={handleDrawerClose}
        onClick={handleDrawerFastClose}
        className={clsx(classes.content, {
          [classes.contentShift]: open
        })}
      >
        {children}
      </main>
    </div>
  );
}

export default withRouter(Layout);
