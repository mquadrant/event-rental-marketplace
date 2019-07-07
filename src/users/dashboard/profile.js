import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Paper,
  Container,
  Divider,
  Typography,
  Grid,
  Button
} from "@material-ui/core";
import Person from "@material-ui/icons/Person";
import AccountCircle from "@material-ui/icons/AccountCircle";
import InputAdornment from "@material-ui/core/InputAdornment";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import image1 from "../../images/avatar_nick.png";
import { country_list as countries } from "../dashboard/listStateCountry";

const profileStyle = makeStyles((theme) => ({
  container: {
    padding: "20px"
  },
  image: {
    width: "180px",
    display: "block"
  },
  textField: {},
  button: {
    margin: theme.spacing(1)
  },
  paper: {
    marginBottom: 30
  },
  menu: {
    width: 160
  }
}));
export default function Profile() {
  const classes = profileStyle();
  const [passValid, setPassValid] = React.useState(true);
  const [values, setValues] = React.useState({
    fname: "Benjamin",
    lname: "Mark",
    bio: "",
    phone: "08067140834",
    email: "mquadrant@gmail.com",
    website: "",
    address: "",
    country: "Nigeria",
    state: "",
    city: "",
    newPassword: "",
    repeatPassword: "",
    facebook: "",
    twitter: ""
  });

  useEffect(() => {
    if (values.newPassword !== values.repeatPassword) {
      setPassValid(false);
    } else {
      setPassValid(true);
    }
    return () => {};
  }, [values.newPassword, values.repeatPassword]);

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };
  return (
    <div>
      <form className={classes.container} noValidate autoComplete="true">
        <Paper className={classes.paper}>
          <Container className={classes.container}>
            <Typography component="h2" variant="h5" color="">
              About me
            </Typography>
          </Container>
          <Divider />
          <Grid container spacing={3} className={classes.container}>
            <Grid item md={5}>
              <Grid container>
                <Grid item align="center" sm={12}>
                  <img src={image1} className={classes.image} />
                </Grid>
                <Grid item align="center" sm={12}>
                  <Button
                    variant="outlined"
                    color="primary"
                    className={classes.button}
                    size="small"
                  >
                    Update Image
                  </Button>
                  <Typography variant="subtitle1" color="">
                    Image size should be less than 50kb.
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item md={7}>
              <Grid container spacing={3}>
                <Grid item md={6}>
                  <TextField
                    id="fname"
                    label="First Name"
                    className={classes.textField}
                    value={values.fname}
                    onChange={handleChange("fname")}
                    margin="normal"
                    variant="outlined"
                    fullWidth
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <AccountCircle />
                        </InputAdornment>
                      )
                    }}
                  />
                </Grid>
                <Grid item md={6}>
                  <TextField
                    id="lname"
                    label="Last Name"
                    className={classes.textField}
                    value={values.lname}
                    onChange={handleChange("lname")}
                    margin="normal"
                    variant="outlined"
                    fullWidth
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <AccountCircle />
                        </InputAdornment>
                      )
                    }}
                  />
                </Grid>
              </Grid>
              <TextField
                id="bio"
                label="Biography"
                multiline
                rows="4"
                defaultValue="Default Value"
                onChange={handleChange("bio")}
                className={classes.textField}
                value={values.bio}
                margin="normal"
                variant="outlined"
                fullWidth
                InputLabelProps={{
                  shrink: true
                }}
              />
            </Grid>
          </Grid>
        </Paper>
        {/* Contact Details */}
        <Paper className={classes.paper}>
          <Container className={classes.container}>
            <Typography component="h2" variant="h5" color="">
              Contact Detail
            </Typography>
          </Container>
          <Divider />
          <Grid container spacing={3} className={classes.container}>
            <Grid item md={4}>
              <TextField
                id="phone"
                label="Phone"
                className={classes.textField}
                value={values.phone}
                onChange={handleChange("phone")}
                margin="normal"
                variant="outlined"
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountCircle />
                    </InputAdornment>
                  )
                }}
              />
            </Grid>
            <Grid item md={4}>
              <TextField
                id="email"
                label="Email"
                className={classes.textField}
                value={values.email}
                onChange={handleChange("email")}
                margin="normal"
                variant="outlined"
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountCircle />
                    </InputAdornment>
                  )
                }}
              />
            </Grid>
            <Grid item md={4}>
              <TextField
                id="website"
                label="Website"
                className={classes.textField}
                value={values.website}
                onChange={handleChange("website")}
                margin="normal"
                variant="outlined"
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountCircle />
                    </InputAdornment>
                  )
                }}
              />
            </Grid>
          </Grid>
        </Paper>
        {/* Address */}
        <Paper className={classes.paper}>
          <Container className={classes.container}>
            <Typography component="h2" variant="h5" color="">
              Address
            </Typography>
          </Container>
          <Divider />
          <Grid container spacing={3} className={classes.container}>
            <Grid item md={6}>
              <TextField
                id="address"
                label="Address"
                className={classes.textField}
                value={values.address}
                onChange={handleChange("address")}
                margin="normal"
                variant="outlined"
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountCircle />
                    </InputAdornment>
                  )
                }}
              />
            </Grid>
            <Grid item md={6}>
              <TextField
                id="country"
                select
                label="Country"
                className={classes.textField}
                value={values.country}
                onChange={handleChange("country")}
                SelectProps={{
                  native: true,
                  MenuProps: {
                    className: classes.menu
                  }
                }}
                margin="normal"
                variant="outlined"
              >
                {countries.map((country) => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </TextField>
            </Grid>
            <Grid item md={6}>
              <TextField
                id="state"
                label="State"
                className={classes.textField}
                value={values.state}
                onChange={handleChange("state")}
                margin="normal"
                variant="outlined"
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountCircle />
                    </InputAdornment>
                  )
                }}
              />
            </Grid>
            <Grid item md={6}>
              <TextField
                id="city"
                label="City"
                className={classes.textField}
                value={values.city}
                onChange={handleChange("city")}
                margin="normal"
                variant="outlined"
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountCircle />
                    </InputAdornment>
                  )
                }}
              />
            </Grid>
          </Grid>
        </Paper>
        {/* Password Update */}
        <Paper className={classes.paper}>
          <Container className={classes.container}>
            <Typography component="h2" variant="h5" color="">
              Password Update
            </Typography>
          </Container>
          <Divider />
          <Grid container spacing={3} className={classes.container}>
            <Grid item md={6}>
              <TextField
                id="newPassword"
                label="New Password"
                type="password"
                className={classes.textField}
                value={values.newPassword}
                onChange={handleChange("newPassword")}
                margin="normal"
                variant="outlined"
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountCircle />
                    </InputAdornment>
                  )
                }}
              />
            </Grid>
            <Grid item md={6}>
              <TextField
                error={!passValid ? true : false}
                id="repeatPassword"
                type="password"
                label="Repeat Password"
                className={classes.textField}
                value={values.repeatPassword}
                onChange={handleChange("repeatPassword")}
                margin="normal"
                variant="outlined"
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountCircle />
                    </InputAdornment>
                  )
                }}
                helperText={
                  passValid
                    ? ""
                    : "The password and its confirm are not the same"
                }
              />
            </Grid>
            <Grid item md={12}>
              <Typography variant="subtitle1" color="">
                Enter same password in both fields. Use an uppercase letter and
                a number for stronger password.
              </Typography>
            </Grid>
          </Grid>
        </Paper>
        {/* Social Media */}
        <Paper className={classes.paper}>
          <Container className={classes.container}>
            <Typography component="h2" variant="h5" color="">
              Social Media
            </Typography>
          </Container>
          <Divider />
          <Grid container spacing={3} className={classes.container}>
            <Grid item md={6}>
              <TextField
                id="facebook"
                className={classes.textField}
                value={values.facebook}
                onChange={handleChange("facebook")}
                margin="normal"
                variant="outlined"
                fullWidth
                placeholder="www.facebook.com/yourhandle"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountCircle />
                    </InputAdornment>
                  )
                }}
              />
            </Grid>
            <Grid item md={6}>
              <TextField
                id="twitter"
                className={classes.textField}
                value={values.twitter}
                onChange={handleChange("twitter")}
                margin="normal"
                variant="outlined"
                fullWidth
                placeholder="www.twitter.com/yourhandle"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountCircle />
                    </InputAdornment>
                  )
                }}
              />
            </Grid>
          </Grid>
        </Paper>
      </form>
    </div>
  );
}
