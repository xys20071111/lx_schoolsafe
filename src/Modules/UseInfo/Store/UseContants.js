import { createSelector } from 'reselect';
import moment from 'moment';

export const USE_REDUCER_KEY = 'useinfo';
const reducerLoading = state => state[USE_REDUCER_KEY].get('loading');
const reducerList = state => state[USE_REDUCER_KEY].get('list');
const reducerVendors = state => state[USE_REDUCER_KEY].get('vendors');
export const makeSelectLoading = createSelector(reducerLoading, loading => loading);
export const makeSelectList = createSelector(reducerList, list => list ? list.toJS() : []);
export const makeSelectVendors = createSelector(reducerVendors, list => list.toJS());

/** table columns */
export const columns = [{
  title: '序号',
  align: 'center',
  dataIndex: 'index'
}, {
  title: '卡号',
  align: 'center',
  dataIndex: 'card'
}, {
  title: '学生姓名',
  align: 'center',
  dataIndex: 'user_name'
}, {
  title: '班级',
  align: 'center',
  dataIndex: 'class_name'
}, {
  title: '学校',
  align: 'center',
  dataIndex: 'school_name',
}, {
  title: '录入时间',
  align: 'center',
  dataIndex: 'create_time',
  sorter: (a, b) => moment(a.create_time).format('YYYY-MM-DD HH:mm:ss') > moment(b.create_time).format('YYYY-MM-DD HH:mm:ss'),
  render: text => moment(text).format('YYYY-MM-DD HH:mm:ss'),
}, {
  title: '更新时间',
  align: 'center',
  dataIndex: 'update_time',
  sorter: (a, b) => moment(a.update_time).format('YYYY-MM-DD HH:mm:ss') > moment(b.update_time).format('YYYY-MM-DD HH:mm:ss'),
  render: text => moment(text).format('YYYY-MM-DD HH:mm:ss'),
}];
