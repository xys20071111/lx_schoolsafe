import React, { Component } from 'react';
import { Route } from "react-router-dom";
import { HashRouter as Router} from "react-router-dom";
import SchoolUseInfoList from './Views/SchoolUseInfoList';
import SchoolUseInfoAdd from './Views/SchoolUseInfoAdd';

class UseInfoContainer extends Component {
  getSchoolUseInfoAdd = props => {
    return <SchoolUseInfoAdd {...props} type='add' />
  }

  getSchoolUseInfoUpdate = props => {
    return <SchoolUseInfoAdd {...props} type='update' />
  }

  render() {
    return (
      <Router >
        <Route exact path="/useinfo" component={SchoolUseInfoList} />
        <Route exact path="/useinfo/add" component={this.getSchoolUseInfoAdd} />
        <Route exact path="/useinfo/update/:id" component={this.getSchoolUseInfoUpdate} />
      </Router>
    );
  }
}

export default UseInfoContainer;