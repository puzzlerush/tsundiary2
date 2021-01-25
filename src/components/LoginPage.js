import React from 'react';
import { connect } from 'react-redux';
import { Button } from '@material-ui/core';
import { startLogin } from '../actions/auth';

const LoginPage = ({ startLogin }) => (
    <div className="login">
        <Button size="large" variant="outlined" onClick={startLogin}>Log in with Google</Button>
    </div>
);

const mapDispatchToProps = (dispatch) => ({
    startLogin: () => dispatch(startLogin())
  });

export default connect(undefined, mapDispatchToProps)(LoginPage);