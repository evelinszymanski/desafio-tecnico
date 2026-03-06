import { DataGrid } from '@mui/x-data-grid';
import { tableTheme } from '../styles/theme';

const Table = ({ columns, rows }) => {
    return (
        <DataGrid
            disableColumnSelector
            disableColumnMenu
            disableColumnResize
            getRowId={(row) => row._id}
            rowSelection={false}
            rows={rows}
            columns={columns}
            sx={tableTheme}
            pageSizeOptions={[10]}
            initialState={{
                pagination: {
                    paginationModel: { pageSize: 10 },
                }
            }}
            localeText={{
                noRowsLabel: 'Nenhum funcionário encontrado',
            }}

        />
    )
};

export default Table;