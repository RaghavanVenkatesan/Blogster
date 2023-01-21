import { FormActions } from "./form.types";

const INITIAL_STATE = {
    loading: false,
    error: null,
    data: null,
    error_field: {}
}

export const FormReducer = (state = INITIAL_STATE, action = {}) => {
    const {type, payload} = action;

    switch(type){
        case FormActions.FETCH_FORM_REQUEST:
        return { ...state, loading: true}
        case FormActions.FETCH_Data:
        return { ...state, loading: false, data: payload }
        case FormActions.FETCH_FORM_ERROR:
        return { ...state, loading: false, error: payload }
        case FormActions.FETCH_VALIDATION_ERROR:
        return { ...state, loading: false, error_field: payload}
        case FormActions.RESET_DATA:
        return { ...state, data: null, error_field: {}, error: null}        
        default:
        return state              
    }
}
