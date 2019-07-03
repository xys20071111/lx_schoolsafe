import _ from 'lodash';
import { createSelector } from 'reselect';
import { AZ_POSITION_NUMBER_OPTIONS } from 'Modules/AnZhuang/Store/AZContants';

export const USE_REDUCER_KEY = 'useinfo';
const reducerLoading = state => state[USE_REDUCER_KEY].get('loading');
const reducerList = state => state[USE_REDUCER_KEY].get('list');
const reducerVendors = state => state[USE_REDUCER_KEY].get('vendors');
const reducerFilter = state => state[USE_REDUCER_KEY].get('filter');
const reducerDevices = state => state[USE_REDUCER_KEY].get('devices');
export const makeSelectLoading = createSelector(reducerLoading, loading => loading);
export const makeSelectList = createSelector(reducerList, list => list ? list.toJS() : []);
export const makeSelectVendors = createSelector(reducerVendors, list => list.toJS());
export const makeSelectFilter = createSelector(reducerFilter, filter => filter ? filter.toJS() : {});
export const makeSelectDevices = createSelector(reducerDevices, list => list.toJS());

/** table columns */
export const columns = [{
  title: '序号',
  align: 'center',
  dataIndex: 'index'
}, {
  title: '位置',
  align: 'center',
  dataIndex: 'loc_type',
  render: (id, record) => {
    const lmp = _.find(AZ_POSITION_NUMBER_OPTIONS, types => types.id === id);
    if (lmp) {
      return lmp.name + ' - ' + (record.loc_num ? record.loc_num : '');
    }
    return '';
  }
}, {
  title: '厂商名称',
  align: 'center',
  dataIndex: 'vendor_name',
}, {
  title: '设备型号',
  align: 'center',
  dataIndex: 'dev_model',
}, {
  title: '设备序列号',
  align: 'center',
  dataIndex: 'dev_serial',
}, {
  title: '学校ID',
  align: 'center',
  dataIndex: 'school',
}, {
  title: '学校',
  align: 'center',
  dataIndex: 'school_name',
}, {
  title: '描述',
  align: 'center',
  dataIndex: 'brief',
}];
