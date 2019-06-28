import moment from 'moment';
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
export const columns = [
{
  title: '序号',
  align: 'center',
  dataIndex: 'index'
},
{
  title: '设备',
  align: 'center',
  dataIndex: 'id',
},
{
  title: '位置类型',
  align: 'center',
  dataIndex: 'loc_type',
  render: id => {
    const lmp = _.find(AZ_POSITION_NUMBER_OPTIONS, types => types.id === id);
    if (lmp) {
      return lmp.name;
    }
    return '';
  }
},
{
  title: '位置',
  align: 'center',
  dataIndex: 'location',
},
{
  title: '位置描述',
  align: 'center',
  dataIndex: 'loc_brief',
},
{
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
