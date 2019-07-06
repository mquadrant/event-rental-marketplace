import React from "react";
import { withRouter } from "react-router-dom";
import HomeLayout from "../components/layouts/index";
import ProviderLayout from "../components/layouts/dashboardLayout";
function Layout(props) {
  const {
    location: { pathname }
  } = props;
  console.log(pathname);
  return (
    <div>
      {!/^\/customer|provider\//.test(pathname) ? (
        <HomeLayout {...props} />
      ) : (
        <ProviderLayout />
      )}
    </div>
  );
}
export default withRouter(Layout);
