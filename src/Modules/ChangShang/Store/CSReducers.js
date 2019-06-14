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
      const newList = list.map((item,index) => {
        item.index = index + 1;
        return item;
      });
      return state.update('list', () => fromJS(newList))
                  .update('loading', () => false);
    }
    default:
      return state;
  }
}

export default CSReducer;