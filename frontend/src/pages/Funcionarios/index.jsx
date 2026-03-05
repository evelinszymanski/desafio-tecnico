import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { endpoints } from "../../services/endpoints";
import { toast } from "react-toastify";
import { Box, Container, Drawer, Grid, IconButton, Tooltip } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Header from "./components/Header";
import Widgets from "./components/Widgets";
import Filters from "./components/Filters";
import Table from "../../components/Table";
import Form from "./components/Form";
import Dialog from "../../components/Dialog";

const Funcionarios = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [employees, setEmployees] = useState([]);
    const [openForm, setOpenForm] = useState(false);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [employee, setEmployee] = useState(null);
    const [filters, setFilters] = useState('');
    const [widgetsData, setWidgetsData] = useState({
        total: 0,
        active: 0,
        absent: 0,
        departments: 4,
    });

    const fetchEmployees = async (filters) => {
        const url = filters 
            ? `${endpoints.funcionarios}?${filters}`
            : endpoints.funcionarios;

        try {
            const response = await fetch(url);
            const responseJson = await response.json();
            const data = responseJson.data || [];

            setEmployees(data);
            setWidgetsData(prev => ({
                ...prev,
                total: data.length,
                active: data.filter(emp => emp.status === 'ativo').length,
                absent: data.filter(emp => emp.status === 'ausente').length,
            }));
        } catch (error) {
            console.error('Error:', error);
            toast.error(error.message);  
        };
    };

    const handleOpen = (tmpEmployeeId, type) => {
        const employee = employees.find(emp => emp._id === tmpEmployeeId);
        setEmployee(employee);

        if (type === "create") {
            setEmployee(undefined);
            setOpenForm(true);
        };

        if (type === "edit") {
            navigate(`/funcionarios/${tmpEmployeeId}`, { replace: true });
            setOpenForm(true);
        };

        if (type === "delete") {
            setOpenDeleteDialog(true);
        };
    };

    const handleCloseForm = () => {
        setEmployee(undefined);
        setOpenForm(false);
        navigate(`/funcionarios`, { replace: true });
    };

    const deleteEmploy = async (employeeId) => {
        try {
            const response = await fetch(`${endpoints.funcionarios}/${employeeId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            
            if (!response.ok) {
                throw new Error('Erro ao excluir funcionário.');
            };

            toast.success("Funcionário excluído com sucesso!");
            fetchEmployees();
        } catch (error) {
            console.error('error:', error);
            toast.error(error.message);
        };
    };

    const saveEmploy = async (body) => {
        const url = id ? `${endpoints.funcionarios}/${id}` : endpoints.funcionarios;
        const method = id ? 'PATCH' : 'POST';
        
        try {
            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Falha na criação de funcionário.');
            };

            toast.success(`Funcionário ${id ? 'editado' : 'criado'} com sucesso!`);
            fetchEmployees(); 
            handleCloseForm();
        } catch (error) {
            console.error('error:', error);
            toast.error(error.message)
        };
    };

    const columns = [
        { field: 'name', headerName: 'Funcionário', flex: 1, minWidth: 150 },
        { field: 'role', headerName: 'Cargo', flex: 1, minWidth: 120 },
        { field: 'department', headerName: 'Departamento', flex: 1, minWidth: 120 },
        { field: 'admission_date', headerName: 'Admissão', flex: 0.8, minWidth: 120 },
        { field: 'work_model', headerName: 'Modelo', flex: 0.8, minWidth: 120 },
        { field: 'employment_type', headerName: 'Tipo', flex: 0.8, minWidth: 120 },
        { field: 'status', headerName: 'Status', flex: 0.8, minWidth: 100 },
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

    useEffect(() => {
        fetchEmployees();
    }, []);

    useEffect(() => {
        fetchEmployees(filters);
    }, [filters]);

    return (
        <Container maxWidth="xl" sx={{ py: 4 }}>
            <Grid container spacing={4}>
                <Header handleOpen={handleOpen}/>
                <Widgets data={widgetsData}/>
                <Filters setFilters={setFilters}/>
                <Grid size={12} component="section">
                    <Table columns={columns} rows={employees} />
                </Grid>
            </Grid>
            <Dialog 
                open={openDeleteDialog}
                setOpen={setOpenDeleteDialog}
                title={"Deseja realmente excluir?"}
                content={<>O funcionário <strong>{employee?.name}</strong> será excluído permanentemente.</>}
                confirmText={"Sim, desejo excluir!"}
                confirmFunction={() => {deleteEmploy(employee?._id)}}
            />
            <Drawer open={openForm} onClose={() => handleCloseForm()} anchor="right">
                <Form 
                    data={employee}
                    closeForm={() => handleCloseForm()}
                    saveForm={saveEmploy}
                />
            </Drawer>
        </Container>
    )
};

export default Funcionarios;