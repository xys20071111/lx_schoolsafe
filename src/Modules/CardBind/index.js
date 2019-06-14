import React, { Component } from 'react';
import { Route } from "react-router-dom";
import { HashRouter as Router} from "react-router-dom";
import CardBindList from './Views/CardBindList';

class CardBindContainer extends Component {
  render() {
    return (
      <Router >
        <Route exact path="/cardbind" component={CardBindList} />
      </Router>
    );
  }
}

export default CardBindContainer;