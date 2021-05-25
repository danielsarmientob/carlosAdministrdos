import { types } from "../types/types";

const intialState = [];

export const personReducer = (state=intialState, action)=>{
    switch (action.type) {
        case types.personAsig:
            return action.payload.data
    
        default:
            return state;
    }
}