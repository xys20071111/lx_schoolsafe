import React, { Component } from 'react';
import { Route } from "react-router-dom";
import { HashRouter as Router} from "react-router-dom";
import UseInfoList from './Views/UseInfoList';

class UseInfoContainer extends Component {
  render() {
    return (
      <Router >
        <Route exact path="/useinfo" component={UseInfoList} />
      </Router>
    );
  }
}

export default UseInfoContainer;