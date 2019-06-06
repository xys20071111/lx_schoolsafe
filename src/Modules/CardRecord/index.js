import React, { Component } from 'react';
import { message } from 'antd';



class CardRecord extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    }
  }

  render() {
    return (
      <div className='salf-cardcord'>
        card cord
      </div>
    )
  }
}



export default (CardRecord);

