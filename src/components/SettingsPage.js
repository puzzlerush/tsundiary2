import React from 'react';
import { connect } from 'react-redux';
import { startSetTheme, startSetPrivate, startSetPublic } from '../actions/auth';
import themeStyles from '../themes';

const SettingsPage = ({
    theme,
    startSetTheme,
    privacy,
    startSetPrivate,
    startSetPublic
}) => {
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
            <p>
                <label>Theme</label>
                <select
                    value={theme}
                    onChange={(e) => startSetTheme(e.target.value)}
                >
                    {themeOptions}
                </select>
            </p>

            <p>
                <label>Privacy</label>
                <select
                    value={privacy ? 'Private' : 'Public'}
                    onChange={(e) => {
                        if (e.target.value === 'Private') {
                            startSetPrivate();
                        } else if (e.target.value === 'Public') {
                            startSetPublic();
                        }
                    }}
                >
                    <option value="Private">Private</option>
                    <option value="Public">Public</option>
                </select>
            </p>
        </div>
    );
}

const mapStateToProps = (state) => ({
    theme: state.auth.theme,
    privacy: state.auth.privacy
});

const mapDispatchToProps = (dispatch) => ({
    startSetTheme: (theme) => dispatch(startSetTheme(theme)),
    startSetPrivate: () => dispatch(startSetPrivate()),
    startSetPublic: () => dispatch(startSetPublic())
});

export default connect(mapStateToProps, mapDispatchToProps)(SettingsPage);