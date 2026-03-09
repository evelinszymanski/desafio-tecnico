import { useEffect, useRef, useState } from "react";
import { Grid, TextField } from "@mui/material";
import { EMPLOY_FILTERS } from "../../../mock/filters";
import Select from "../../../components/Select";
import Button from "../../../components/Button";

const Filters = ({ setFilters }) => {
    const timeoutRef = useRef(null);
    const emptyFilters = {
        search: "",
        status: "",
        department: "",
        employment_type: "",
        work_model: "",
    };
    const [showResetBtn, setShowResetBtn] = useState(false);
    const [tmpFilters, setTmpFilters] = useState(emptyFilters);

    const handleChange = (field) => (e) => {
        const value = e.target.value;
        setTmpFilters(prev => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleResetFilters = () => {
        setFilters("");
        setTmpFilters(emptyFilters)
        setShowResetBtn(false);
    };
    
    useEffect(() => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);

        timeoutRef.current = setTimeout(() => {
            const params = new URLSearchParams();
            Object.entries(tmpFilters).forEach(([key, value]) => {
                if (value) params.append(key, value);
            });
            setFilters(params.toString());
            if (!!params.toString()) {
                setShowResetBtn(true);
            };
        }, 300);
        
        return () => clearTimeout(timeoutRef.current);
    }, [tmpFilters, setFilters]);

    return (
        <>
            <Grid container size={12} spacing={2} component="section"> 
                <Grid size={{ xs: 12, md: 4 }}>
                    <TextField 
                        label="Buscar por nome ou cargo..."
                        value={tmpFilters.search}
                        fullWidth
                        onChange={handleChange("search")}
                        size="small"
                    />
                </Grid>
                <Grid size={{ xs: 6, md: 2 }}>
                    <Select 
                        label="Status"
                        value={tmpFilters.status}
                        options={EMPLOY_FILTERS.status}
                        onChange={handleChange("status")}
                    />
                </Grid>
                <Grid size={{ xs: 6, md: 2 }}>
                    <Select
                        label="Departamento"
                        value={tmpFilters.department}
                        options={EMPLOY_FILTERS.department}
                        onChange={handleChange("department")}
                    />
                </Grid>
                <Grid size={{ xs: 6, md: 2 }}>
                    <Select 
                        label="Tipo"
                        value={tmpFilters.employment_type}
                        options={EMPLOY_FILTERS.employment_type}
                        onChange={handleChange("employment_type")}
                    />
                </Grid>
                <Grid size={{ xs: 6, md: 2 }}>
                    <Select 
                        label="Modelo"
                        value={tmpFilters.work_model}
                        options={EMPLOY_FILTERS.work_model}
                        onChange={handleChange("work_model")}
                    />
                </Grid>
            </Grid>
            <Grid container size={12} sx={{ display: showResetBtn ? 'flex' : 'none'}}>
                <Button 
                    icon="clear"
                    size="small"
                    variant="outlined"
                    onClick={() => handleResetFilters()}
                >
                    Limpar filtros
                </Button>
            </Grid>
        </>
    )
};

export default Filters;