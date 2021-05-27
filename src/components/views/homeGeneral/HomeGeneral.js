import React, { useCallback, useEffect, useState } from 'react';

import { useSelector } from 'react-redux';
import { GraficoBarras } from '../../common/GraficoBarras';

export const HomeGeneral = () => {
    const pe = useSelector(state => state.pe);
    const { dataUi } = useSelector(state => state.ui);
    const [dataPeopleVariousMachines, setDataPeopleVariousMachines] = useState({
        namesCountrys: [],
        dataForCountry: []
    });
    console.log(dataPeopleVariousMachines);
    const numbersPeopleWithVariousMachines = useCallback(
        async (namesPersons,index)=>{
            let cont_person  = 0; 
            namesPersons.forEach(name => {
                const persons = dataUi[index]['data'].filter(({Assigned_to, Operational_status})=> name === Assigned_to && Operational_status !== 'Retired' && Operational_status !== 'Non-Operational')
                if( persons.length > 1) cont_person = cont_person + 1;
            });
            return cont_person;
        },
        [dataUi],
    )
    useEffect(() => {
        if(pe.length !== 0) {
            let dataForCountry = [];
            let namesCountrys = [];
            pe.forEach(async (paisData, index) =>{
                const res =  await numbersPeopleWithVariousMachines(paisData['data'], index);
                namesCountrys = [...namesCountrys, paisData['sheetName']];
                const resProcentaje = Math.round((res/paisData['data'].length)*100);
                dataForCountry = [...dataForCountry, resProcentaje];
                if((index + 1) === pe.length){
                    setDataPeopleVariousMachines({
                        namesCountrys,
                        dataForCountry
                    });
                }
            });
        }
    }, [pe,numbersPeopleWithVariousMachines])
    return (
        <div>
            <h1>General</h1>
            <div className="row">
                <div className="m-2 col-12 col-sm-8 col-md-6  col-lg-6">
                    <p>Porcentaje del número de personas con más de una máquina por país</p>
                    <GraficoBarras 
                        data={ dataPeopleVariousMachines.dataForCountry }
                        namesLabels={ dataPeopleVariousMachines.namesCountrys }
                    />
                </div>
            </div>
        </div>
    )
}
