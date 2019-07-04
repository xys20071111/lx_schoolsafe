import moment from 'moment';
import { fromJS } from 'immutable';
import { GET_HOLIDAY_LIST, SET_HOLIDAY_RANGE, RESET_HOLIDAY_DATE } from './AddHActions';
const DATE_FORMAT = 'YYYY-MM-DD';

const homeInitState = fromJS({
  loading: false,
  list: [],
  filter: {
    begin: moment().month(moment().month()).startOf('month').format(DATE_FORMAT),
    end: moment().month(moment().month()).endOf('month').format(DATE_FORMAT)
  }
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
    case SET_HOLIDAY_RANGE: {
      return state.setIn(['filter', 'begin'], action.start)
                  .setIn(['filter', 'end'], action.end);
    }
    case RESET_HOLIDAY_DATE: return homeInitState;
    default:
      return state;
  }
}

export default AddHolidayReducer;