const themeStyles = {
    'Default': {
        backgroundColor: '#ece6ec'
    },
    'Yukino Yukinoshita': {
        backgroundColor: "#d5eaf2",
        backgroundImage: "url(" + process.env.PUBLIC_URL + "/yukino.png" + ")",
        backgroundSize: "auto 100%",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "left"
    },
    'Yui Yuigahama': {
        backgroundColor: '#fadadd',
        backgroundImage: "url(" + process.env.PUBLIC_URL + "/yui.png" + ")",
        backgroundSize: "auto 100%",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "right"
    }
};

export default themeStyles;