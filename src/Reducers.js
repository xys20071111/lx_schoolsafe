/**
 * Combine all reducers in this file and export the combined reducers.
 * If we were to do this in store.js, reducers wouldn't be hot reloadable.
 */
import { combineReducers } from 'redux';
import { CS_REDUCER_KEY } from './Modules/ChangShang/Store/CSContants';
import { SB_REDUCER_KEY } from './Modules/SheBei/Store/SBContants';
import { AZ_REDUCER_KEY } from './Modules/AnZhuang/Store/AZContants';
import { CB_REDUCER_KEY } from './Modules/CardBind/Store/CBContants';
import { USE_REDUCER_KEY } from './Modules/SchoolUseInfo/Store/SchoolUseContants';
import { ADD_HOLIDAY_REDUCER_KEY } from './Modules/AddHoliday/Store/AddHContants';
import CSReducers from './Modules/ChangShang/Store/CSReducers';
import SBReducers from './Modules/SheBei/Store/SBReducers';
import AZReducer from './Modules/AnZhuang/Store/AZReducers';
import UseReducer from './Modules/SchoolUseInfo/Store/SchoolUseReducers';
import CBReducer from './Modules/CardBind/Store/CBReducers';
import AddHolidayReducer from './Modules/AddHoliday/Store/AddHReducers';
/**
 * Creates the main reducer with the asynchronously loaded ones
 */
export default function createReducer(asyncReducers) {
  return combineReducers({
    [CS_REDUCER_KEY]: CSReducers,
    [SB_REDUCER_KEY]: SBReducers,
    [AZ_REDUCER_KEY]: AZReducer,
    [CB_REDUCER_KEY]: CBReducer,
    [USE_REDUCER_KEY]: UseReducer,
    [ADD_HOLIDAY_REDUCER_KEY]: AddHolidayReducer,
    ...asyncReducers
  });
}
