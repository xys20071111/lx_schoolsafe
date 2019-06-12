import React, { Component } from 'react';
import { Route } from "react-router-dom";
import { HashRouter as Router} from "react-router-dom";
import AnZhuangAdd from './Views/AnZhuangAdd';
import AnZhuangList from './Views/AnZhuangList';

class AnZhuangContainer extends Component {
  getAddLocations = props => {
    return <AnZhuangAdd type='add' {...props} />;
  }
  getUpdateLocations = props => {
    return <AnZhuangAdd type='update' {...props} />;
  }

  render() {
    return (
      <Router >
        <Route exact path="/anzhuang" component={AnZhuangList} />
        <Route path="/anzhuang/add" component={this.getAddLocations} />
        <Route path="/anzhuang/update/:id" component={this.getUpdateLocations} />
      </Router>
    );
  }
}

export default AnZhuangContainer;