import React from "react";
import { withRouter } from "react-router-dom";
import HomeLayout from "../components/layouts/index";
import DashboardLayout from "../components/layouts/dashboardLayout";
function Layout(props) {
  const {
    location: { pathname }
  } = props;
  return (
    <>
      {!/^\/customer\/|provider\//.test(pathname) ? (
        <HomeLayout {...props} />
      ) : (
        <DashboardLayout {...props} />
      )}
    </>
  );
}
export default withRouter(Layout);
