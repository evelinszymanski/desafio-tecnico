import { Box, Chip, Icon, IconButton, Stack, Tooltip, Typography } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import moment from "moment";
import { chipTheme } from "./styles";

export const columns = (handleOpen) => [
    { 
        field: 'name',
        headerName: 'Funcionário',
        flex: 1,
        minWidth: 200,
        renderCell: (params) => {
            return (
                <Stack justifyContent="center" height="100%">
                    <Typography>
                        {params?.value}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                        {params?.row?.email}
                    </Typography>
                </Stack>
            )
        }
    },
    { 
        field: 'role',
        headerName: 'Cargo',
        flex: 1,
        minWidth: 120 
    },
    { 
        field: 'department',
        headerName: 'Departamento',
        flex: 1,
        minWidth: 120
    },
    { 
        field: 'admission_date',
        headerName: 'Admissão',
        flex: 0.8,
        minWidth: 120,
        renderCell: (params) => {
            return (
                params.value ? moment(params.value).format('DD/MM/YYYY') : params.value
            )
        }
    },
    { 
        field: 'work_model',
        headerName: 'Modelo',
        flex: 0.8,
        minWidth: 120,
        renderCell: (params) => {
            const icons = {
                remoto: 'home',
                hibrido: 'compare_arrows',
                presencial: 'corporate_fare',
            };
            return (
                <Chip
                    label={params.value}
                    size="small"
                    sx={(theme) => chipTheme[params.value]?.(theme)}
                    icon={<Icon color="inherit">{icons[params.value]}</Icon>}
                />
            );
        },
    },
    { 
        field: 'employment_type',
        headerName: 'Tipo',
        flex: 0.8,
        minWidth: 120 
    },
    {
        field: "status",
        headerName: "Status",
        flex: 0.8,
        minWidth: 80,
        renderCell: (params) => {
            return (
                <Chip
                    label={params.value}
                    size="small"
                    sx={(theme) => chipTheme[params.value]?.(theme)}
                />
            );
        },
    },
    {
        field: 'actions',
        headerName: 'Ações',
        minWidth: 100,
        renderCell: (params) => 
        <Box display="flex">
            <Tooltip title="Editar" arrow>
                <IconButton color="primary" onClick={() => handleOpen(params.id, "edit")}>
                    <EditIcon fontSize="inherit" />
                </IconButton>
            </Tooltip>
            <Tooltip title="Excluir" arrow>
                <IconButton color="error" onClick={() => handleOpen(params.id, "delete")}>
                    <DeleteIcon fontSize="inherit" />
                </IconButton>
            </Tooltip>
        </Box>
    },
];