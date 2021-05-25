import React, { useCallback, useEffect, useState } from 'react';

import { useSelector } from 'react-redux';
import DataTable from 'react-data-table-component';
import { customStyles, paginationOpciones } from '../../utils/stylesTable';
import { ExpandedTable } from './ExpandedTable';



export const TableRepeat = ({paisName=''}) => {
    // const personAsig = useSelector(state => state.pe);
    const {dataUi, paisElegido, personasAsig}= useSelector(state => state.ui);
    const [dataPer, setDataPer] = useState([]);
    const [personasVariasCitys, setPersonasVariasCitys] = useState([]);
    
    const contPersoRepeat = useCallback(
        ()=>{
            let person = [];
            let personsVariasCitys = [];
            personasAsig.forEach((name)=>{
                let cont = 0;
                let codigosCity = new Set();
                paisElegido.forEach((data)=>{
                    if(data['Assigned_to'] === name && data['Operational_status']!== 'Retired' && data['Operational_status']!== 'Non-Operational'){
                        codigosCity.add(data['Location'])                    
                        cont = cont +1;
                    }
                })
                if(cont > 1){
                    if(codigosCity.size > 1){
                        for(let codigoCity of codigosCity){
                            let cont2 = 0;
                            paisElegido.forEach((data)=>{
                                if(data['Assigned_to'] === name && data['Operational_status']!== 'Retired' && data['Operational_status']!== 'Non-Operational' && data['Location'] === codigoCity){              
                                    cont2 = cont2 +1;
                                }
                            })
                            const dato = {
                                cont: cont2,
                                name,
                                Location: codigoCity,         
                            }
                            personsVariasCitys = [...personsVariasCitys, dato]
                        }
                    }else{
                        const dato = {
                            cont,
                            name,
                            Location: Array.from(codigosCity)[0],
                        }
                        person = [...person,dato]
                    }
                } 
            })
            setDataPer(person);
            setPersonasVariasCitys(personsVariasCitys);
            // console.log(person)
        },
        [paisElegido, personasAsig],
    )
    
    const filter = useCallback(
        () => {
            if(paisElegido.length !== 0){
                contPersoRepeat();
            }
        },
        [paisElegido,contPersoRepeat],
    )
    useEffect(() => {
        filter();
    }, [paisName,dataUi,filter]);
    const columns = [
        {
            name: 'Número de PCS',
            selector:'cont',
            sortable: true,
            // maxWidth: "100px"
        },
        {
            name: 'Nombre',
            selector:'name',
            sortable: true,
            // maxWidth: "100px"
        },
        {
            name: 'Código ciudad',
            selector:'Location',
            sortable: true,
            // maxWidth: "100px"
        },
        // {
        //     name: 'Estado',
        //     selector:'Operational_status',
        //     sortable: true,
        //     // maxWidth: "100px"
        // },
    ]
    return (
        <>  
            <div className="row cont-table-repeat">
                {/* <div className="col-6"> */}
                {
                    (dataPer.length !== 0)
                    ?  <div className="table-responsive table-repeat" style={{padding:"10px", maxWidth:"500px"}}>
                                <DataTable
                                    columns={ columns }
                                    data = { dataPer }
                                    title='Máquinas asignadas'
                                    pagination
                                    paginationComponentOptions={ paginationOpciones }
                                    fixedHeader
                                    fixedHeaderScrollHeight='600px'
                                    customStyles={customStyles}
                                    dense
                                    expandableRows
                                    expandableRowDisabled={row => row.disabled}
                                    expandableRowsComponent={ <ExpandedTable /> }
                                />
                        </div>
                    : <div></div>   
                }
                {/* </div> */}
                {/* <div className="col-6"> */}
                {
                    (personasVariasCitys.length !== 0)
                    ?    <div className="table-responsive table-repeat" style={{padding:"10px", maxWidth:"500px"}}>
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
                                expandableRowsComponent={ <ExpandedTable /> }
                            />
                        </div>
                    : <div></div>
                }
                {/* </div> */}
            </div>
            
        </>
    )
}
