import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import LoginPage from '../components/LoginPage';
import EditorPage from '../components/EditorPage';
import Header from '../components/Header';

const AppRouter = () => (
    <BrowserRouter>
      <div>
        <Header />
        <Switch>
          <Route path="/" component={LoginPage} exact={true} />
          <Route path="/write" component={EditorPage} />
        </Switch>
      </div>
    </BrowserRouter>
);

export default AppRouter;