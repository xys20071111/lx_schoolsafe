import _ from 'lodash';
import { fromJS } from 'immutable';
import { createStore, applyMiddleware } from 'redux';
import createReducer from './Reducers';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createHashHistory as createHistory } from 'history';
import { routerMiddleware } from 'react-router-redux';


/** 增加页面刷新，存储store到session中，以保障刷新数据不丢失 */
export default function configureStore(initialState = {}) {
  const history = createHistory();
  const routemiddleware = routerMiddleware(history)
  const middlewares = [
    routemiddleware
  ];
  /** cache data in session */
  initialState = sessionStorage.getItem('defaultSession') ? JSON.parse(sessionStorage.getItem('defaultSession')) : {};

  /** 数据处理(需要将value变为immutable对象，以保持跟原有结构一致) */
  if (_.isObject(initialState) && !_.isEqual(JSON.stringify(initialState), '{}')) {
    for (let x in initialState) {
      initialState[x] = fromJS(initialState[x]);
    }
  }

  const store = createStore(
    createReducer(),
    initialState,
    composeWithDevTools(applyMiddleware(...middlewares))
  );


  store.asyncReducers = {};
  /** 订阅 store 的变化*/
  store.subscribe(() => {
    const currentData = store.getState();
    sessionStorage.setItem('defaultSession', JSON.stringify(currentData));
  });
  return store;
}
