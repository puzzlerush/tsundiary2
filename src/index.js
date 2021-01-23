import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import AppRouter from './routers/AppRouter';
import configureStore from './store/configureStore';

const store = configureStore();


ReactDOM.render(
  <React.StrictMode>
    <div className="app">
      <div className="wrapper">
        <Provider store={store}>
          <AppRouter />
        </Provider>
      </div>
    </div>
  </React.StrictMode>,
  document.getElementById('root')
);

