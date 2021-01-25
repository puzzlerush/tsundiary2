import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { firebase } from './firebase/firebase';
import 'normalize.css/normalize.css';
import "react-dates/initialize";
import 'react-dates/lib/css/_datepicker.css';
import AppRouter from './routers/AppRouter';
import configureStore from './store/configureStore';
import './styles/styles.scss';

//REMOVE LATER
import { addEntry, startAddEntry, startSetEntries } from './actions/entries';
import moment from 'moment';
const store = configureStore();

// REMOVE LATER
const dummyEntries = [
  {
    date: moment().startOf('day').format(),
    content: 'what a beautiful day! children like you should... GO STRAIGHT TO HELL'
  },
  {
    date: moment().startOf('day').subtract(1, 'days').format(),
    content: 'yesterday'
  },
  {
    date: moment().startOf('day').subtract(7, 'days').format(),
    content: 'one week ago'
  },
  {
    date: moment().startOf('day').subtract(1, 'months').format(),
    content: '30 days ago'
  },
  {
    date: moment().startOf('day').subtract(6, 'months').format(),
    content: '6 months ago'
  },
  {
    date: moment().startOf('day').subtract(1, 'year').format(),
    content: '1 year ago'
  },
  {
    date: moment().startOf('day').subtract(10, 'days').format(),
    content: 'random entry'
  }
];

dummyEntries.forEach(entry => {
  store.dispatch(startAddEntry(entry));
});

store.dispatch(startSetEntries());

const jsx = (
  <React.StrictMode>
    <div className="app">
      <div className="wrapper">
        <Provider store={store}>
          <AppRouter />
        </Provider>
      </div>
    </div>
  </React.StrictMode>
);

let hasRendered = false;
const renderApp = () => {
  if (!hasRendered) {
    ReactDOM.render(jsx, document.getElementById('root'));
    hasRendered = true;
  }
};

ReactDOM.render(<p>Loading...</p>, document.getElementById('root'));

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    console.log(user.displayName);
  } else {
    console.log('logged out');
  }
  
  renderApp();
});