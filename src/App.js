import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { Provider } from "react-redux";
import { store } from "./redux/store";

import Main from "./pages/main/main"

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Switch>
            <Route path="/" exact component={Main} />
          </Switch>
        </Router>
      </Provider>
    );
  }
}

export default App;
