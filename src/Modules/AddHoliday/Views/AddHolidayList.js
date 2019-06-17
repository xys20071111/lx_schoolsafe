import { connect } from 'react-redux'
import _ from 'lodash'
import React, { Component } from 'react';
import { PostFetch } from 'Common/Helpers';
import { createStructuredSelector } from 'reselect';
import AddHolidayFilterForm from 'Modules/AddHoliday/Views/AddHolidayFilterForm';
import { Table, message, Popconfirm } from 'antd';
import { makeSelectLoading, makeSelectList, columns } from '../Store/AddHContants';
import { URL_GET_HOLIDAY_LIST, URL_DELETE_HOLIDAY } from 'Common/Urls';
import { getHolidayData } from '../Store/AddHActions';

class AddHolidayList extends Component {
  constructor(props) {
    super(props);
    this.columns = columns;
    this.filter = undefined;
    if (!_.find(this.columns, item => item.key && item.key === 'action')) {
      this.columns.push({
        title: 'Action',
        key: 'action',
        align: 'center',
        render: (record) => (
          <span style={{ cursor: 'pointer' }}>
            <Popconfirm title={`确定要删除节假日[${record.date}]吗?`} okText="确定" cancelText="取消" onConfirm={() => this.handleDelete(record.date)}>
              <span key={`shebei-${record.id}-delete`}>
                删除
              </span>
            </Popconfirm>
          </span>
        ),
      })
    }
  }
  /** Search */
  handleSearchData = (params) => {
    this.filter = params;
    PostFetch(URL_GET_HOLIDAY_LIST, { ...params }).then(rs => {
      this.props.getHolidayData(rs.data);
    }).catch(err => message.error(err.msg))
  }

  /** Delete */
  handleDelete = date => {
    PostFetch(URL_DELETE_HOLIDAY, { dates: [date] }).then(rs => {
      message.success('删除成功')
      this.handleSearchData(this.filter);
    }).catch(err => message.error('删除失败'))
  }

  render() {
    const { loading, list, history } = this.props;
    return (
      <div className='lx-school-changshang'>
        <AddHolidayFilterForm
          onHandleAddHoliday={() => history.push('/holiday/add')}
          onHandleSearch={param => this.handleSearchData(param)}
        />
        <Table
          bordered
          rowKey={record => record.number}
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

export default connect(mapStateToProps, { getHolidayData })(AddHolidayList);