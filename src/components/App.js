/* eslint-disable import/no-named-as-default */
import { Route, Switch } from "react-router-dom";
import HomePage from "./HomePage";
import PropTypes from "prop-types";
import React from "react";
import { hot } from "react-hot-loader";



class App extends React.Component {
  render() {
    return (
        <Switch>
          <Route exact path="/" component={HomePage} />
        </Switch>
    );
  }
}

App.propTypes = {
  children: PropTypes.element
};

export default hot(module)(App);