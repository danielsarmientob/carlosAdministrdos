import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { useDispatch, useSelector } from 'react-redux';
import { setData } from '../../../actions/uifActions';
import { selectArchiveF } from '../../../actions/uiFiltro';
import { customStyles, paginationOpciones } from '../../../utils/stylesTable';
import { BtnFile } from '../../common/btnFile/BtnFile';


export const HomeFiltro = () => {
    const archivoSelect = useSelector(state => state.uif);
    const { dataUi } = useSelector(state => state.ui);
    const [data_filtro, setData_filtro] = useState([]);
    const dataFiltro = useSelector(state => state.uifd);
    const dispatch= useDispatch();
    const handleFileLoad = (e)=>{
        if (e.target.files.length > 0) {
            dispatch(setData(e));
            const nameAux = e.target.files[0].name;
            dispatch(selectArchiveF(nameAux, '','cambiar archivo'));
        }
    }
    useEffect(
        () => {
           if(dataFiltro['dataUif'][0] !== undefined && dataUi.length !== 0){
            //    console.log(dataFiltro['dataUif'][0]['data'])
                let data_asig_incorrect = [];
                dataUi.forEach(pais => 
                    pais['data'].forEach(elemen => {
                        //WKSOPS_Username,Service_Tag
                        //Serial_number,User_ID
                        const pc = dataFiltro['dataUif'][0]['data'].filter(({WKSOPS_Username,Service_Tag})=> Service_Tag.toString().toUpperCase() === elemen['Serial_number'].toUpperCase() && WKSOPS_Username.toString().toUpperCase() !== elemen['User_ID'].toUpperCase() && (elemen['Operational_status'] === 'In use' || elemen['Operational_status'] === 'In stock'));
                        if(pc.length !== 0){
                            const dato = {
                                name_pais: pais['sheetName'],
                                serial_n: elemen['Serial_number'],
                                user_id: elemen['User_ID'],
                                user_id_filtro: pc[0]['WKSOPS_Username']
                            }
                            data_asig_incorrect=[...data_asig_incorrect, dato];
                        } 
                        //console.log(elemen['Serial_number'],elemen['User_ID'],'-------',pc[0]['Service_Tag'],pc[0]['WKSOPS_Username'])
                    })
                )
                setData_filtro(data_asig_incorrect);
                // console.log(data_asig_incorrect); 
           }
        },
        [dataFiltro,dataUi],
    )
    const columns = [
        {
            name: 'País',
            selector:'name_pais',
            sortable: true,
        },
        {
            name: 'Serial number',
            selector:'serial_n',
            sortable: true,
        },
        {
            name: 'User id 1',
            selector:'user_id',
            sortable: true,
        },
        {
            name: 'User id 2',
            selector:'user_id_filtro',
            sortable: true,
        },
       
    ]
    return (
        <div>
             <div className="cont-inputFile-HS">
                <BtnFile 
                    archivoSelect = {archivoSelect}
                    handleFileLoad = {handleFileLoad}
                />
            </div>
            <div className="row cont-table-repeat">
                {
                    (data_filtro.length !== 0)
                    ? <div className="table-responsive table-repeat" style={{padding:"10px", maxWidth:"600px"}}>
                        <DataTable
                            columns={columns}
                            data={data_filtro}
                            title="Máquina asignada a diferentes usuarios"
                            pagination
                            paginationComponentOptions={ paginationOpciones }
                            fixedHeader
                            fixedHeaderScrollHeight='600px'
                            customStyles={customStyles}
                            dense
                            // expandableRows
                            // expandableRowDisabled={row => row.disabled}
                            // expandableRowsComponent={ <ExpandedTable filterOnlyStock={ false }/> }
                        />
                      </div>   
                    : <div></div>
                }
            </div>
        </div>
    )
}
