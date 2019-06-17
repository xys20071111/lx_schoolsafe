import React from 'react';
import ReactDOM from 'react-dom';
import 'Styles/CSS/index.less';
import AppView from './Modules';
import * as serviceWorker from 'Styles/JS/serviceWorker';
import { Provider } from 'react-redux';
import { AppContainer } from 'react-hot-loader';
import { HashRouter as Router} from "react-router-dom";
import configureStore from './Store';

import { LocaleProvider } from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');


// Create redux store
const store = configureStore();

ReactDOM.render(
  <AppContainer>
    <Provider store={store}>
      <Router >
        <LocaleProvider locale={zh_CN}>
          <AppView/>
        </LocaleProvider>
      </Router>
    </Provider>
  </AppContainer>
, document.getElementById('root'));

serviceWorker.unregister();
