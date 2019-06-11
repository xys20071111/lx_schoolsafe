import { fromJS } from 'immutable';
import { GET_SHE_BEI_LIST, SET_ALL_VENDORS_DATA } from './SBActions';

const homeInitState = fromJS({
  loading: true,
  list: [],
  vendors: []
})

const SBReducer = (state = homeInitState, action) => {
  switch (action.type) {
    case GET_SHE_BEI_LIST: {
      return state.update('list', () => fromJS(action.list))
                  .update('loading', () => false);
    }
    case SET_ALL_VENDORS_DATA: {
      return state.update('vendors', () => fromJS(action.list));
    }
    default:
      return state;
  }
}

export default SBReducer;