import React, { Component } from 'react';
import { message } from 'antd';



class CardBind extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    }
  }

  render() {
    return (
      <div className='salf-cardbind'>
        card bind
      </div>
    )
  }
}



export default (CardBind);

