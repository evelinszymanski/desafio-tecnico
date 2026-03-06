import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { AuthProvider } from './context/AuthContext.jsx'
import { RouterProvider } from 'react-router-dom'
import { router } from './routes.jsx'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { ToastContainer } from 'react-toastify';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import 'moment/dist/locale/pt-br';
import moment from 'moment';
import { theme as customTheme } from './styles/theme.js';

const theme = createTheme(customTheme);
moment.locale("pt-br");

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterMoment} adapterLocale="pt-br">
        <AuthProvider>
          <RouterProvider router={router} />
          <ToastContainer theme='colored' closeOnClick autoClose={2000}/>
        </AuthProvider>
      </LocalizationProvider>
    </ThemeProvider>
  </StrictMode>
)
