export const theme = {
  palette: {
    primary: {
      main: '#1E293B',
      light: '#c8d4e6',
      dark: '#0F172A',
      contrastText: '#FFFFFF'
    },
    secondary: {
      main: '#2DD4BF',
      light: '#b1ece3',
      dark: '#14B8A6',
      contrastText: '#0F172A'
    },
     success: {
      main: '#16A34A',
      light: '#86EFAC',
      dark: '#15803D',
      contrastText: '#FFFFFF'
    },
    warning: {
      main: '#F59E0B',
      light: '#FCD34D',
      dark: '#D97706',
      contrastText: '#0F172A'
    },
    error: {
      main: '#DC2626',
      light: '#FCA5A5',
      dark: '#B91C1C',
      contrastText: '#FFFFFF'
    },
  }
};

export const TableTheme = {
  '& .MuiDataGrid-columnHeaderTitle': {
    fontWeight: 700,
  },
  
  '& .MuiDataGrid-columnHeader': {
    backgroundColor: 'grey.100',
  },

  '& .MuiTablePagination-displayedRows': {
    color: 'grey.700',
  },

  '& .MuiDataGrid-cell, & .MuiDataGrid-columnHeader': {
    '&:focus': { outline: 'none' },
  },

  '& .MuiDataGrid-cell': {
    whiteSpace: 'normal',
    wordBreak: 'break-word',
  },

  '& .MuiDataGrid-cellContent': {
    whiteSpace: 'normal',
  },

  '& .MuiDataGrid-cell:focus, & .MuiDataGrid-cell:focus-within': {
      outline: 'none',
    },
    
  '& .MuiDataGrid-cell button:focus': {
    outline: 'none',
  }
}
