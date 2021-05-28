import React, { useEffect, useState } from 'react';

import { useSelector } from 'react-redux';

import { GraficoBarrasMissing } from '../../common/GraficoBarrasMissing';

export const GraficoMissing = () => {

    const { dataUi } = useSelector(state => state.ui);
    const [numMissingForCountry, setNumMissingForCountry] = useState({
        nameLabels: [],
        data: []
    })
    useEffect(() => {
        if(dataUi.length !== 0){
            let nameLabels = [];
            let data = []; 
            dataUi.forEach((dataPais,index)=>{
                const machinesMissing = dataPais['data'].filter(({Operational_status})=> Operational_status === 'Missing');
                nameLabels = [...nameLabels, dataPais['sheetName']];
                data = [...data, machinesMissing.length];
                if((index +1) === dataUi.length ) {
                    setNumMissingForCountry({
                        nameLabels,
                        data
                    });
                    // console.log(numMissingForCountry)
                }
                console.log(machinesMissing.length);
            });
        }
    }, [dataUi])
    return (
        <>
            <GraficoBarrasMissing
                data={numMissingForCountry.data}
                namesLabels={numMissingForCountry.nameLabels}
            />
        </>
    )
}
