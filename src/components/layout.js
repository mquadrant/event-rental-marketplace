import React, { useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import { makeStyles, useTheme } from "@material-ui/core/styles";
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
  ListItemText,
  Hidden
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
  // drawer: {
  //   [theme.breakpoints.up("sm")]: {
  //     width: drawerWidth,
  //     flexShrink: 0
  //   }
  // },
  // appBar: {
  //   marginLeft: drawerWidth,
  //   [theme.breakpoints.up("sm")]: {
  //     width: `calc(100% - ${drawerWidth}px)`
  //   }
  // },
  appBar: {
    zIndex: theme.zIndex.drawer + 1000
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none"
    }
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth
  },
  content: {
    flexGrow: 1
    // padding: theme.spacing(3)
  },
  button: {
    textTransform: "Capitalize",
    margin: theme.spacing(1),
    fontSize: "16px"
  },
  btnSticky: {
    color: "#000"
  },
  logo: { textDecoration: "none" },
  menuList: {
    [theme.breakpoints.down("xs")]: {
      display: "none"
    },
    marginLeft: "auto"
  },
  getStarted: {
    [theme.breakpoints.down("xs")]: {
      marginLeft: "auto"
    }
  }
}));

function Layout(props) {
  const {
    container,
    returnCallModal,
    callModal,
    location: { pathname },
    children
  } = props;
  const theme = useTheme();
  const classes = useStyles();

  const drawer = (
    <div>
      <div className={classes.toolbar}>
        <Typography
          variant="h6"
          noWrap
          className={classes.logo}
          component={Link}
          to={`/`}
        >
          LOGO
        </Typography>
      </div>

      <Divider />
      <List>
        {["Signin", "How it work", "Get started"].map((text, index) => (
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
        ))}
      </List>
    </div>
  );

  // const [open, setOpen] = React.useState(false);
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
  // let drawInterval;
  useEffect(() => {
    window.addEventListener("scroll", listenScrollEvent);
    return () => {};
  }, []);

  function handleSignClose() {
    setHandleSignOpen(false);
    returnCallModal(false);
  }
  // function handleDrawerOpen() {
  //   clearInterval(drawInterval);
  //   setOpen(true);
  // }

  // function handleDrawerFastClose() {
  //   setOpen(false);
  // }
  // function handleDrawerClose() {
  //   drawInterval = setTimeout(() => setOpen(false), 400);
  // }
  const [mobileOpen, setMobileOpen] = React.useState(false);

  function handleDrawerToggle() {
    setMobileOpen(!mobileOpen);
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
        className={classes.appBar}
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
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon className={stickyStyle} />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            className={classes.logo}
            component={Link}
            to={`/`}
            style={{
              color: "orange"
            }}
          >
            LOGO
          </Typography>
          <div className={classes.menuList}>
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
          </div>
          <div className={classes.getStarted}>
            <Button
              variant="outlined"
              color="secondary"
              className={classes.button}
              component={Link}
              to={`/signup`}
            >
              Get Started
            </Button>
          </div>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="Mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper
            }}
            ModalProps={{
              keepMounted: true // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        {/* <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden> */}
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {children}
      </main>
    </div>
  );
}

export default withRouter(Layout);
