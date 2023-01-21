import { UserActionsTypes } from "./user.types";

const INITIAL_STATE = {
    loading: false,
    user: null,
    error: null
}

export const  UserReducer = (state = INITIAL_STATE, action = {}) => {
    const { type, payload} = action;

    switch(type){
        case UserActionsTypes.FETCH_REQUEST:
          return { ...state, loading: true }
          
         case UserActionsTypes.FETCH_USER:
            return { ...state, loading: false, user: payload }
            
        case UserActionsTypes.FETCH_ERROR:
            return { ...state, loading: false, error: payload }
            
        default:
            return { ...state }    
    }
}