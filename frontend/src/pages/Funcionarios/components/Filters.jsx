import { useEffect, useRef, useState } from "react";
import { Grid, TextField } from "@mui/material";
import { EMPLOY_FILTERS } from "../../../mock/filters";
import Select from "../../../components/Select";

const Filters = ({ setFilters }) => {
    const timeoutRef = useRef(null);
    const [tmpFilters, setTmpFilters] = useState({
        search: "",
        status: "",
        department: "",
        employment_type: "",
        work_model: "",
    });

    const handleChange = (field) => (e) => {
        const value = e.target.value;
        setTmpFilters(prev => ({
            ...prev,
            [field]: value,
        }));
    };
    
    useEffect(() => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);

        timeoutRef.current = setTimeout(() => {
            const params = new URLSearchParams();
            Object.entries(tmpFilters).forEach(([key, value]) => {
                if (value) params.append(key, value);
            });
            setFilters(params.toString());
        }, 300);

        return () => clearTimeout(timeoutRef.current);
    }, [tmpFilters, setFilters]);

    return (
        <Grid container size={12} spacing={2} component="section"> 
            <Grid size={{ xs: 12, md: 4 }}>
                <TextField 
                    label="Buscar por nome ou cargo..."
                    fullWidth
                    onChange={handleChange("search")}
                    size="small"
                />
            </Grid>
            <Grid size={{ xs: 6, md: 2 }}>
                <Select 
                    label="Status"
                    options={EMPLOY_FILTERS.status}
                    onChange={handleChange("status")}
                />
            </Grid>
            <Grid size={{ xs: 6, md: 2 }}>
                <Select
                    label="Departamento"
                    options={EMPLOY_FILTERS.department}
                    onChange={handleChange("department")}
                />
            </Grid>
            <Grid size={{ xs: 6, md: 2 }}>
                <Select 
                    label="Tipo"
                    options={EMPLOY_FILTERS.employtment_type}
                    onChange={handleChange("employment_type")}
                />
            </Grid>
            <Grid size={{ xs: 6, md: 2 }}>
                <Select 
                    label="Modelo"
                    options={EMPLOY_FILTERS.work_model}
                    onChange={handleChange("work_model")}
                />
            </Grid>
        </Grid>
    )
};

export default Filters;