import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectArchive } from '../../../actions/aeAction';

import { setData } from '../../../actions/uiActions';
import './inputFile.css'

export const InputFile = () => {
    const archivoSelect = useSelector(state => state.ae);
    const dispatch= useDispatch();
    const handleFileLoad = (e)=>{
        if (e.target.files.length > 0) {
            dispatch(setData(e));
            const nameAux = e.target.files[0].name;
            dispatch(selectArchive(nameAux, '','cambiar archivo'));
        }
    }
    const getFile = (idInput)=>{
        document.getElementById(idInput).click();
    }
    return (
        <div>
            <div className="cont-archivos" id="2">
                <div  className='cont-input-if'>
                    <div className="cont-rnp">
                        <div>
                            <p className='nombre-archivoSelect-if'>{ archivoSelect['nombre'] }</p>
                        </div>
                        <div className="inputFile-if">
                            <input id="upfile2" type="file" onChange={ handleFileLoad }/>
                        </div>
                        <div 
                            className={`file2 ${archivoSelect['fileSelect']} labelArchivo`}  
                            id="input2" 
                            onClick={() => getFile('upfile2')}
                        >
                            { archivoSelect['estado'] }
                        </div>
                        
                        
                    </div>
                </div>
            </div>
        </div>
    )
}
