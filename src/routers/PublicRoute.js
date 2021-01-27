import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import Header from '../components/Header';

const PublicRoute = ({ component: Component, isAuthenticated, ...rest }) => (
    <Route {...rest} component={(props) => (
        isAuthenticated ? (
            <Redirect to="/write" />
        ) : (    
            <div>
                <Header />
                <Component {...props} />
            </div>
            )
    )}
    />
);

const mapStateToProps = (state) => ({
    isAuthenticated: !!state.auth.user
});

export default connect(mapStateToProps)(PublicRoute);