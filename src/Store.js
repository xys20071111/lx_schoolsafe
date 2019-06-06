import { createStore, applyMiddleware } from 'redux';
import createReducer from './Reducers';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createHashHistory as createHistory } from 'history'
import { routerMiddleware } from 'react-router-redux'

export default function configureStore(initialState = {}) {
  const history = createHistory();
  const routemiddleware = routerMiddleware(history)
  const middlewares = [
    routemiddleware
  ];

  const store = createStore(
    createReducer(),
    initialState,
    composeWithDevTools(applyMiddleware(...middlewares))
  );

  store.asyncReducers = {};
  return store;
}
