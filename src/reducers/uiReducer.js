import { types } from "../types/types";

const initialState = {
    dataUi: [],
    nombrePais: '',
    paisElegido: [],
    personasAsig: []
};

export const uiReducer = (state=initialState, action)=>{
    switch (action.type) {
        case types.data:
            return ({
                dataUi: action.payload.data.dataUi,
                nombrePais: action.payload.data.nombrePais,
                paisElegido: action.payload.data.paisElegido,
                personasAsig: action.payload.data.personasAsig
            });
    
        default:
            return state;
    }
}