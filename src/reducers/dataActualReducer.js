import { types } from "../types/types";

const initialState =[]
export const dataActualReducer = (state=initialState, action)=>{
    switch (action.type) {
        case types.dataActual:
            return action.payload.data;
    
        default:
            return state;
    }
}