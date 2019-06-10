import { connect } from 'react-redux'
import _ from 'lodash'
import React, { Component } from 'react';
import { PostFetch } from 'Common/Helpers';
import { createStructuredSelector } from 'reselect';
import { getChangShangData } from '../Store/CSActions';
import CardHeader from 'Modules/Components/CardHeader';
import { Table, message, Popconfirm, Divider } from 'antd';
import { columns, makeSelectLoading, makeSelectList } from '../Store/CSContants';
import { URL_GET_FIRM_INFO, URL_GET_FIRM_DELETE } from 'Common/Urls';

class ChangShangList extends Component {
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
            <span key={`changshang-${record.id}-update`} onClick={() => this.handleUpdate(record.id)}>
              修改
            </span>
            <Divider type="vertical" />
            <Popconfirm title={`确定要删除厂商${record.name}吗?`} okText="确定" cancelText="取消" onConfirm={() => this.handleDelete(record.id)}>
              <span key={`changshang-${record.id}-delete`}>
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
  handleSearchData = () => {
    PostFetch(URL_GET_FIRM_INFO, { ids: [] }).then(rs => {
      this.props.getChangShangData(rs.data);
    }).catch(err => message.error(err.msg))
  }

  /** Update */
  handleUpdate = id => {
    this.props.history.push({
      pathname: `/changshang/update/${id}`,
      id
    })
  }

  /** Delete */
  handleDelete = id => {
    PostFetch(URL_GET_FIRM_DELETE, { id }).then(rs => {
      message.info('删除成功')
      this.handleSearchData();
    }).catch(err => message.error('删除失败'))
  }

  render() {
    const { history, loading, list } = this.props;

    return (
      <div className='lx-school-changshang'>
        <CardHeader
          leftTitle='厂商管理'
          hasActionButton={true}
          actionButtonLabel='添加厂商'
          onHandleAction={() => history.push(`/changshang/add`)}
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

export default connect(mapStateToProps, { getChangShangData })(ChangShangList);