import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import "./searchForm.css";
const cities = [
  "Abia",
  "Adamawa",
  "Akwa Ibom",
  "Anambra",
  "Bauchi",
  "Bayelsa",
  "Benue",
  "Borno",
  "Cross River",
  "Delta",
  "Ebonyi",
  "Enugu",
  "Edo",
  "Ekiti",
  "Gombe",
  "Imo",
  "Jigawa",
  "Kaduna",
  "Kano",
  "Katsina",
  "Kebbi",
  "Kogi",
  "Kwara",
  "Lagos",
  "Nasarawa",
  "Niger",
  "Ogun",
  "Ondo",
  "Osun",
  "Oyo",
  "Plateau",
  "Rivers",
  "Sokoto",
  "Taraba",
  "Yobe",
  "Zamfara"
];
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
        <input type="text" value="" placeholder="keywords" />
        <select name="cars" placeholder="city">
          {cities.map((city, index) => (
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
