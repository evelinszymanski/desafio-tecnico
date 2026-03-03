import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { AuthProvider } from './context/AuthContext.jsx'
import { RouterProvider } from 'react-router-dom'
import { router } from './routes.jsx'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { ToastContainer } from 'react-toastify';


const theme = createTheme({
  palette: {
    primary: {
      main: '#1E293B',
      light: '#334155',
      dark: '#0F172A',
      contrastText: '#FFFFFF'
    },
    secondary: {
      main: '#2DD4BF',
      light: '#5EEAD4',
      dark: '#14B8A6',
      contrastText: '#0F172A'
    }
  }
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <RouterProvider router={router} />
        <ToastContainer theme='colored' closeOnClick autoClose={2000}/>
      </AuthProvider>
    </ThemeProvider>
  </StrictMode>,
)
