import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';
import CreateOutlinedIcon from '@material-ui/icons/CreateOutlined';
import DescriptionOutlinedIcon from '@material-ui/icons/DescriptionOutlined';
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';
import ExitToAppOutlinedIcon from '@material-ui/icons/ExitToAppOutlined';

const Navbar = () => (
    <div className="navbar">
        <Link to="/write"><Button><CreateOutlinedIcon /></Button></Link>
        <Link to="/archive"><Button><DescriptionOutlinedIcon /></Button></Link>
        <Link to="/settings"><Button><SettingsOutlinedIcon /></Button></Link>
        <Button style={{float: "right"}}><ExitToAppOutlinedIcon /></Button>
    </div>
);

export default Navbar;