import { createSelector } from 'reselect';
export const AZ_REDUCER_KEY = 'anzhuang';

const reducerLoading = state => state[AZ_REDUCER_KEY].get('loading');
const reducerList = state => state[AZ_REDUCER_KEY].get('list');


export const makeSelectLoading = createSelector(reducerLoading, loading => loading);
export const makeSelectList = createSelector(reducerList, list => list.toJS());

/** table columns */
export const columns = [{
  title: '序号',
  align: 'center',
  dataIndex: 'index'
}, {
  title: '学校',
  align: 'center',
  dataIndex: 'type'
}, {
  title: '位置类型',
  align: 'center',
  dataIndex: 'model'
}, {
  title: '位置编号',
  align: 'center',
  dataIndex: 'serial'
}, {
  title: '位置描述',
  align: 'center',
  dataIndex: 'vendor'
}];
