import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectArchive } from '../../../actions/aeAction';

import { setData } from '../../../actions/uiActions';
import { BtnFile } from '../btnFile/BtnFile';


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
    return (
        <div>
            <BtnFile 
                archivoSelect = {archivoSelect}
                handleFileLoad = {handleFileLoad}
            />
        </div>
    )
}
