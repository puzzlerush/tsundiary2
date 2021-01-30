import React from 'react';
import { connect } from 'react-redux';
import { Router, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import LoginPage from '../components/LoginPage';
import EditorPage from '../components/EditorPage';
import ArchivePage from '../components/ArchivePage';
import SettingsPage from '../components/SettingsPage';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import themeStyles from '../themes';

export const history = createBrowserHistory({ basename: 'tsundiary2' });

const AppRouter = ({ theme }) => (
  <div className="app" style={themeStyles[theme]}>
    <div className="wrapper">
      <Router history={history}>
        <div>
          <Switch>
            <PublicRoute path="/" component={LoginPage} exact={true} />
            <PrivateRoute path="/write" component={EditorPage} />
            <PrivateRoute path="/users/:username" component={ArchivePage} />
            <PrivateRoute path="/settings" component={SettingsPage} />
          </Switch>
        </div>
      </Router>
    </div>
  </div>
);

const mapStateToProps = (state) => ({
  theme: state.auth.theme
});

export default connect(mapStateToProps)(AppRouter);