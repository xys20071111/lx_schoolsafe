import { createSelector } from 'reselect';
export const CS_REDUCER_KEY = 'cs';
const reducerLoading = state => state[CS_REDUCER_KEY].get('loading');
const reducerList = state => state[CS_REDUCER_KEY].get('list');


export const makeSelectLoading = createSelector(reducerLoading, loading => loading);
export const makeSelectList = createSelector(reducerList, list => list.toJS());

export const formItemLayout = {
  labelCol: {
    xs: { span: 12 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 12 },
    sm: { span: 8 },
  },
};
export const formItemLayout2 = {
  labelCol: {
    xs: { span: 6 },
    sm: { span: 10 },
  },
  wrapperCol: {
    xs: { span: 6 },
    sm: { span: 8 },
  },
};


/** table columns */
export const columns = [{
  title: '序号',
  align: 'center',
  dataIndex: 'index'
}, {
  title: '厂商名称',
  align: 'center',
  dataIndex: 'name'
}, {
  title: '厂商地址',
  align: 'center',
  dataIndex: 'address'
}, {
  title: '联系人',
  align: 'center',
  dataIndex: 'contact'
}, {
  title: '联系电话',
  align: 'center',
  dataIndex: 'phone'
}];