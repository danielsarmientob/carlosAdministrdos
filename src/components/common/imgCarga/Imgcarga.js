import React from 'react';

import loanding from '../../../assets/img/loading.gif';
import './imgCarga.css';

export const Imgcarga = () => {
    return (
        <div className="cont-img-carga">
             <img src={ loanding} alt="gif"></img>
        </div>
    )
}
