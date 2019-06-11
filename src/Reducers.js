/**
 * Combine all reducers in this file and export the combined reducers.
 * If we were to do this in store.js, reducers wouldn't be hot reloadable.
 */
import { combineReducers } from 'redux';
import CSReducers from './Modules/ChangShang/Store/CSReducers';
import { CS_REDUCER_KEY } from './Modules/ChangShang/Store/CSContants';
import { SB_REDUCER_KEY } from './Modules/SheBei/Store/SBContants';
import SBReducers from './Modules/SheBei/Store/SBReducers';
import AZReducer from './Modules/AnZhuang/Store/AZReducers';
import UseReducer from './Modules/UseInfo/Store/UseReducers';
import CBReducer from './Modules/CardBind/Store/CBReducers';
import CRReducer from './Modules/CardRecord/Store/CRReducers';
/**
 * Creates the main reducer with the asynchronously loaded ones
 */
export default function createReducer(asyncReducers) {
  return combineReducers({
    [CS_REDUCER_KEY]: CSReducers,
    [SB_REDUCER_KEY]: SBReducers,
    az: AZReducer,
    use: UseReducer,
    card: CBReducer,
    cardRecord: CRReducer,
    ...asyncReducers
  });
}
