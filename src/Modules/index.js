import React, { Component } from 'react';
import { Route } from "react-router-dom";
import ChangShang from 'Modules/ChangShang'

import CardBind from 'Modules/CardBind';
import CardRecord from 'Modules/CardRecord';


class AppView extends Component {
  getChangShang = (props) => {
    return <ChangShang {...props}/>
  }

  render() {
    return (
      <div className = 'lx-school'>
        <Route exact path="/" component={() => <div>test chang</div>} />
        <Route path="/changshang" component={this.getChangShang} />
        <Route path="/cardBind" component={CardBind} />
        <Route path="/cardRecord" component={CardRecord} />
      </div>
    );
  }
}

export default AppView;