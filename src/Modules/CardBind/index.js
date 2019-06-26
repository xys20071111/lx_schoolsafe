import React, { Component } from 'react';
import { Route } from "react-router-dom";
import { HashRouter as Router} from "react-router-dom";
import CardBindList from './Views/CardBindList';
import CardBindUpdate from './Views/CardBindUpdate';

class CardBindContainer extends Component {

  getUpdateCardBind = props => {
    return <CardBindUpdate {...props} />;
  }

  render() {
    return (
      <Router >
        <Route exact path="/cardbind" component={CardBindList} />
        <Route exact path="/cardbind/update/:id" component={this.getUpdateCardBind} />
      </Router>
    );
  }
}

export default CardBindContainer;