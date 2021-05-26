import { types } from "../types/types";

export const selectArchive=(nombre, fileSelect, estado)=>{
    return async(dispatch)=>{
        const actionSelectArchive ={
            type: types.archviselect,
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