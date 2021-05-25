import React, { useEffect, useState } from 'react';

import { useSelector } from 'react-redux';
import DataTable from 'react-data-table-component';

import { customStyles, paginationOpciones } from '../../utils/stylesTable';

export const ExpandedTable = ({data}) => {
    const { name, Location } = data;
    const { paisElegido } = useSelector(state => state.ui);
    const [maquinasAsig, setMaquinasAsig] = useState([]);
    
    useEffect(() => {
        if(paisElegido.length != 0) {
            console.log(paisElegido)
            const datos = paisElegido.filter(dataPersona => dataPersona.Assigned_to === name && dataPersona.Location === Location );
            const personWithMachineOperation = datos.filter(dataPersona => dataPersona.Operational_status !='Retired' && dataPersona.Operational_status !== 'Non-Operational' )
            // console.log(datos);
            setMaquinasAsig(personWithMachineOperation)
        }
    }, [paisElegido])
    const columns = [
        {
            name: 'Número de Serie',
            selector:'Serial_number',
            sortable: true,
            // maxWidth: "100px"
        },
        // {
        //     name: 'Nombre',
        //     selector:'Assigned_to',
        //     sortable: true,
        //     // maxWidth: "100px"
        // },
        // {
        //     name: 'Código ciudad',
        //     selector:'Location',
        //     sortable: true,
        //     // maxWidth: "100px"
        // },
        {
            name: 'Estado',
            selector:'Operational_status',
            sortable: true,
            // maxWidth: "100px"
        },
    ]
    return (
        <div>
              {
                    (maquinasAsig.length !== 0)
                    ?  <div className="table-responsive table-expanded" >
                                <DataTable
                                    columns={ columns }
                                    data = { maquinasAsig }
                                    noHeader
                                    pagination
                                    paginationComponentOptions={ paginationOpciones }
                                    fixedHeader
                                    fixedHeaderScrollHeight='600px'
                                    customStyles={customStyles}
                                    dense
                                />
                        </div>
                    : <div></div>   
                }
        </div>
    )
}
