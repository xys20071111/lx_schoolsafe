import { createSelector } from 'reselect';

export const ADD_HOLIDAY_REDUCER_KEY = 'addholiday';
const reducerLoading = state => state[ADD_HOLIDAY_REDUCER_KEY].get('loading');
const reducerList = state => state[ADD_HOLIDAY_REDUCER_KEY].get('list');
export const makeSelectLoading = createSelector(reducerLoading, loading => loading);
export const makeSelectList = createSelector(reducerList, list => list ? list.toJS() : []);

/** table columns */
export const columns = [{
  title: '序号',
  align: 'center',
  dataIndex: 'number'
}, {
  title: '日期',
  align: 'center',
  dataIndex: 'date'
}, {
  title: '描述',
  align: 'center',
  dataIndex: 'brief'
}];


/**获取两个日期之间的所有日期 */
export const getYearAndMonthAndDay = (start,end) => {
  const dateArr = [];
  const startTime = getDate(start);
  const endTime = getDate(end);
  while ((endTime.getTime() - startTime.getTime()) >= 0) {
    const year = startTime.getFullYear();
    const month = startTime.getMonth().toString().length === 1 ? "0" + (parseInt(startTime.getMonth().toString(),10) + 1) : (startTime.getMonth() + 1);
    const day = startTime.getDate().toString().length === 1 ? "0" + startTime.getDate() : startTime.getDate();
    dateArr.push(`${year}-${month}-${day}`);
    startTime.setDate(startTime.getDate() + 1);
  }
  return dateArr;
}

const getDate = (datestr) => {
  const array = datestr.split('-');
  let temp = array.length === 1 ? datestr.split('/') : array;
  if (temp[1] === '01') {
    temp[0] = parseInt(temp[0],10) - 1;
    temp[1] = '12';
  } else {
    temp[1] = parseInt(temp[1],10) - 1;
  }
  //new Date()的月份入参实际都是当前值-1
  return new Date(temp[0], temp[1], temp[2]);
}