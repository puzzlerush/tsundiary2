import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { firebase } from './firebase/firebase';
import 'normalize.css/normalize.css';
import "react-dates/initialize";
import 'react-dates/lib/css/_datepicker.css';
import AppRouter, { history } from './routers/AppRouter';
import LoadingPage from './components/LoadingPage';
import configureStore from './store/configureStore';
import { login, logout, setTheme, startGetTheme, startGetPrivacySettings } from './actions/auth';
import { startSetEntries } from './actions/entries';
import './styles/styles.scss';


const store = configureStore();

const jsx = (
  <React.StrictMode>    
    <Provider store={store}>
      <AppRouter />
    </Provider>
  </React.StrictMode>
);

let hasRendered = false;
const renderApp = () => {
  if (!hasRendered) {
    ReactDOM.render(jsx, document.getElementById('root'));
    hasRendered = true;
  }
};

ReactDOM.render((
  <Provider store={store}>
    <LoadingPage />
  </Provider>
), document.getElementById('root'));

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    store.dispatch(login(user));
    store.dispatch(startGetTheme());
    store.dispatch(startGetPrivacySettings());
    store.dispatch(startSetEntries()).then(() => {
      renderApp();
      if (history.location.pathname === '/') {
        history.push('/write');
      }
    });
  } else {
    store.dispatch(logout());
    store.dispatch(setTheme('Default'));
    renderApp();
    history.push('/');
  }
});