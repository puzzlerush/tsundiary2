import React from 'react';
import ReactDOM from 'react-dom';
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import AppRouter from './routers/AppRouter';

ReactDOM.render(
  <React.StrictMode>
    <div className="app">
      <div className="wrapper">
        <AppRouter />
      </div>
    </div>
  </React.StrictMode>,
  document.getElementById('root')
);

