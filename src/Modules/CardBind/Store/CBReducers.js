import { fromJS } from 'immutable';
import { GET_CARD_BIND_LIST } from './CBActions';

const homeInitState = fromJS({
  loading: true,
  list: []
})

const CBReducer = (state = homeInitState, action) => {
  switch (action.type) {
    case GET_CARD_BIND_LIST: {
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

export default CBReducer;