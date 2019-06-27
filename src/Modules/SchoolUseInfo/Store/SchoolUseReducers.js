import { fromJS } from 'immutable';
import {
  GET_SCHOOL_USE_INFO_LIST,
  SET_SCHOOL_USE_INFO_VENDORS,
  SET_SCHOOL_PAGE_INDEX,
  SET_SCHOOL_PAGE_SIZE,
  SET_SCHOOL_FILTER_VALUE,
  RESET_SCHOOL_DATA,
} from './SchoolUseActions';

const homeInitState = fromJS({
  loading: true,
  list: [],
  vendors: [],
  filter: {
    pageindex: 0,
    pagesize: 10,
    total: 0,
    vendor: undefined,
    school: undefined,
    types: undefined
  }
})

const UseReducer = (state = homeInitState, action) => {
  switch (action.type) {
    case GET_SCHOOL_USE_INFO_LIST: {
      const { list = [], count = 0 } = action;
      return state.update('list', () => fromJS(list))
                  .update('loading', () => false)
                  .updateIn(['filter', 'pageindex'], () => 0)
                  .updateIn(['filter', 'total'], () => count);
    }
    case SET_SCHOOL_USE_INFO_VENDORS: {
      return state.update('vendors', () => fromJS(action.list));
    }
    case SET_SCHOOL_PAGE_INDEX: return state.setIn(['filter', 'pageindex'], action.index - 1);
    case SET_SCHOOL_PAGE_SIZE: return state.setIn(['filter', 'pagesize'], action.size);
    case RESET_SCHOOL_DATA: {
      const vendors = state.get('vendors');
      setTimeout(() => action.callback(homeInitState.get('filter').toJS()), 100);
      return homeInitState.set('vendors', vendors);
    }
    case SET_SCHOOL_FILTER_VALUE: {
      const { vendor = undefined, school = undefined, types = undefined, callback } = action;
      const newState = state.setIn(['filter', 'vendor'], vendor)
                  .setIn(['filter', 'types'], types)
                  .setIn(['filter', 'school'], school);

      setTimeout(() => callback(newState.get('filter').toJS()), 100);
      return newState;
    }
    default:
      return state;
  }
}

export default UseReducer;