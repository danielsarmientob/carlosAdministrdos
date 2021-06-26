import React from 'react';

import './tituloGraficos.css';
export const TituloGraficos = ({titulo}) => {
    return (
        <>
            <div className="titulo-grafico">
                <p>{ titulo }</p>
            </div>  
        </>
    )
}
