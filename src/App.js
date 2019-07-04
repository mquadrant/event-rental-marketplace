import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Layout from "./components/layout";
import LandingPage from "./pages/landingPage";
import SignUp from "./pages/landing-page/components/sign-up";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <React-Fragment>
        <Layout>
          <Switch>
            <Route path="/" exact component={LandingPage} />
            <Route />
            <Route path="/signup" exact component={SignUp} />
          </Switch>
        </Layout>
      </React-Fragment>
    </BrowserRouter>
  );
}

export default App;
