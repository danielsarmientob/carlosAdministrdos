import React, { useEffect, useState } from 'react';

import { useSelector } from 'react-redux';
import DataTable from 'react-data-table-component';

import { customStyles, paginationOpciones } from '../../utils/stylesTable';
import { ExpandedTable } from './ExpandedTable';

export const TableStock = () => {
    const { paisElegido, personasAsig } = useSelector(state => state.ui);
    const [dataPer, setDataPer] = useState([]);
    const [personasVariasCitys, setPersonasVariasCitys] = useState([]);
    useEffect(() => {
        if( paisElegido.length > 0 && personasAsig.length > 0){
            let person = [];
            let personsVariasCitys = [];
            personasAsig.forEach((user_id)=>{
                let codigosCity = new Set();
                let name = '';
                const auxDatos = paisElegido.filter(({User_ID, Operational_status})=> User_ID === user_id && Operational_status === 'In stock');
                if(auxDatos.length > 0){
                    name = auxDatos[0]['Assigned_to']
                    auxDatos.forEach(({Location})=>{
                        codigosCity.add(Location)
                    });
                    if(codigosCity.size > 1){
                        for(let codigoCity of codigosCity){
                            const auxDato2 = paisElegido.filter(({User_ID, Operational_status,Location})=> User_ID === user_id && Operational_status === 'In stock' && Location === codigoCity);
                            const datoPerson = {
                                cont: auxDato2.length,
                                name,
                                user_id,
                                Location: codigoCity
                            }
                            personsVariasCitys = [...personsVariasCitys, datoPerson];
                        }
                    }else{
                        const datoPerson = {
                            cont: auxDatos.length,
                            name,
                            user_id,
                            Location: Array.from(codigosCity)[0],
                        }
                        person = [...person, datoPerson];
                    }
                }
            });
            setDataPer(person);
            setPersonasVariasCitys(personsVariasCitys);
        }
    }, [paisElegido, personasAsig]);
    const columns = [
        {
            name: 'Número de PCS',
            selector:'cont',
            sortable: true,
        },
        {
            name: 'User id',
            selector:'user_id',
            sortable: true,
        },
        {
            name: 'Nombre',
            selector:'name',
            sortable: true,
        },
        {
            name: 'Código ciudad',
            selector:'Location',
            sortable: true,
        },
       
    ]
    return (
       
        <div className="row cont-table-repeat">
        {
            (dataPer.length !== 0)
            ?  <div className="table-responsive table-repeat" style={{padding:"10px", maxWidth:"600px"}}>
                        <DataTable
                            columns={ columns }
                            data = { dataPer }
                            title='Máquinas en Stock'
                            pagination
                            paginationComponentOptions={ paginationOpciones }
                            fixedHeader
                            fixedHeaderScrollHeight='600px'
                            customStyles={customStyles}
                            dense
                            expandableRows
                            expandableRowDisabled={row => row.disabled}
                            expandableRowsComponent={ <ExpandedTable filterOnlyStock={ true }/> }
                        />
                </div>
            : <div></div>   
        }
        {
            (personasVariasCitys.length !== 0)
            ?    <div className="table-responsive table-repeat" style={{padding:"10px", maxWidth:"600px"}}>
                    <DataTable
                        columns={ columns }
                        data = { personasVariasCitys }
                        title='Máquinas asignadas en diferentes ciudades'
                        pagination
                        paginationComponentOptions={ paginationOpciones }
                        fixedHeader
                        fixedHeaderScrollHeight='600px'
                        customStyles={customStyles}
                        dense
                        expandableRows
                        expandableRowDisabled={row => row.disabled}
                        expandableRowsComponent={ <ExpandedTable filterOnlyStock={ true }/> }
                    />
                </div>
            : <div></div>
        }
    </div>
       
    )
}
