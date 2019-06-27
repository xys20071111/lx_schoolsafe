import React, { Component } from 'react';
import { Route } from "react-router-dom";
import { HashRouter as Router} from "react-router-dom";
import SchoolUseInfoList from './Views/SchoolUseInfoList';

class UseInfoContainer extends Component {
  render() {
    return (
      <Router >
        <Route exact path="/useinfo" component={SchoolUseInfoList} />
      </Router>
    );
  }
}

export default UseInfoContainer;