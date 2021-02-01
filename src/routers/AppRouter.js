import React from 'react';
import { connect } from 'react-redux';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import LoginPage from '../components/LoginPage';
import EditorPage from '../components/EditorPage';
import ArchivePage from '../components/ArchivePage';
import SettingsPage from '../components/SettingsPage';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import themeStyles from '../themes';

export const history = createBrowserHistory({ basename: 'tsundiary2' });

class AppRouter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      height: window.innerHeight
    };

    this.updateDimensions = this.updateDimensions.bind(this);
  }

  componentDidMount() {
    window.addEventListener('resize', this.updateDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions);
  }

  updateDimensions() {
    this.setState({ height: window.innerHeight });
  };

  render() {
    const { height } = this.state;
    const { theme } = this.props;
    return (
      <div className="app">
        <div className="bg" style={{...themeStyles[theme], height }} />
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
  }
}

const mapStateToProps = (state) => ({
  theme: state.auth.theme
});

export default connect(mapStateToProps)(AppRouter);