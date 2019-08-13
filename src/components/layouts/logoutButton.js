import React from "react";
import { withStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import KeyboardArrowDown from "@material-ui/icons/KeyboardArrowDown";
import auth from "../../pages/sign-up/helper/auth";

const StyledMenu = withStyles({
  list: { paddingTop: "0px", paddingBottom: "0px" }
})(Menu);
export default function LogoutMenu(props) {
  const { history } = props;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  function handleClick(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
    auth.logout(() => {
      localStorage.removeItem("token");
    });
    history.push("/");
  }

  return (
    <div>
      <IconButton
        aria-label="More"
        aria-controls="logout-menu"
        aria-haspopup="true"
        onClick={handleClick}
        color="inherit"
      >
        <KeyboardArrowDown />
      </IconButton>
      <StyledMenu
        id="logout-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={() => {
          setAnchorEl(null);
        }}
        style={{ top: "40px" }}
      >
        <MenuItem onClick={handleClose}>Logout</MenuItem>
      </StyledMenu>
    </div>
  );
}
