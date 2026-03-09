import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Container, Drawer, Grid, Stack } from "@mui/material";
import { endpoints } from "../../services/endpoints";
import { columns } from "./table/columns";
import Header from "./components/Header";
import Widgets from "./components/Widgets";
import Filters from "./components/Filters";
import Table from "../../components/Table";
import Form from "./components/Form";
import Dialog from "../../components/Dialog";
import BirthdayCelebrants from "./components/BirthdayCelebrants";
import DepartmentsChart from "./components/DepartmentsChart";

const Funcionarios = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [employees, setEmployees] = useState([]);
    const [filteredEmployees, setFilteredEmployees] = useState([]);
    const [birthdayCelebrants, setBirthdayCelebrants] = useState([]);
    const [openForm, setOpenForm] = useState(false);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [employee, setEmployee] = useState(null);
    const [filters, setFilters] = useState('');
    const [loading, setLoading] = useState(false);
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
            setLoading(true);
            const response = await fetch(url);
            const responseJson = await response.json();
            const data = responseJson.data || [];

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Falha ao carregar funcionários.');
            };

            setFilteredEmployees(data);
            if (!filters) {
                setEmployees(data);
                setWidgetsData(prev => ({
                    ...prev,
                    total: responseJson.total,
                    active: data.filter(emp => emp.status === 'ativo').length,
                    absent: data.filter(emp => emp.status === 'ausente').length,
                }));
            };
        } catch (error) {
            console.error('Error:', error);
            toast.error(error.message);
        } finally {
            setLoading(false);
        };
    };

    const fetchBirthdayCelebrants = async () => {
        try {
            const response = await fetch(endpoints.aniversariantes);
            const responseJson = await response.json();
            const data = responseJson.data || [];
            
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Falha ao carregar aniversariantes do mês.');
            };

            setBirthdayCelebrants(data);
        } catch (error) {
            console.error('error:', error);
            toast.error(error.message);
        };
    };

    const handleOpen = (tmpEmployeeId, type) => {
        const employee = filteredEmployees.find(emp => emp._id === tmpEmployeeId);
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
                const errorData = await response.json();
                throw new Error(errorData.message || 'Falha ao excluir funcionário.');
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

    useEffect(() => {
        fetchBirthdayCelebrants();
    }, [])

    useEffect(() => {
        fetchEmployees(filters);
    }, [filters]);

    return (
        <Container maxWidth="xl" sx={{ py: 4 }}>
            <Grid container spacing={4}>
                <Header handleOpen={handleOpen} />
                <Widgets data={widgetsData} />
                <Grid 
                    size={12}
                    container
                    spacing={2}
                    component="section"
                    flexDirection={{ xs: "column", md: "row" }} 
                >
                    <Grid size={{ xs: 12, md: 9}}>
                        <Stack gap={4}>
                            <Filters setFilters={setFilters} />
                            <Table 
                                columns={columns(handleOpen)}
                                rows={filteredEmployees}
                                loading={loading}
                            />
                        </Stack>
                    </Grid>
                    <Grid size={{ xs: 12, md: 3}}>
                        <Stack gap={2}>
                            <DepartmentsChart employees={employees} />
                            <BirthdayCelebrants celebrants={birthdayCelebrants} />
                        </Stack>
                    </Grid>
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