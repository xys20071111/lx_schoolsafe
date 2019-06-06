import { connect } from 'react-redux'
import React, { Component } from 'react';
import { PostFetch } from 'Common/Helpers';
import { URL_GET_FIRM_INFO } from 'Common/Urls';
import { Table, Card, Button, message } from 'antd';
import { createStructuredSelector } from 'reselect';
import { getChangShangData } from '../Store/CSActions';
import { columns, makeSelectLoading, makeSelectList } from '../Store/CSContants';


class ChangShangList extends Component {
  componentDidMount() {
    this.HandleSearchData();
  }

  HandleSearchData = () => {
    PostFetch(URL_GET_FIRM_INFO, { ids: [] }).then(rs => {
      this.props.getChangShangData(rs.data);
    }).catch(err => message.error(err.msg))
  }

  _cardDOM = () => {
    const { history } = this.props;
    return (
      <Card style={{ margin: '10px' }}>
        <div className='lx-school-changshang-card'>
          <div>厂商管理</div>
          <Button type='primary' icon="plus-circle" onClick={() => history.push(`/changshang/add`)}>
            添加厂商
          </Button>
        </div>
      </Card>
    )
  }
  _tableDOM = () => {
    const { loading, list } = this.props;
    return <Table
      bordered
      rowKey={record => record.id}
      style={{ margin: '10px' }}
      columns={columns}
      dataSource={list}
      loading={loading}
    />
  }

  render() {
    return (
      <div className='lx-school-changshang'>
        {this._cardDOM()}
        {this._tableDOM()}
      </div>
    );
  }
}


const mapStateToProps = createStructuredSelector({
  list: makeSelectList,
  loading: makeSelectLoading
})

export default connect(mapStateToProps, { getChangShangData })(ChangShangList);