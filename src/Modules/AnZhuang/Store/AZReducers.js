import { fromJS } from 'immutable';
import { GET_AN_ZHUANG_LIST } from './AZActions';

const homeInitState = fromJS({
  loading: true,
  list: []
})

const AZReducer = (state = homeInitState, action) => {
  switch (action.type) {
    case GET_AN_ZHUANG_LIST: {
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

export default AZReducer;