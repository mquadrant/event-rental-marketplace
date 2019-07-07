import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import "./searchForm.css";
import { nigeria_States as nigeriaStates } from "../../users/dashboard/listStateCountry";
const useStyles = makeStyles((theme) => ({
  button: {
    background: theme.palette.primary.main
  }
}));

export default function SearchBarForm() {
  const classes = useStyles();
  return (
    <div>
      <form class="form-inline" action="/action_page.php">
        <input type="text" value="jdhdhdh" placeholder="keywords" />
        <select name="cars" placeholder="city">
          {nigeriaStates.map((city, index) => (
            <option value={city} id={index}>
              {city}
            </option>
          ))}
        </select>
        <button type="submit" className={classes.button}>
          Search Item
        </button>
      </form>
    </div>
  );
}
