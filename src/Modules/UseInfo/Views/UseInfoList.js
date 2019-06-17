import { connect } from 'react-redux'
import _ from 'lodash'
import React, { Component } from 'react';
import { PostFetch } from 'Common/Helpers';
import { createStructuredSelector } from 'reselect';
import UseInfoilterForm from 'Modules/UseInfo/Views/UseInfoFilterForm';
import { Table, message, Popconfirm, Divider } from 'antd';
import { columns, makeSelectLoading, makeSelectList, makeSelectVendors } from '../Store/UseContants';
import { getAllVendors } from 'Modules/SheBei/Store/SBContants';
import { URL_GET_CARD_BIND_INFO } from 'Common/Urls';
import { getUseInfoData, setAllVendors } from '../Store/UseActions';

class UseInfoList extends Component {
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
    /** Get All Vendors */
    getAllVendors().then(list => this.props.setAllVendors(list));
    this.handleSearchData();
  }
  componentWillUnmount() {
    this.columns = null;
  }

  /** Search */
  handleSearchData = (params) => {
    PostFetch(URL_GET_CARD_BIND_INFO, { ...params }).then(rs => {
      console.log('card bind:', rs.data)
      this.props.getUseInfoData(rs.data);
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

  render() {
    const { loading, list, vendors } = this.props;
    return (
      <div className='lx-school-changshang'>
        <UseInfoilterForm
          vendors={vendors}
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
  loading: makeSelectLoading,
  vendors: makeSelectVendors,
})

export default connect(mapStateToProps, { getUseInfoData, setAllVendors })(UseInfoList);