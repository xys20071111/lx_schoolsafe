import React from 'react';
import ReactDOM from 'react-dom';
import 'Styles/CSS/index.less';
import AppView from './Modules';
import * as serviceWorker from 'Styles/JS/serviceWorker';
import { Provider } from 'react-redux';
import { AppContainer } from 'react-hot-loader';
import { HashRouter as Router} from "react-router-dom";
import configureStore from './Store';


// Create redux store
const store = configureStore();

ReactDOM.render(
  <AppContainer>
    <Provider store={store}>
      <Router >
        <AppView/>
      </Router>
    </Provider>
  </AppContainer>
, document.getElementById('root'));

serviceWorker.unregister();
