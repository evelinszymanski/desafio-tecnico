import { Box, Typography } from "@mui/material";
import { BgIcon } from "./BgIcon";
import CountUp from "react-countup";

const Widget = ({ data, subtitle, iconType, iconColor }) => {
    const styles = {
        display: 'flex',
        height:80,
        alignItems: 'center',
        gap: 2,
        px: 2,
        border: '1px solid',
        borderColor: 'grey.200',
        borderRadius: 1.5,
        bgcolor: 'background.paper',
    };

    return (
        <Box sx={styles}>
            <BgIcon icon={iconType} color={iconColor}/>
            <Box>
                <Typography variant="h5" fontWeight={600}>
                    <CountUp
                        end={data}
                        duration={1}
                    />
                </Typography>
                <Typography variant="body2" color="grey.600">
                    {subtitle}
                </Typography>
            </Box>
        </Box>
    )
};

export default Widget;