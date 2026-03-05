const Logo = ({ src = "/logo.png", h=240 }) => {
    return (
        <img src={src} alt="Logo" height={h} />
    )
};

export default Logo;