import { fromJS } from 'immutable';
import { GET_CHANG_SHANG_LIST } from './CSActions';

const homeInitState = fromJS({
  loading: true,
  list: [],
})

const CSReducer = (state = homeInitState, action) => {
  switch (action.type) {
    case GET_CHANG_SHANG_LIST: {
      const { list = [] } = action;
      const newList = list.filter((item,index) => item.index = index);
      return state.update('list', () => fromJS(newList))
                  .update('loading', () => false);
    }
    default:
      return state;
  }
}

export default CSReducer;