import { connect } from 'react-redux'
import _ from 'lodash'
import React, { Component } from 'react';
import { PostFetch } from 'Common/Helpers';
import { createStructuredSelector } from 'reselect';
import CardBindFilterForm from 'Modules/CardBind/Views/CardBindFilterForm';
import { Table, message, Popconfirm, Divider } from 'antd';
import { columns, makeSelectLoading, makeSelectList } from '../Store/CBContants';
import { URL_GET_CARD_BIND_INFO } from 'Common/Urls';
import { getCardBindData } from '../Store/CBActions';

class CardBindList extends Component {
  constructor(props) {
    super(props);
    this.columns = columns;
    if (!_.find(this.columns, item => item.key && item.key === 'action')) {
      this.columns.push({
        title: 'Action',
        key: 'action',
        align: 'center',
        render: (record) => (
          <span style={{ cursor: 'pointer' }}>
            <span key={`cardbind-${record.id}-update`} onClick={() => this.handleUpdate(record.id)}>
              修改
            </span>
            <Divider type="vertical" />
            <Popconfirm title={`确定要删除当前记录吗?`} okText="确定" cancelText="取消" onConfirm={() => this.handleDelete(record.id)}>
              <span key={`cardbind-${record.id}-delete`}>
                删除
              </span>
            </Popconfirm>
          </span>
        ),
      })
    }
  }
  componentDidMount() {
    this.handleSearchData();
  }
  componentWillUnmount() {
    this.columns = null;
  }

  /** Search */
  handleSearchData = (params) => {
    console.log('sssss',params)
    const tmp = {
      pageindex: 0,
      pagesize: 20
    }
    PostFetch(URL_GET_CARD_BIND_INFO, { ...tmp }).then(rs => {
      console.log('card bind:', rs.data)
      this.props.getCardBindData(rs.data);
    }).catch(err => message.error(err.msg))
  }

  /** Update */
  handleUpdate = id => {
    this.props.history.push({
      pathname: `/cardbind/update/${id}`,
      id
    })
  }

  /** Delete */
  handleDelete = id => {
    console.log('delete card bind id:', id);
  }

  render() {
    const { loading, list } = this.props;
    return (
      <div className='lx-school-changshang'>
        <CardBindFilterForm
          onHandleSearch={param => this.handleSearchData(param)}
        />
        <Table
          bordered
          rowKey={record => record.id}
          style={{ margin: '10px' }}
          columns={this.columns}
          dataSource={list}
          loading={loading}
          locale={{ emptyText: '暂无数据' }}
        />
      </div>
    );
  }
}


const mapStateToProps = createStructuredSelector({
  list: makeSelectList,
  loading: makeSelectLoading
})

export default connect(mapStateToProps, { getCardBindData })(CardBindList);