import { Box, Icon, useTheme } from '@mui/material';

export const BgIcon = ({ icon, color = 'primary', size = 56 }) => {
    const theme = useTheme();
    const mainColor = theme.palette[color]?.main || theme.palette.primary.main;
    const lightColor = theme.palette[color]?.light || theme.palette.primary.light;

    return (
        <Box 
            sx={{
                bgcolor: lightColor, 
                width: size, 
                height: size, 
                display: "flex", 
                alignItems: "center", 
                justifyContent: "center", 
                borderRadius: 2,
            }}
        >
            <Icon sx={{ fontSize: '2rem', color: mainColor }}>
                { icon }
            </Icon>
        </Box>
    );
};