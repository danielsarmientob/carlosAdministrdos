import React, { useCallback, useEffect, useState, useMemo } from 'react';
import DataTable from 'react-data-table-component';

import { useSelector } from 'react-redux';
import { customStyles, paginationOpciones } from '../../utils/stylesTable';

export const TableModelId = () => {
    const {dataUi,paisElegido,nombrePais} = useSelector(state => state.ui);
    const [amountModels, setAmountModels] = useState([]);

    const convertArrayOfObjectsToCSV = (data)=>{
        let result;
        const columnDelimiter = ',';
        const lineDelimiter = '\n';
        const keys = Object.keys(data[0]);
        
        result = '';
        result += keys.join(columnDelimiter);
        result += lineDelimiter;
        
        data.forEach(item => {
            let ctr = 0;
            keys.forEach(key => {
                if (ctr > 0) result += columnDelimiter;
                
                result += item[key];
                
                ctr++;
            });
            result += lineDelimiter;
        });
        return result;
    }
    const downloadCSV = useCallback(
        (array) => {
            const link = document.createElement('a');
            let csv = convertArrayOfObjectsToCSV(array);
            if (csv == null) return;
        
            const filename = 'export.csv';
        
            if (!csv.match(/^data:text\/csv/i)) {
                csv = `data:text/csv;charset=utf-8,${csv}`;
            }
        
            link.setAttribute('href', encodeURI(csv));
            link.setAttribute('download', filename);
            link.click();
        },
        [],
    )
    const Export = ({ onExport }) => <button onClick={e => onExport(e.target.value)}>Export</button>;
    const actionsMemo = useMemo(() => <Export onExport={() => downloadCSV(amountModels)} />, [amountModels,downloadCSV]);

    const modeloId = useCallback(
        () => {
            let modelsCity  = [];
            dataUi.forEach(element => {
                if(element['sheetName'] === nombrePais){
                    element['codigosCity'].forEach(codigoCity => {
                        element['models'].forEach(model => {
                            const modelCity = paisElegido.filter(({Model_ID, Location,  Operational_status})=> Model_ID === model && Location === codigoCity && Operational_status === 'In stock')
                            if (modelCity.length !== 0){
                                const dataModels= {
                                    Location: codigoCity,
                                    Model_ID: model,
                                    Amount: modelCity.length
                                }
                                modelsCity = [...modelsCity, dataModels];
                            } 
                        })
                    })
                }
            });
            setAmountModels(modelsCity);
        },
        [dataUi,paisElegido,nombrePais],
    ) 
    useEffect(() => {
        modeloId();
        
    }, [modeloId]);
    const columns = [
        {
            name: 'Model ID',
            selector:'Model_ID',
            sortable: true,
        },
        {
            name: 'Código ciudad',
            selector:'Location',
            sortable: true,
        },
        {
            name: 'Número de PCS',
            selector:'Amount',
            sortable: true,
        },
       
       
    ] 
    return (
        <div className="row cont-table-repeat">
             {
                    (amountModels.length !== 0)
                    ?  <div className="table-responsive table-repeat" style={{padding:"10px", maxWidth:"600px"}}>
                                <DataTable
                                    columns={ columns }
                                    data = { amountModels }
                                    title='Cantidad de modelos de máquinas en stock'
                                    pagination
                                    paginationComponentOptions={ paginationOpciones }
                                    fixedHeader
                                    fixedHeaderScrollHeight='600px'
                                    customStyles={customStyles}
                                    actions={actionsMemo}
                                    dense
                                />
                        </div>
                    : <div></div>   
                }
        </div>
    )
}
