import { fromJS } from 'immutable';
import { GET_CARD_BIND_LIST, SET_PAGE_INDEX, SET_PAGE_SIZE, SET_FILTER_VALUE, RESET_DATA } from './CBActions';

const homeInitState = fromJS({
  loading: true,
  list: [],
  filter: {
    pageindex: 0,
    pagesize: 10,
    total: 0,
    cid: undefined,
    sid: undefined
  }
})

const CBReducer = (state = homeInitState, action) => {
  switch (action.type) {
    case GET_CARD_BIND_LIST: {
      const filter = state.get('filter');
      const { list = [], count = 0, pageindex = 0 } = action;

      const newList = list.map((item,index) => {
        item.index = filter.get('pageindex') * filter.get('pagesize') + (index+1);
        return item;
      });

      return state.update('list', () => fromJS(newList))
                  .update('loading', () => false)
                  .updateIn(['filter', 'pageindex'], () => pageindex)
                  .updateIn(['filter', 'total'], () => count);
    }
    case SET_PAGE_INDEX: return state.setIn(['filter', 'pageindex'], action.index - 1);
    case SET_PAGE_SIZE: return state.setIn(['filter', 'pagesize'], action.size);
    case RESET_DATA: {
      setTimeout(() => action.callback(homeInitState.get('filter').toJS()), 100);
      return homeInitState;
    }
    case SET_FILTER_VALUE: {
      const { cid = undefined, sid = undefined, callback } = action;
      const newState = state.setIn(['filter', 'cid'], cid)
                  .setIn(['filter', 'sid'], sid);

      setTimeout(() => callback(newState.get('filter').toJS()), 100);
      return newState;
    }
    default:
      return state;
  }
}

export default CBReducer;