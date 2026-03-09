import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Box, Stack, Typography } from "@mui/material";
import { EMPLOY_FILTERS } from "../../../mock/filters";
import { preparePatch } from "../../../utils/preparePatch";
import { BgIcon } from "../../../components/BgIcon";
import RHFInput from "../../../components/RHFInput";
import Button from "../../../components/Button";
import moment from "moment";

const Form = ({ data, closeForm, saveForm }) => {
    const { 
        control, 
        handleSubmit, 
        reset,
    } = useForm({
        defaultValues: {
            _id: "",
            name: "",
            email: "",
            role: "",
            department: "",
            admission_date: "",
            birthday: "",
            work_model: "",
            employment_type: "",
            status: "",
        }
    });

    useEffect(() => {
        if (data) {
            reset({
                _id: data._id || "",
                name: data.name || "",
                email: data.email || "",
                role: data.role || "",
                department: data.department || "",
                admission_date: data.admission_date ? moment(data.admission_date) : null,
                birthday: data.birthday ? moment(data.birthday) : null,
                work_model: data.work_model || "",
                employment_type: data.employment_type || "",
                status: data.status || "",
            });
        }
    }, [data, reset]);

    const handleFormSubmit = (formData) => {
        const formattedForm = {
            ...formData,
            admission_date: formData?.admission_date.isValid()
                ? formData.admission_date.format("YYYY-MM-DD") 
                : '',
            birthday: formData?.birthday?.isValid() 
                ? formData.birthday.format("YYYY-MM-DD") 
                : '',
            birth_month: formData?.birthday.isValid() 
                ? (formData.birthday.month() + 1) 
                : null,
        };

        const body = preparePatch(data, formattedForm);

        if (Object.keys(body).length > 0) {
            saveForm(body);
        } else {
            toast.info("Não há alterações para salvar.")
        };
    };

    return (
        <Stack 
            component="form" 
            onSubmit={handleSubmit(handleFormSubmit)} 
            sx={{ height: '100%', width: { xs: '90vw', sm: 500 }, p: 4, gap: 4 }}
        >
            <Box component="header" display="flex" alignItems="center" gap={2}>
                <BgIcon icon={ data ? "edit" : "add" } color="secondary"/>
                <Typography variant="h5" fontWeight={700}>
                    { data ? 'Editar funcionário' : 'Novo funcionário' }
                </Typography>
            </Box>
            <Stack flex={1} py={1} gap={2} sx={{ overflowY: 'auto' }}>
                <RHFInput
                    name="name"
                    label="Nome"
                    control={control}
                    type="text"
                />
                <RHFInput
                    name="email"
                    label="Email"
                    control={control}
                    type="text"
                    rules={{ 
                        required: "Email é obrigatório",
                        pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: "Email inválido"
                        }
                    }}
                />
                <RHFInput
                    name="role"
                    label="Cargo"
                    control={control}
                    type="text"
                />
                <RHFInput
                    name="department"
                    label="Departamento"
                    control={control}
                    options={EMPLOY_FILTERS.department}
                    type="select"
                />
                <Box display="flex" gap={2}>
                    <RHFInput
                        name="admission_date"
                        label="Data de admissão"
                        control={control}
                        type="date"
                    />
                    <RHFInput
                        name="birthday"
                        label="Data de nascimento"
                        control={control}
                        type="date"
                    />
                </Box>
                <RHFInput
                    name="work_model"
                    label="Modelo"
                    control={control}
                    options={EMPLOY_FILTERS.work_model}
                    type="select"
                />
                <RHFInput
                    name="employment_type"
                    label="Tipo"
                    control={control}
                    options={EMPLOY_FILTERS.employment_type}
                    type="select"
                />
                <RHFInput
                    name="status"
                    label="Status"
                    control={control}
                    options={EMPLOY_FILTERS.status}
                    type="select"
                />
            </Stack>
            <Box component="footer" display="flex" justifyContent="end" gap={2}>
                <Button color="light" onClick={closeForm} type="button">
                    Cancelar
                </Button>
                <Button type="submit">
                    Salvar
                </Button>
            </Box>
        </Stack>
    );
};

export default Form;