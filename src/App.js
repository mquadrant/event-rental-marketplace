import React, { useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Layout from "./components/layout";
import LandingPage from "./pages/landingPage";
import SignUp from "./pages/sign-up";
import "./App.css";

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
          </Switch>
        </Layout>
      </React-Fragment>
    </BrowserRouter>
  );
}

export default App;
