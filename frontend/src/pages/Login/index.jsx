import { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";
import { Box, Container, Icon, IconButton, InputAdornment, Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Logo from '../../components/Logo';
import { useNavigate } from "react-router-dom";


const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { login } = useAuth();
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

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
                                <TextField 
                                    {...register("email", {
                                        required: "Email é obrigatório",
                                        pattern: {
                                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                            message: "Digite um email válido"
                                        }
                                    })}
                                    label="Email"
                                    error={!!errors.email}
                                    helperText={errors.email?.message}
                                />
                                <TextField 
                                    {...register("password", { 
                                        required: "Senha é obrigatória",
                                    })}
                                    label="Senha"
                                    error={!!errors.password}
                                    helperText={errors.password?.message}
                                    type={showPassword ? 'text' : 'password'}
                                    slotProps={{
                                        input: {
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                                                        {showPassword ? <Icon color="primary">visibility_off</Icon> : <Icon color="primary">visibility</Icon>}
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                        },
                                    }}
                                />
                                <Button type="submit" variant="contained" size='large' sx={{ fontWeight: 700 }}>
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