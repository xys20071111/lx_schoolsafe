import { connect } from 'react-redux'
import _ from 'lodash'
import React, { Component } from 'react';
import { PostFetch } from 'Common/Helpers';
import { createStructuredSelector } from 'reselect';
import AnZhuangFilterForm from './AnZhuangFilterForm';
import { getAnZhuangPositionData } from '../Store/AZActions';
import { Table, message, Popconfirm, Divider } from 'antd';
import { columns, makeSelectLoading, makeSelectList } from '../Store/AZContants';
import { URL_GET_LOCATIONS_INFO, URL_GET_LOCATIONS_DELETE } from 'Common/Urls';

class AnZhuangList extends Component {
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
            <span key={`shebei-${record.id}-update`} onClick={() => this.handleUpdate(record.id)}>
              修改
            </span>
            <Divider type="vertical" />
            <Popconfirm title={`确定要删除设备[${record.serial}]吗?`} okText="确定" cancelText="取消" onConfirm={() => this.handleDelete(record.id)}>
              <span key={`shebei-${record.id}-delete`}>
                删除
              </span>
            </Popconfirm>
          </span>
        ),
      })
    }
  }
  componentDidMount() {
    /** Get All Devics */
    this.handleSearchData();
  }
  componentWillUnmount() {
    this.columns = null;
  }

  /** Search */
  handleSearchData = () => {
    PostFetch(URL_GET_LOCATIONS_INFO, { ids: [] }).then(rs => {
      console.log('666666666666',rs)
      this.props.getAnZhuangPositionData(rs.data);
    }).catch(err => message.error(err.msg))
  }

  /** Update */
  handleUpdate = id => {
    this.props.history.push({
      pathname: `/anzhuang/update/${id}`,
      id
    })
  }

  /** Delete */
  handleDelete = id => {
    PostFetch(URL_GET_LOCATIONS_DELETE, { id }).then(rs => {
      message.info('删除成功')
      this.handleSearchData();
    }).catch(err => message.error('删除失败'))
  }

  render() {
    const { history, loading, list } = this.props;

    return (
      <div className='lx-school-changshang'>
        <AnZhuangFilterForm
          onHandleAction={() => history.push(`/anzhuang/add`)}
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

export default connect(mapStateToProps, { getAnZhuangPositionData })(AnZhuangList);