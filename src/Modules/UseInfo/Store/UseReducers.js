import { fromJS } from 'immutable';
import { GET_USE_INFO_LIST, SET_USE_INFO_VENDORS } from './UseActions';

const homeInitState = fromJS({
  loading: true,
  list: [],
  vendors: []
})

const UseReducer = (state = homeInitState, action) => {
  switch (action.type) {
    case GET_USE_INFO_LIST: {
      const { list = [] } = action;
      const newList = list.map((item,index) => {
        item.index = index + 1;
        return item;
      });
      return state.update('list', () => fromJS(newList))
                  .update('loading', () => false);
    }
    case SET_USE_INFO_VENDORS: {
      return state.update('vendors', () => fromJS(action.list));
    }
    default:
      return state;
  }
}

export default UseReducer;