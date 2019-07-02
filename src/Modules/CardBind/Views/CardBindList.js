import { connect } from 'react-redux'
import _ from 'lodash'
import React, { Component } from 'react';
import { PostFetch } from 'Common/Helpers';
import { createStructuredSelector } from 'reselect';
import CardBindFilterForm from 'Modules/CardBind/Views/CardBindFilterForm';
import { Table, message, Popconfirm } from 'antd';
import { columns, makeSelectList, makeSelectFilter, makeSelectLoading } from '../Store/CBContants';
import { URL_GET_CARD_BIND_INFO, URL_DELETE_CARD_BIND } from 'Common/Urls';
import * as cbActions from '../Store/CBActions';


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
    if (this.props.history.action === 'POP') {
      this.handleSearchData();
    }
  }
  componentWillUnmount() {
    this.columns = null;
  }

  /** Search */
  handleSearchData = (current, page) => {
    const { pageindex, pagesize, cid, sid } = this.props.filter;
    const params = {
      cid: cid,
      sid: sid,
      pageindex: current ? current : pageindex,
      pagesize: page ? page : pagesize
    };
    if (current === 0) {
      params.pageindex = 0;
    }
    PostFetch(URL_GET_CARD_BIND_INFO, params).then(rs => {
      this.props.getCardBindData(rs.data, rs.count,params.pageindex);
    }).catch(err => message.error(err.msg))
  }

  /** Update */
  handleUpdate = (id, record) => {
    this.props.history.push({ pathname: `/cardbind/update/${id}`, id, record });
  }

  /** Delete */
  handleDelete = id => {
    PostFetch(URL_DELETE_CARD_BIND, { ids: [id] }).then(rs => {
      this.handleSearchData();
      message.success('删除成功');
    }).catch(err => message.error('删除失败'))
  }

  tablePagination = (current, changeSize) => {
    this.handleSearchData(current - 1, changeSize);
  }

  render() {
    const { list, filter, loading } = this.props;
    return (
      <div className='lx-school-changshang'>
        <CardBindFilterForm
          filter={filter}
          onResetDate={() => {
            this.props.resetDate(call => this.handleSearchData());
          }}
          onHandleSearch={param => {
            this.props.changeFilterValue(param.cid, param.sid, call => this.handleSearchData());
          }}
        />
        <Table
          bordered
          rowKey={record => record.id}
          style={{ margin: '10px' }}
          columns={this.columns}
          dataSource={list}
          loading={loading}
          locale={{ emptyText: '暂无数据' }}
          pagination={{
            total: filter.total,
            pageSize: filter.pagesize,
            //defaultCurrent: filter.pageindex + 1,
            showSizeChanger: true,
            pageSizeOptions: ['10','20','30','50','100'],
            onShowSizeChange: (current, changeSize) => {
              this.tablePagination(current, changeSize);
              this.props.changePageSize(changeSize);
            },
            onChange: (current) => {
              this.tablePagination(current);
              this.props.changePageIndex(current);
            },
            showTotal: function () {  //设置显示一共几条数据
              return '共 ' + filter.total + ' 条数据';
            }
          }}
        />
      </div>
    );
  }
}


const mapStateToProps = createStructuredSelector({
  loading: makeSelectLoading,
  list: makeSelectList,
  filter: makeSelectFilter
})

export default connect(mapStateToProps, { ...cbActions })(CardBindList);