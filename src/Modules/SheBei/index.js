import React, { Component } from 'react';
import { Route } from "react-router-dom";
import { HashRouter as Router} from "react-router-dom";
import SheBeiAdd from './Views/SheBeiAdd';
import SheBeiList from './Views/SheBeiList';

class SheBeiContainer extends Component {
  getAddSheBei = props => {
    return <SheBeiAdd type='add' {...props} />;
  }
  getUpdateSheBei = props => {
    return <SheBeiAdd type='update' {...props} />;
  }

  render() {
    return (
      <Router >
        <Route exact path="/shebei" component={SheBeiList} />
        <Route path="/shebei/add" component={this.getAddSheBei} />
        <Route path="/shebei/update/:id" component={this.getUpdateSheBei} />
      </Router>
    );
  }
}

export default SheBeiContainer;