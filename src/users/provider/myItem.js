import React from "react";
import clsx from "clsx";
import {
  Divider,
  Typography,
  Button,
  Paper,
  Container,
  Grid
} from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Add from "@material-ui/icons/Add";
import CardMedia from "@material-ui/core/CardMedia";

import OutlinedInput from "@material-ui/core/OutlinedInput";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const useStyles = makeStyles((theme) => ({
  root: { display: "flex" },
  container: {
    padding: "20px"
  },
  paper: {
    marginBottom: 30
  },
  title: {
    flexGrow: 1,
    display: "inline-block"
  },
  card: {
    display: "flex"
  },
  cardDetails: {
    flex: 1
  },
  cardMedia: {
    width: 120,
    height: 80
  },
  formControl: {
    maxWidth: 100
  },
  button: {
    marginLeft: "auto",
    textTransform: "capitalize"
  }
}));

const StyledSelect = withStyles({
  select: { padding: "6px 18px" },
  root: { background: "#fff" }
})(Select);
export default function MyItem() {
  const classes = useStyles();

  const [state, setState] = React.useState({
    item: ""
  });

  const handleChange = (name) => (event) => {
    setState({
      ...state,
      [name]: event.target.value
    });
  };

  return (
    <div>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Paper className={classes.paper}>
            <Container className={clsx(classes.container, classes.root)}>
              <Typography
                component="span"
                variant="h6"
                color="inherit"
                noWrap
                className={classes.title}
              >
                Listed
              </Typography>
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
              >
                <Add />
                Add Item
              </Button>
            </Container>
            <Divider />
            <div style={{ height: 550, overflow: "auto" }}>
              {[1, 2, 3, 4].map((item) => (
                <>
                  <Container
                    style={{
                      padding: 15,
                      backgroundColor: "#f5f5f5"
                    }}
                  >
                    <Grid container>
                      <Grid item xs={6} sm={9}>
                        <CardMedia
                          className={classes.cardMedia}
                          image="https://source.unsplash.com/random"
                          title="Image title"
                        />
                      </Grid>
                      <Grid item xs={6} sm={3}>
                        <FormControl
                          variant="outlined"
                          className={classes.formControl}
                        >
                          <StyledSelect
                            native
                            value={state[item]}
                            onChange={handleChange(item)}
                            input={<OutlinedInput name={item} id={item} />}
                          >
                            <option value="listed">listed</option>
                            <option value="unlisted">unlisted</option>
                          </StyledSelect>
                        </FormControl>
                      </Grid>
                    </Grid>
                  </Container>
                  <Divider />
                </>
              ))}
            </div>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper className={classes.paper}>
            <Container className={classes.container}>
              <Typography
                component="h1"
                variant="h6"
                color="inherit"
                noWrap
                className={classes.title}
              >
                Unlisted
              </Typography>
            </Container>
            <Divider />
            <div style={{ height: 550, overflow: "auto" }}>
              {[5, 6].map((item) => (
                <>
                  <Container
                    style={{ padding: 15, backgroundColor: "#f5f5f5" }}
                  >
                    <Grid container>
                      <Grid item xs={6} md={9}>
                        <CardMedia
                          className={classes.cardMedia}
                          image="https://source.unsplash.com/random"
                          title="Image title"
                        />
                      </Grid>
                      <Grid item xs={6} sm={3}>
                        <FormControl
                          variant="outlined"
                          className={classes.formControl}
                        >
                          <StyledSelect
                            native
                            value={state[item]}
                            onChange={handleChange(item)}
                            input={<OutlinedInput name={item} id={item} />}
                          >
                            <option value="listed">listed</option>
                            <option value="unlisted">unlisted</option>
                          </StyledSelect>
                        </FormControl>
                      </Grid>
                    </Grid>
                  </Container>
                  <Divider />
                </>
              ))}
            </div>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
