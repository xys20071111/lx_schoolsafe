import { createSelector } from 'reselect';
import { PostFetch } from 'Common/Helpers';
import { URL_GET_FIRM_INFO } from 'Common/Urls';
export const SB_REDUCER_KEY = 'shebei';
const reducerLoading = state => state[SB_REDUCER_KEY].get('loading');
const reducerList = state => state[SB_REDUCER_KEY].get('list');
const reducerVendors = state => state[SB_REDUCER_KEY].get('vendors');


export const makeSelectLoading = createSelector(reducerLoading, loading => loading);
export const makeSelectList = createSelector(reducerList, list => list.toJS());
export const makeSelectVendors = createSelector(reducerVendors, list => list.toJS());

/** table columns */
export const columns = [{
  title: '序号',
  align: 'center',
  dataIndex: 'id',
}, {
  title: '设备类型',
  align: 'center',
  dataIndex: 'type'
}, {
  title: '设备型号',
  align: 'center',
  dataIndex: 'model'
}, {
  title: '设备序列号',
  align: 'center',
  dataIndex: 'serial'
}, {
  title: '厂商名称',
  align: 'center',
  dataIndex: 'vendor'
}, {
  title: '录入时间',
  align: 'center',
}, {
  title: '更新时间',
  align: 'center',
}];


/** 初始化获取所有厂商信息 */
export async function getAllVendors() {
  let vendorNames = await new Promise(resolve => {
    PostFetch(URL_GET_FIRM_INFO, { ids: [] }).then(rs => {
      if(rs.result === 0 && rs.data) {
        resolve(rs.data)
      }
    }).catch(err => resolve([]));
  });
  return vendorNames;
}