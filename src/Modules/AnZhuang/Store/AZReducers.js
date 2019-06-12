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
      const newList = list.filter((item,index) => item.index = index);
      return state.update('list', () => fromJS(newList))
                  .update('loading', () => false);
    }
    default:
      return state;
  }
}

export default AZReducer;