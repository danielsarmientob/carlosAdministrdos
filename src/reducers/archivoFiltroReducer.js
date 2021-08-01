import { types } from "../types/types";

const initialState = {
    nombre:'Ningún Archivo Seleccionado',
    fileSelect: 'file',
    estado: 'Seleccionar archivo'
}

export const archivoFiltroReducer = (state=initialState, action)=>{
    switch (action.type) {
        case types.filtro:
            return {
                nombre: action.payload.data.nombre,
                fileSelect: action.payload.data.fileSelect,
                estado: action.payload.data.estado
            }        
        case types.cleanArchive:
            return {
                nombre:'Ningún Archivo Seleccionado',
                fileSelect: 'file',
                estado: 'Seleccionar archivo'
            }
        default:
            return state;
    }
}