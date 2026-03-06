import { Avatar, Box, Menu, MenuItem, IconButton, ListItemIcon, Icon } from "@mui/material";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { MOCK_USER } from "../mock/user";
import Logo from "./Logo";
import logoWhite from '../assets/logo-short-white.png'

const Header = () => {
    const { setAuthenticated } = useAuth();
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const navigate = useNavigate();

    const handleOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
        
    };

    const handleLogout = () => {
        handleClose();
        setAuthenticated(false);
        navigate('/login', { replace: true });
    };

    return (
        <Box 
            component="header"
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            py={1}
            px={4}
            bgcolor="primary.main"
        >
            <Logo src={logoWhite} h={60} />
            <IconButton
                onClick={handleOpen}
                size="small"
                sx={{ ml: 2 }}
                aria-controls={open ? 'account-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
            >
                <Avatar 
                    src="/avatar.png"
                    alt={MOCK_USER.name}
                    sx={{ backgroundColor: "primary.light" }}
                />
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
            >
                <MenuItem onClick={handleLogout}>
                    <ListItemIcon>
                        <Icon>logout</Icon>
                    </ListItemIcon>
                    Desconectar
                </MenuItem>
            </Menu>
        </Box>
    )
};

export default Header;