import React, { useState } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Layout from "./components/layout";
import LandingPage from "./pages/landingPage";
import SignUp from "./pages/sign-up";
import "./App.css";
import ProviderDash from "./users/provider";
import Profile from "./users/dashboard/profile";
import MyItem from "./users/provider/myItem";
import Bookings from "./users/provider/bookings";
import Featured from "./users/provider/featured";
import ProtectedRoute from "./pages/sign-up/helper/protectedRoute";
import NotFound from "./pages/404";

function App() {
  const [callModal, setCallModal] = useState(false);
  function doCallModal() {
    setCallModal(true);
  }
  function returnCallModal(close) {
    setCallModal(false);
  }
  return (
    <BrowserRouter>
      <React-Fragment>
        <Layout callModal={callModal} returnCallModal={returnCallModal}>
          <Switch>
            <Route
              path="/"
              exact
              render={(props) => <LandingPage {...props} />}
            />
            <Route
              path="/signup"
              exact
              render={(props) => (
                <SignUp {...props} doCallModal={doCallModal} />
              )}
            />
            <Route path="/404" component={NotFound} />
            <ProtectedRoute
              exact
              path="/provider/dashboard"
              component={ProviderDash}
            />
            <ProtectedRoute
              exact
              path="/provider/profile"
              component={Profile}
            />
            <ProtectedRoute exact path="/provider/items" component={MyItem} />
            <ProtectedRoute
              exact
              path="/provider/bookings"
              component={Bookings}
            />
            <ProtectedRoute
              exact
              path="/provider/featured"
              component={Featured}
            />
            <Route
              component={(props) => (
                <Redirect
                  to={{
                    pathname: "/404",
                    state: {
                      from: props.location
                    }
                  }}
                />
              )}
            />
          </Switch>
        </Layout>
      </React-Fragment>
    </BrowserRouter>
  );
}

export default App;
