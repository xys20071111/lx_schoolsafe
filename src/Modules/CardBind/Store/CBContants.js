import { createSelector } from 'reselect';
import moment from 'moment';

export const CB_REDUCER_KEY = 'cardbind';
const reducerLoading = state => state[CB_REDUCER_KEY].get('loading');
const reducerList = state => state[CB_REDUCER_KEY].get('list');
const reducerFilter = state => state[CB_REDUCER_KEY].get('filter');
export const makeSelectLoading = createSelector(reducerLoading, loading => loading);
export const makeSelectList = createSelector(reducerList, list => list ? list.toJS() : []);
export const makeSelectFilter = createSelector(reducerFilter, filter => filter ? filter.toJS() : {});

/** table columns */
export const columns = [{
  title: '序号',
  align: 'center',
  key: 'id',
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
  title: '班级ID',
  align: 'center',
  dataIndex: 'class'
}, {
  title: '学校',
  align: 'center',
  dataIndex: 'school_name',
}, {
  title: '学校ID',
  align: 'center',
  dataIndex: 'school',
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
