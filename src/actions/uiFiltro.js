import { types } from "../types/types";

export const selectArchiveF=(nombre, fileSelect, estado)=>{
    return async(dispatch)=>{
        const actionSelectArchive ={
            type: types.filtro,
            payload: {
                data: {
                    nombre,
                    fileSelect,
                    estado
                }
            }
        }
        dispatch(actionSelectArchive);
    }
}