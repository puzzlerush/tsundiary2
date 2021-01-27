import React from 'react';
import { connect } from 'react-redux';
import { CircularProgress } from '@material-ui/core';
import themeStyles from '../themes';

const LoadingPage = ({ theme }) => (
    <div className="app" style={themeStyles[theme]}>
        <div className="loader">
            <CircularProgress
                size={100}
                thickness={5}
                style={{ color: themeStyles[theme].backgroundColor }}
            />
        </div>
    </div>
);

const mapStateToProps = (state) => ({
    theme: state.auth.preferences.theme
});

export default connect(mapStateToProps)(LoadingPage);