const Logo = ({ img = "/logo.png", h=240 }) => {
    return (
        <img src={img} alt="Logo" height={h} />
    )
};

export default Logo;