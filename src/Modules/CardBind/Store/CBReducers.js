import { fromJS } from 'immutable';
import { GET_CARD_BIND_LIST } from './CBActions';

const homeInitState = fromJS({
  loading: true,
  list: [],
  filter: {
    pageindex: 0,
    pagesize: 10,
    total: 0
  }
})

const CBReducer = (state = homeInitState, action) => {
  switch (action.type) {
    case GET_CARD_BIND_LIST: {
      const { list = [], count = 0 } = action;
      const newList = list.map((item,index) => {
        item.index = index + 1;
        return item;
      });
      return state.update('list', () => fromJS(newList))
                  .update('loading', () => false)
                  .updateIn(['filter', 'total'], () => count);
    }
    default:
      return state;
  }
}

export default CBReducer;