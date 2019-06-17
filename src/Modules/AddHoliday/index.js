import React, { Component } from 'react';
import { Route } from "react-router-dom";
import { HashRouter as Router} from "react-router-dom";
import AddHolidayList from './Views/AddHolidayList';
import AddHoliday from './Views/AddHoliday';

class AddHolidayContainer extends Component {
  getAddHoliday = props => {
    return <AddHoliday type='add' {...props} />;
  }

  render() {
    return (
      <Router >
        <Route exact path="/holiday" component={AddHolidayList} />
        <Route path="/holiday/add" component={this.getAddHoliday} />
      </Router>
    );
  }
}

export default AddHolidayContainer;