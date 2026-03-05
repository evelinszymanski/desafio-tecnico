import { Grid } from "@mui/material";
import Widget from "../../../components/Widget";

const Widgets = ({ data }) => {
    return (
        <Grid container size={12} spacing={2} component="section">
            <Grid size={{ xs: 6, md: 3 }}>
                <Widget data={data.total} subtitle="Total" iconType="people" iconColor="primary" />
            </Grid>
            <Grid size={{ xs: 6, md: 3 }}>
                <Widget data={data.active} subtitle="Ativos" iconType="how_to_reg" iconColor="success" />
            </Grid>
            <Grid size={{ xs: 6, md: 3 }}>
                <Widget data={data.absent} subtitle="Ausentes" iconType="person_remove" iconColor="warning" />
            </Grid>
            <Grid size={{ xs: 6, md: 3 }}>
                <Widget data={data.departments} subtitle="Departamentos" iconType="corporate_fare" iconColor="secondary" />
            </Grid>
        </Grid>
    )
};

export default Widgets;