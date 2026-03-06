import moment from "moment";
import { Avatar, Card, CardContent, CardHeader, Icon, List, ListItem, ListItemAvatar, ListItemText, Typography } from "@mui/material";
import { stringAvatar } from "../../../utils/stringAvatar";

const BirthdayCelebrants = ({ celebrants }) => {
    const currentMonth = moment().format('MMMM');
    
    const calculateDaysLeft = (birthday) => {
        if (!birthday) return "";
        
        const today = moment().startOf('day');
        const birthdayThisYear = moment(birthday).year(today.year()).startOf('day');
        
        if (birthdayThisYear.isBefore(today)) {
            return `Já passou`
        };

        const diff = birthdayThisYear.diff(today, 'days');
        
        if (diff === 0) return "É hoje!";
        if (diff === 1) return "Amanhã!";
        return `Em ${diff} dias`;
    };

    return (
        <Card sx={{ flex: 1 }}>
            <CardHeader 
                avatar={<Icon>celebration</Icon>}
                title={`Aniversariantes de ${currentMonth}`}
                slotProps={{
                    title: {
                        fontWeight: 700,
                        fontSize: 16,
                        textTransform: 'capitalize'
                    }
                }}
                sx={{
                    backgroundColor: 'secondary.light',
                    color: "primary.main",
                }}
            />
            <CardContent sx={{ maxHeight: 320, overflowY: 'auto' }}>
                <List disablePadding>
                    {celebrants.map((celebrant) => (
                        <ListItem 
                            key={celebrant._id}
                            divider
                            dense
                            disableGutters
                        >
                            <ListItemAvatar>
                                <Avatar 
                                    {...stringAvatar(celebrant.name)}
                                    sizes="small" 
                                    alt="Avatar do funcionário."
                                />
                            </ListItemAvatar>
                            <ListItemText 
                                primary={celebrant.name}
                                secondary={moment(celebrant.birthday).format("DD/MM/YYYY")}
                            />
                            <Typography variant="caption" color="text.secondary">
                                {calculateDaysLeft(celebrant.birthday)}
                            </Typography>
                        </ListItem>
                    ))}
                </List>
            </CardContent>
        </Card>
    )
};

export default BirthdayCelebrants;