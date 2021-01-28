import React from 'react';
import { connect } from 'react-redux';
import { startSetTheme } from '../actions/auth';
import themeStyles from '../themes';

const SettingsPage = ({ theme, startSetTheme }) => {
    const themeOptions = Object.keys(themeStyles).map((theme) => (
        <option
            key={theme}
            value={theme}
        >
            {theme}
        </option>
    ));
    return (
        <div style={{ marginTop: 30 }}>
            <label>Theme</label>
            <select
                value={theme}
                onChange={(e) => startSetTheme(e.target.value)}
            >
                {themeOptions}
            </select>
        </div>
    );
}

const mapStateToProps = (state) => ({
    theme: state.auth.theme
});

const mapDispatchToProps = (dispatch) => ({
    startSetTheme: (theme) => dispatch(startSetTheme(theme))
});

export default connect(mapStateToProps, mapDispatchToProps)(SettingsPage);