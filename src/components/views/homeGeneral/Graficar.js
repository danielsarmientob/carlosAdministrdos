import React, { useEffect, useState } from 'react';

import { useSelector } from 'react-redux';

import { shearchForState } from '../../../utils/shearchForState';
// import { GraficoBarrasStock } from '../../common/GraficoBarrasStock';

export const Graficar = ({ filtro, GraficoComponent }) => {
    const { dataUi } = useSelector(state => state.ui);
    const [numForCountry, setnumForCountry] = useState({
        nameLabels: [],
        data: []
    })
    useEffect(() => {
        if(dataUi.length !== 0){
            const { nameLabels, data } = shearchForState(dataUi,  filtro );
            setnumForCountry({
                nameLabels,
                data
            });
        }
    }, [dataUi, filtro])
    return (
        <>
            <GraficoComponent
                data={numForCountry.data}
                namesLabels={numForCountry.nameLabels}
            />
        </>
    )
}
