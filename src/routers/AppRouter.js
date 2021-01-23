import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import LoginPage from '../components/LoginPage';
import EditorPage from '../components/EditorPage';
import ArchivePage from '../components/ArchivePage';
import Header from '../components/Header';
import Navbar from '../components/Navbar';

const AppRouter = () => (
    <BrowserRouter>
      <div>
        <Header />
        <Navbar />
        <Switch>
          <Route path="/" component={LoginPage} exact={true} />
          <Route path="/write" component={EditorPage} />
          <Route path="/archive" component={ArchivePage} />
        </Switch>
      </div>
    </BrowserRouter>
);

export default AppRouter;