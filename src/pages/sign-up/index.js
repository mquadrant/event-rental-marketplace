import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Container, Paper } from "@material-ui/core";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import UserSignUp from "./userSignup";
import ProviderSignUp from "./providerSignup";

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired
};

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    marginTop: 100,
    justifyContent: "center",
    alignItems: "center"
  }
}));

export default function SignUp(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  console.log(props);
  const { doCallModal } = props;
  function handleChange(event, newValue) {
    setValue(newValue);
  }

  return (
    <div className={classes.root}>
      <Container maxWidth="sm">
        <Paper>
          <AppBar position="static">
            <Tabs
              value={value}
              onChange={handleChange}
              variant="fullWidth"
              centered
            >
              <Tab label="Customer" style={{ borderRight: "1px solid #fff" }} />
              <Tab
                label="Rental Provider"
                style={{ borderLeft: "1px solid #fff" }}
              />
            </Tabs>
          </AppBar>
          {value === 0 && (
            <TabContainer>
              <UserSignUp callModal={doCallModal} />
            </TabContainer>
          )}
          {value === 1 && (
            <TabContainer>
              <ProviderSignUp callModal={doCallModal} />
            </TabContainer>
          )}
        </Paper>
      </Container>
    </div>
  );
}
