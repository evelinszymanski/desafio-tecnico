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
            pageSizeOptions={[5]}
            initialState={{
                pagination: {
                    paginationModel: { pageSize: 10, page: 0 },
                }
            }}
            localeText={{
                noRowsLabel: 'Nenhum funcionário encontrado',
            }}

        />
    )
};

export default Table;