import React from "react";
import { Link } from "react-router-dom";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
// import ListSubheader from "@material-ui/core/ListSubheader";
import DashboardIcon from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import PublicIcon from "@material-ui/icons/Public";
import KitchenIcon from "@material-ui/icons/Kitchen";
import AssignmentIcon from "@material-ui/icons/Assignment";

const customerPages = {
  profile: "/customer/profile",
  booking: "/customer/bookings"
};
export const customerMenus = (pathname) => {
  return (
    <div>
      <ListItem
        button
        component={Link}
        to={customerPages.profile}
        selected={"/customer/profile" === pathname}
      >
        <ListItemIcon>
          <Person />
        </ListItemIcon>
        <ListItemText primary="My Profile" />
      </ListItem>
      {/* <Divider /> */}
      <ListItem
        button
        component={Link}
        to={customerPages.booking}
        selected={customerPages.booking === pathname}
      >
        <ListItemIcon>
          <AssignmentIcon />
        </ListItemIcon>
        <ListItemText primary="Booking" />
      </ListItem>
      {/* <Divider /> */}
    </div>
  );
};

const providerPages = {
  profile: "/provider/profile",
  dashboard: "/provider/dashboard",
  items: "/provider/items",
  bookings: "/provider/bookings",
  featured: "/provider/featured"
};
export const providerMenus = (pathname) => {
  return (
    <div>
      <ListItem
        button
        component={Link}
        to={providerPages.dashboard}
        selected={providerPages.dashboard === pathname}
      >
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItem>
      {/* <Divider /> */}
      <ListItem
        button
        component={Link}
        to={providerPages.profile}
        selected={providerPages.profile === pathname}
      >
        <ListItemIcon>
          <Person />
        </ListItemIcon>
        <ListItemText primary="My Profile" />
      </ListItem>
      {/* <Divider /> */}
      <ListItem
        button
        component={Link}
        to={providerPages.bookings}
        selected={providerPages.bookings === pathname}
      >
        <ListItemIcon>
          <AssignmentIcon />
        </ListItemIcon>
        <ListItemText primary="Bookings" />
      </ListItem>
      {/* <Divider /> */}
      <ListItem
        button
        component={Link}
        to={providerPages.items}
        selected={providerPages.items === pathname}
      >
        <ListItemIcon>
          <KitchenIcon />
        </ListItemIcon>
        <ListItemText primary="My Items" />
      </ListItem>
      {/* <Divider /> */}
      <ListItem
        button
        component={Link}
        to={providerPages.featured}
        selected={providerPages.featured === pathname}
      >
        <ListItemIcon>
          <PublicIcon />
        </ListItemIcon>
        <ListItemText primary="Promotion" />
      </ListItem>
    </div>
    // <div>
    //   <ListSubheader inset>Saved reports</ListSubheader>
    // </div>
  );
};
