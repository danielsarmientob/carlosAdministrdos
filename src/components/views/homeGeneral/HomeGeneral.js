import React, { useCallback, useEffect, useState } from 'react';

import { useSelector } from 'react-redux';

import { GraficoBarras } from '../../common/GraficoBarras';
import { GraficoBarrasMissing } from '../../common/GraficoBarrasMissing';
import { GraficoBarrasOnOrder } from '../../common/GraficoBarrasOnOrder';
import { GraficoBarrasStock } from '../../common/GraficoBarrasStock';
import { TituloGraficos } from '../../common/TituloGraficos';
import { Graficar } from './Graficar';


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
            namesPersons.forEach(userId => {
                const persons = dataUi[index]['data'].filter(({User_ID, Operational_status})=> userId === User_ID && (Operational_status === 'In use' || Operational_status === 'In stock'))
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
            <div className="row justify-content-center">
                <div className=" col-12 col-sm-10 col-md-6  col-lg-5">
                    <TituloGraficos
                        titulo={'Porcentaje del número de personas con más de una computadora por país'}
                    />
                    <GraficoBarras 
                        data={ dataPeopleVariousMachines.dataForCountry }
                        namesLabels={ dataPeopleVariousMachines.namesCountrys }
                    />
                </div>
                <div className=" col-12 col-sm-10 col-md-6  col-lg-5">
                    <TituloGraficos
                        titulo={'Cantidad de computadoras extraviadas'}
                    />
                    <Graficar
                        filtro = 'Missing'
                        GraficoComponent={ GraficoBarrasMissing }
                    />
                </div>
                <div className=" col-12 col-sm-10 col-md-6  col-lg-5">
                    <TituloGraficos
                        titulo={'Cantidad de computadoras en stock'}
                    />
                    <Graficar
                        filtro= 'In stock'
                        GraficoComponent={ GraficoBarrasStock }
                    />
                </div>
                <div className=" col-12 col-sm-10 col-md-6  col-lg-5">
                    <TituloGraficos
                        titulo={'Cantidad de computadoras pedidas'}
                    />
                    <Graficar
                        filtro= 'On order'
                        GraficoComponent={ GraficoBarrasOnOrder }
                    />
                </div>
            </div>
        </div>
    )
}
