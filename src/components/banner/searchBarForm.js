import React, { useState } from "react";
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
  const [values, setValues] = useState({
    keyword: "",
    city: "Lagos"
  });

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };
  return (
    <div>
      <form className="form-inline" action="/action_page.php">
        <input
          type="text"
          value={values.keyword}
          placeholder="keywords"
          onChange={handleChange("keyword")}
        />
        <select name="cars" placeholder="city">
          {nigeriaStates.map((city, index) => (
            <option key={index} value={values.city} id={index}>
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
