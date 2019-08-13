import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { getUsers } from "../../data";
import auth from "../../pages/sign-up/helper/auth";
import { connect } from "react-redux";
import addUser from "../../redux/user/userActions";

const useStyles = makeStyles((theme) => ({
  container: {
    borderRadius: 5,
    backgroundColor: "#f2f2f2",
    padding: "20px"
  },
  paper: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

function LoginForm(props) {
  const classes = useStyles();
  const { history } = props;

  console.log(props);

  const [values, setValues] = useState({
    email: "",
    password: ""
  });
  const [error, setError] = useState(false);
  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const users = getUsers();
    const loginUser = users.filter(
      (user) => values.password === user.password && values.email === user.email
    );
    if (loginUser.length === 0) {
      setError(true);
      return;
    }
    auth.login(() => {
      localStorage.setItem("token", loginUser[0].username);
    });
    props.addLoginUser(loginUser[0]);
    history.push("/provider/dashboard");
  };
  useEffect(() => {
    setError(false);
    return () => {};
  }, [values]);

  return auth.isAuthenticated() ? (
    <Redirect
      to={{
        pathname: "/provider/dashboard",
        state: {
          from: props.location
        }
      }}
    />
  ) : (
    <Container className={classes.container} component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form onSubmit={handleSubmit} className={classes.form} noValidate>
          <TextField
            error={error ? true : false}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={handleChange}
            value={values.email}
          />
          <TextField
            error={error ? true : false}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={handleChange}
            value={values.password}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="./signup" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
            <p style={{ color: "red" }}>
              {error ? "Incorrect credentails" : null}
            </p>
          </Grid>
        </form>
      </div>
    </Container>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.user.user
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addLoginUser: (user) => {
      dispatch(addUser(user));
    }
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginForm);
