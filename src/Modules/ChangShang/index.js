import React, { Component } from 'react';
import { Route } from "react-router-dom";
import { HashRouter as Router} from "react-router-dom";
import ChangShangAdd from './Views/ChangShangAdd';
import ChangShangList from './Views/ChangShangList';

class ChangShang extends Component {
  getAddChangShang = props => {
    return <ChangShangAdd type='add' {...props} />;
  }
  getUpdateChangShang = props => {
    return <ChangShangAdd type='update' {...props} />;
  }

  render() {
    return (
      <Router >
        <Route exact path="/changshang" component={ChangShangList} />
        <Route path="/changshang/add" component={this.getAddChangShang} />
        <Route path="/changshang/update/:id" component={this.getUpdateChangShang} />
      </Router>
    );
  }
}

export default ChangShang;