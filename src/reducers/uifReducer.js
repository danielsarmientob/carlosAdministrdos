import { types } from "../types/types";

const initialState={
    dataUif: []
};
export const uifReducer=(state=initialState, action)=>{
    switch (action.type) {
        case types.dataUif:
            return({
                dataUif: action.payload.data.dataUif
            });
    
        default:
            return state;
    }
}