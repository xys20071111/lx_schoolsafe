import { connect } from 'react-redux'
import _ from 'lodash'
import React, { Component } from 'react';
import { PostFetch } from 'Common/Helpers';
import { createStructuredSelector } from 'reselect';
import CardBindFilterForm from 'Modules/CardBind/Views/CardBindFilterForm';
import { Table, message, Popconfirm, Divider } from 'antd';
import { columns, makeSelectLoading, makeSelectList, makeSelectFilter } from '../Store/CBContants';
import { URL_GET_CARD_BIND_INFO, URL_DELETE_CARD_BIND } from 'Common/Urls';
import { getCardBindData } from '../Store/CBActions';
const DEFAULT_PAGE_SIZE = 10;


class CardBindList extends Component {
  constructor(props) {
    super(props);
    this.columns = columns;
    this.state = {
      loading: false,
      list: [],
      total: 0,
      pageindex: 0,
      pagesize: DEFAULT_PAGE_SIZE,
      filter: {},
      currentPage: 0
    }

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
  handleSearchData = (_param = undefined) => {
    let filterParam = {};
    let [_pageIndex, _pageSize] = [0,DEFAULT_PAGE_SIZE]
    if (_param) {
      filterParam = _param;
      _pageSize = _param.pagesize;
      _pageIndex = _param.pageindex;
    } else {
      const { filter, pageindex, pagesize } = this.state;
      filterParam = Object.assign(filter, { pageindex, pagesize });
      console.log(filterParam);
    }

    PostFetch(URL_GET_CARD_BIND_INFO, { ...filterParam }).then(rs => {
      const list = rs.data || [];
      const newList = list.map((item,index) => {
        item.index = parseInt((this.state.currentPage * this.state.pagesize) + (index + 1));
        return item;
      });

      this.setState({
        loading: false,
        list: newList,
        total: rs.count,
        pageindex: this.state.pageindex,
        currentPage: _pageIndex,
        pagesize: _pageSize
      })
    }).catch(err => message.error(err.msg))
  }

  /** Update */
  handleUpdate = id => {
    this.props.history.push({ pathname: `/cardbind/update/${id}`, id });
  }

  /** Delete */
  handleDelete = id => {
    PostFetch(URL_DELETE_CARD_BIND, { ids: [id] }).then(rs => {
      this.handleSearchData();
      message.success('删除成功');
    }).catch(err => message.error('删除失败'))
  }

  /**切换table分页数据 */
  tablePagination = (current = undefined, changeSize = DEFAULT_PAGE_SIZE) => {
    const { filter } = this.state;
    const params = {
      cid: filter.cid,
      sid: filter.sid,
      pagesize: changeSize,
      pageindex: current
    }
    console.log('pagination:', params)
  }

  render() {
    const { loading, list, total, pagesize } = this.state;
    return (
      <div className='lx-school-changshang'>
        <CardBindFilterForm
          onHandleSearch={param => {
            this.setState({
              filter: param
            }, () => this.handleSearchData())
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
            total,
            pageSize: pagesize,
            showSizeChanger: true,
            pageSizeOptions: ['10','20','30','50','100'],
            onShowSizeChange: (current, changeSize) => this.tablePagination(current, changeSize),
            onChange: (current) => this.tablePagination(current),
            showTotal: function () {  //设置显示一共几条数据
              return '共 ' + total + ' 条数据';
            }
          }}
        />
      </div>
    );
  }
}

export default CardBindList;