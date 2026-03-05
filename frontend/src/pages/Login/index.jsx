import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Box, Container, Typography, Stack } from '@mui/material';
import Logo from '../../components/Logo';
import Button from "../../components/Button";
import RHFInput from "../../components/RHFInput";


const Login = () => {
    const { control, handleSubmit } = useForm();
    const { login } = useAuth();
    const navigate = useNavigate();

    const onSubmit = handleSubmit(async (data) => {
        try {
            const response = await login(data.email, data.password);
            if (response) {
                setTimeout(() => {
                    navigate('/funcionarios', { replace: true });
                }, 1000);
            };
        } catch (error) {
            console.log('error:', error);
            toast.error("Ocorreu um erro ao tentar fazer login. Por favor, tente novamente.");
        };
    });

    return (
        <Box display="flex" height="100vh">
            <Box
                component="section"
                sx={{
                    flex: 1,
                    display: { xs: 'none', md: 'block' },
                    backgroundImage: 'url(/background.svg)',
                    backgroundSize: 'contain',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    px: 24,
                }}
            />
            <Box 
                component="section"
                sx={{
                    flex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    px: 4,
                }}
            >
                <Container maxWidth="sm">
                    <Stack spacing={4} >
                        <Box textAlign="center">
                            <Logo />
                            <Typography>
                                Bem-vindo de volta! Por favor, faça login para continuar.
                            </Typography>
                        </Box>
                        <Box component="form" onSubmit={onSubmit}>
                            <Stack spacing={4} justifyContent="center">
                                <RHFInput 
                                    control={control}
                                    name="email"
                                    label="Email"
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
                                    control={control}
                                    name="password"
                                    label="Senha"
                                    type="password"
                                />
                                <Button type="submit" size='large'>
                                    Entrar
                                </Button>
                            </Stack>
                        </Box>
                    </Stack>
                </Container>
            </Box>
        </Box>
    );
};

export default Login;