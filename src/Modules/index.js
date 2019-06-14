import React, { Component } from 'react';
import { Route } from "react-router-dom";
import ChangShang from 'Modules/ChangShang';
import SheBeiContainer from 'Modules/SheBei';
import AnZhuangContainer from 'Modules/AnZhuang';
import CardBindContainer from 'Modules/CardBind';

/* import CardRecord from 'Modules/CardRecord'; */

class AppView extends Component {
  getChangShang = props => <ChangShang {...props} />

  getSheBeiContainer = props => <SheBeiContainer {...props} />

  getAnZhuangPostion = props => <AnZhuangContainer {...props} />

  render() {
    return (
      <div className = 'lx-school'>
        <Route exact path="/" component={() => <div>test chang</div>} />
        <Route path="/changshang" component={this.getChangShang} />
        <Route path="/shebei" component={this.getSheBeiContainer} />
        <Route path="/anzhuang" component={this.getAnZhuangPostion} />
        <Route path="/cardbind" component={CardBindContainer} />

        {/* <Route path="/cardRecord" component={CardRecord} /> */}
      </div>
    );
  }
}

export default AppView;