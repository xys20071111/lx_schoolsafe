import { createSelector } from 'reselect';
import _ from 'lodash';
import { PostFetch } from 'Common/Helpers';
import { URL_GET_FIRM_INFO } from 'Common/Urls';
export const SB_REDUCER_KEY = 'shebei';
export const SB_SELECT_OPTIONS = [
  {
    id: 0,
    name: '通用设备'
  }
]

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
  dataIndex: 'index'
}, {
  title: '设备类型',
  align: 'center',
  dataIndex: 'type',
  render: id => {
    const lmp = _.find(SB_SELECT_OPTIONS, item => _.isEqual(item.id, id));
    if (lmp) {
      return lmp.name;
    }
    return '';
  }
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
  dataIndex: 'vendor_name'
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