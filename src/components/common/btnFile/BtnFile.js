import React from 'react';

import './btnFile.css';

export const BtnFile = ({archivoSelect, handleFileLoad}) => {
    const getFile = (idInput)=>{
        document.getElementById(idInput).click();
    }
    return (
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
    )
}
