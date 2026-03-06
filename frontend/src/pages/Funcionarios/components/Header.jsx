import { Box, Grid, Stack, Typography } from "@mui/material";
import { BgIcon } from "../../../components/BgIcon";
import Button from "../../../components/Button";

const Header = ({ handleOpen }) => {
    return (
        <Grid size={12} container component="header" display="flex" flexDirection={{ xs: "column", md: "row" }} >
            <Grid size={{ xs: 12, md: 6 }} display="flex" alignItems="center" gap={2}>
                <BgIcon icon="people" color="primary" />
                <Stack>
                    <Typography variant="h4" component="h1" fontWeight={600}>
                        Funcionários
                    </Typography>
                    <Typography variant="body2" color="grey.600">
                        Visão geral dos funcionários cadastrados
                    </Typography>
                </Stack>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
                <Box justifySelf="end">
                    <Button icon="add" size="large" onClick={() => handleOpen(null, "create")}>
                        Novo Funcionário
                    </Button>
                </Box>
            </Grid>
        </Grid>
    )
};

export default Header;