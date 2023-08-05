const containerStyle = {
    position: "absolute",
    bottom: "75px",
    left: '0',
    right: '0',
    width: "100%",
    margin: "auto",
    textAlign: "center",
    zIndex: '2147483647'
} as const;

const subTitleWrapperStyle = {
    display: "inline-block",
    backgroundColor: "transparent",
    fontWeight: '900',
    marginLeft: "0",
    marginRight: "0",
    border: "none",
    cursor: "pointer",
    userSelect: "none",
} as const

const subTitleAreaStyle = {
    display: 'flex',
    flexDirection: 'column',
    margin: '0',
} as const;

const subTitleTextStyle = {
    display: 'inline-block',
    margin: '7px 10px 7px 10px',
    textAlign: 'center',
} as const;

export { containerStyle, subTitleAreaStyle, subTitleTextStyle, subTitleWrapperStyle }