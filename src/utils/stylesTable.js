
import { defaultThemes } from 'react-data-table-component';

export const paginationOpciones = {
    rowsPerPageText: 'Filas por Página',
    rangeSeparatorText: 'de',
    selectAllRowsItem: true,
    selectAllRowsItemText: 'Todos'
}
export const customStyles = {
        header: {
            style: {
            minHeight: '56px',
            },
        },
        headRow: {
            style: {
            borderTopStyle: 'solid',
            borderTopWidth: '1px',
            borderTopColor: defaultThemes.default.divider.default,  
            },
        },
        headCells: {
            style: {
            // '&:not(:last-of-type)': {
                borderRightStyle: 'solid',
                borderRightWidth: '1px',
                borderRightColor: defaultThemes.default.divider.default,
                backgroundColor: 'rgba(207, 206, 205, 0.9)',
            // },
            },
        },
        // cells: {
        //     style: {
                
        //     '&:not(:last-of-type)': {
        //         // '&:nth-of-type(odd)':{
        //         borderRightStyle: 'solid',
        //         borderRightWidth: '1px',
        //         borderRightColor: defaultThemes.default.divider.default,
        //         backgroundColor: 'rgba(193, 217, 249, 0.9)',
        //         // columns={columns}
        //         // columns={columns}
        //     },
        //     },
        // },
        rows: {
            style:{
        //     '&:not(:last-of-type)': {
                '&:nth-of-type(odd)':{
                    borderRightStyle: 'solid',
                    borderRightWidth: '1px',
                    borderRightColor: defaultThemes.default.divider.default,
                    backgroundColor: 'rgba(220, 233, 250, 0.5)',
                }               
            }
        }
};