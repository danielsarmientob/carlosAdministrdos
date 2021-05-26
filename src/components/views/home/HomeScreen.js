import React from 'react';

import { useDispatch } from 'react-redux';

import { startLogout } from '../../../actions/auth';
import { setData } from '../../../actions/uiActions';
import { TableAdmin } from '../../common/TableAdmin';


export const HomeScreen = () => {
    
    console.log("HomeScreen");
    const dispatch= useDispatch();
    const logoutApp = ()=>{
        dispatch(startLogout())
    }
    const handleFileLoad = (e)=>{
        if (e.target.files.length > 0) {
            dispatch(setData(e));
        }
    }
    return (
        <div>
            <input 
                // hasSelection={fileLoaded}
                // onInputChange={handleFileLoad}
                // text={fileLoaded ? fileName : "Choose file..."} 
                type="file"
                name="file"
                id="file"
                onChange={ handleFileLoad }
                placeholder="Archivo excel"
            />
            <TableAdmin/>
        </div>
    )
}
