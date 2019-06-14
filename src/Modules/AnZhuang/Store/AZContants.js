import { createSelector } from 'reselect';
import moment from 'moment';
import _ from 'lodash';
export const AZ_REDUCER_KEY = 'anzhuang';
export const AZ_POSITION_NUMBER_OPTIONS = [
  { id: 0, name: '校门' },
  { id: 1, name: '教室' },
  { id: 2, name: '宿舍' },
]

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
  title: '学校ID',
  align: 'center',
  dataIndex: 'school'
}, {
  title: '学校',
  align: 'center',
  dataIndex: 'school_name'
}, {
  title: '位置类型',
  align: 'center',
  dataIndex: 'type',
  render: id => {
    const lmp = _.find(AZ_POSITION_NUMBER_OPTIONS, types => types.id === id);
    if (lmp) {
      return lmp.name;
    }
    return '';
  }
}, {
  title: '位置编号',
  align: 'center',
  dataIndex: 'number'
}, {
  title: '位置描述',
  align: 'center',
  dataIndex: 'brief'
}, {
  title: '开门时间',
  align: 'center',
  dataIndex: 'open_time',
  sorter: (a, b) => moment(a.open_time).format('HH:mm') < moment(b.open_time).format('HH:mm'),
  render: text => moment(text).format('HH:mm'),
}, {
  title: '关门时间',
  align: 'center',
  dataIndex: 'close_time',
  sorter: (a, b) => moment(a.close_time).format('HH:mm') < moment(b.close_time).format('HH:mm'),
  render: text => moment(text).format('HH:mm'),
}];
