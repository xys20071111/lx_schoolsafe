import { fromJS } from 'immutable';
import { GET_HOLIDAY_LIST } from './AddHActions';

const homeInitState = fromJS({
  loading: false,
  list: []
})

const AddHolidayReducer = (state = homeInitState, action) => {
  switch (action.type) {
    case GET_HOLIDAY_LIST: {
      const { list = [] } = action;
      const newList = list.map((item,index) => {
        item.number = index + 1;
        return item;
      });
      return state.update('list', () => fromJS(newList))
                  .update('loading', () => false);
    }
    default:
      return state;
  }
}

export default AddHolidayReducer;