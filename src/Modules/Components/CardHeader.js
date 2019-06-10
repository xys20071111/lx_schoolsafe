import React, { Component } from 'react';
import { Card, Button, Icon } from 'antd';
import { func, string, bool, array } from 'prop-types';


class CardHeader extends Component {
  static propTypes = {
    leftTitle: string,
    leftTitleChildren: array,
    hasActionButton: bool,
    actionButtonLabel: string,
    onHandleAction: func
  }
  static defaultProps = {
    leftTitle: '',
    leftTitleChildren: [],
    hasActionButton: false,
    actionButtonLabel: '',
    onHandleAction: () => {}
  }

  actionRightButton = () => {
    const { actionButtonLabel, onHandleAction } = this.props;
    return (
      <Button type='primary' icon="plus-circle" onClick={() => onHandleAction()}>
        {actionButtonLabel}
      </Button>
    )
  }

  leftTitleChildren = () => {
    const { leftTitleChildren = [] } = this.props;

    if (leftTitleChildren.length > 0) {
      const splitDOM = [<Icon type='right' key={`left-icon-a`} />];
      for (let x = 0; x < leftTitleChildren.length; x++) {
        if (x % 2 !== 0) {
          splitDOM.push(<Icon type='right' key={`left-icon-${x}`}/>);
          splitDOM.push(<div className='children' key={`left-children-${x}`}>{leftTitleChildren[x]}</div>);
        } else {
          splitDOM.push(<div className='children' key={`left-children-${x}`}>{leftTitleChildren[x]}</div>);
        }
      }
      return splitDOM;
    }
    return null;
  }


  render() {
    const profix = 'lx-school-changshang-card';
    const { leftTitle, hasActionButton } = this.props;

    return (
      <Card>
        <div className={profix}>
          <div className={`${profix}-left`}>
            <div className={`${profix}-title`}>
              {leftTitle}
            </div>
            {this.leftTitleChildren()}
          </div>
          {hasActionButton && this.actionRightButton()}
        </div>
      </Card>
    );
  }
}


export default CardHeader;