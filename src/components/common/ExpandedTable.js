import React, { useEffect, useState } from 'react';

import { useSelector } from 'react-redux';
import DataTable from 'react-data-table-component';

import { customStyles, paginationOpciones } from '../../utils/stylesTable';

export const ExpandedTable = ({data, filterOnlyStock}) => {
    const { user_id, Location } = data;
    const { paisElegido } = useSelector(state => state.ui);
    const [maquinasAsig, setMaquinasAsig] = useState([]);
    useEffect(() => {
        if(paisElegido.length !== 0) {
            const datos = paisElegido.filter(dataPersona => dataPersona.User_ID === user_id && dataPersona.Location === Location );
            if(filterOnlyStock){
                const personWithMachineOperation = datos.filter(dataPersona => dataPersona.Operational_status === 'In stock' )
                setMaquinasAsig(personWithMachineOperation)
            }else{
                const personWithMachineOperation = datos.filter(dataPersona => dataPersona.Operational_status ==='In use' || dataPersona.Operational_status === 'In stock' )
                setMaquinasAsig(personWithMachineOperation)
            }
        }
    }, [paisElegido, Location, user_id,filterOnlyStock])
    const columns = [
        {
            name: 'Número de Serie',
            selector:'Serial_number',
            sortable: true,
           
        },
        {
            name: 'Estado',
            selector:'Operational_status',
            sortable: true,
        },
        {
            name: 'Modelo',
            selector:'Model_ID',
            sortable: true,
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
