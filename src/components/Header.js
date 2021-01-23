import React from 'react';

const logoStyles = {
    backgroundImage: `url(${process.env.PUBLIC_URL}/logo-empty.svg)`,
    backgroundSize: "75px 75px",
    width: 75,
    height: 75,
    margin: "40px auto"
};

const Header = () => (
    <header 
        className="header"
        style={logoStyles}
    />

);

export default Header;