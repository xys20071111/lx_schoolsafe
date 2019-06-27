import { connect } from 'react-redux'
import _ from 'lodash'
import React, { Component } from 'react';
import { PostFetch } from 'Common/Helpers';
import * as schoolUseActions from '../Store/SchoolUseActions';
import { createStructuredSelector } from 'reselect';
import SchoolUseInfoFilterForm from 'Modules/SchoolUseInfo/Views/SchoolUseInfoFilterForm';
import { Table, message, Popconfirm, Divider } from 'antd';
import { getAllVendors } from 'Modules/SheBei/Store/SBContants';
import { URL_GET_SCHOOL_USE_INFO } from 'Common/Urls';
import { columns, makeSelectLoading, makeSelectList, makeSelectVendors, makeSelectFilter } from '../Store/SchoolUseContants';

class SchoolUseInfoList extends Component {
  constructor(props) {
    super(props);
    this.columns = columns;
    if (!_.find(this.columns, item => item.key && item.key === 'action')) {
      this.columns.splice(0, 0, {
        title: '序号',
        align: 'center',
        key: 'index',
        render:(text,record,index) => {
          return <span>{(this.props.filter.pageindex) * this.props.filter.pagesize + (index+1)}</span>
        },
      });

      this.columns.push({
        title: 'Action',
        key: 'action',
        align: 'center',
        render: (record) => (
          <span style={{ cursor: 'pointer' }}>
            <span key={`useinfo-${record.id}-update`} onClick={() => this.handleUpdate(record.id)}>
              修改
            </span>
            <Divider type="vertical" />
            <Popconfirm title={`确定要删除当前记录吗?`} okText="确定" cancelText="取消" onConfirm={() => this.handleDelete(record.id)}>
              <span key={`useinfo-${record.id}-delete`}>
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
      /** Get All Vendors */
      this.handleSearchData();
      getAllVendors().then(list => this.props.setAllVendors(list));
    }
  }
  componentWillUnmount() {
    this.columns = null;
  }

  /** Search */
  handleSearchData = (current, page) => {
    const { pageindex, pagesize, vendor, school } = this.props.filter;
    const params = {
      vendor,
      school,
      pageindex: current ? current : pageindex,
      pagesize: page ? page : pagesize
    };
    if (current === 0) {
      params.pageindex = 0;
    }

    PostFetch(URL_GET_SCHOOL_USE_INFO, { ...params }).then(rs => {
      console.log('school use info:', rs.data)
      this.props.getSchoolUseInfoData(rs.data, 200);
    }).catch(err => message.error(err.msg))
  }

  /** Update */
  handleUpdate = id => {
    this.props.history.push({
      pathname: `/useinfo/update/${id}`,
      id
    })
  }

  /** Delete */
  handleDelete = id => {
    console.log('delete use info id:', id);
  }

  tablePagination = (current, changeSize) => {
    this.handleSearchData(current - 1, changeSize);
  }

  render() {
    const { loading, list, vendors, filter } = this.props;
    return (
      <div className='lx-school-changshang'>
        <SchoolUseInfoFilterForm
          filter={filter}
          vendors={vendors}
          onResetDate={() => {
            this.props.resetDate(call => this.handleSearchData());
          }}
          onHandleSearch={param => {
            this.props.changeFilterValue(param.school, param.vendor, param.types, call => this.handleSearchData());
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
  list: makeSelectList,
  loading: makeSelectLoading,
  vendors: makeSelectVendors,
  filter: makeSelectFilter
})

export default connect(mapStateToProps, { ...schoolUseActions })(SchoolUseInfoList);