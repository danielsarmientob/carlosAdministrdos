import React from 'react';

import DataTable from 'react-data-table-component';
import { useDispatch, useSelector } from 'react-redux';

import { types } from '../../types/types';
import { columns } from '../../utils/columnsTable';
import { customStyles, paginationOpciones } from '../../utils/stylesTable';
import { TableRepeat } from './TableRepeat';

export const TableAdmin = () => {
    // Asset: "MXL0261C22 - HEWLETT-PACKARD CO ELITE 8000 SFF"
    // Assigned to: ""
    // Location: "AE07"
    // Manufacturer: "HP"
    // Name: "AE17DT0261C22"
    // Operational status: "Retired"
    // Schedule: ""
    // Serial number: "MXL0261C22"
    // Substatus: "Scrapped"
    // Support group: ""
    const dispatch = useDispatch();
    console.log('table');
    const perAsig = useSelector(state => state.pe);
    const {dataUi, nombrePais, paisElegido} = useSelector(state => state.ui);
    const changePais = (index)=>{
        const actionDataCompleta = {
            type: types.data,
            payload: {
                data: {
                    dataUi,
                    nombrePais: dataUi[index]['sheetName'],
                    paisElegido: dataUi[index]['data'],
                    personasAsig: perAsig[index]['data']
                }
            }
        }
        dispatch(actionDataCompleta);
    }
    return (
        <>  
            <div className="cont-paises">
                {
                    
                    dataUi.map((pais,index) =>(
                        <button
                            className="btn btn-primary"
                            style={{marginRight: "2px"}}
                            key={ index }
                            onClick={() => changePais(index)}
                        >
                            { pais['sheetName'] }
                        </button>
                    ))
                }
            </div>
            {
                (paisElegido.length !== 0)? <div className="title-report">{`Reporte ${ nombrePais }`}</div> : <div></div>
            }
            {/* {
                 (paisElegido.length !== 0)
                 ?  <div className="table-responsive" style={{padding:"10px"}}>
                            <DataTable
                                columns={ columns }
                                // data = {  (dataUi['0'] != undefined)? dataUi['0']['data'] : [] }
                                data = {  paisElegido }
                                title='Moreno'
                                pagination
                                paginationComponentOptions={ paginationOpciones }
                                fixedHeader
                                fixedHeaderScrollHeight='600px'
                                customStyles={customStyles}
                            
                            />
                    </div>
                : <div></div>
            } */}
            <TableRepeat/>
        </>
    )
}
