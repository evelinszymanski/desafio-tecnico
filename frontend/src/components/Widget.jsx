import { Box, Card, Paper, Typography } from "@mui/material";
import { BgIcon } from "./BgIcon";

const Widget = ({ data, subtitle, iconType, iconColor }) => {
    const styles = {
        display: 'flex',
        height:80,
        alignItems: 'center',
        gap: 2,
        px: 2,
        border: '1px solid',
        borderColor: 'grey.200',
        borderRadius: 2,
        bgcolor: 'background.paper',
    };

    return (
        <Box sx={styles}>
            <BgIcon icon={iconType} color={iconColor}/>
            <Box>
                <Typography variant="h5" fontWeight={600}>
                    {data}
                </Typography>
                <Typography variant="body2" color="grey.600">
                    {subtitle}
                </Typography>
            </Box>
        </Box>
    )
};

export default Widget;