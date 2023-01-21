import { FormActions } from "./form.types";
import { createAction } from "../../utils/actions";

export const start = () => createAction(FormActions.FETCH_FORM_REQUEST);

export const success = (data) => createAction(FormActions.FETCH_Data, data);

export const error = (error) => createAction(FormActions.FETCH_FORM_ERROR, error);

export const field_with_error = (field) => createAction(FormActions.FETCH_VALIDATION_ERROR, field); 

export const reset = () => createAction(FormActions.RESET_DATA); 

export const fetchformdata = (data) => {
     return async(dispatch) => {
         dispatch(start())

         try{
           dispatch(success(data))
         }catch(e){
            let error_payload = e.message;

            dispatch(error(error_payload));
         }
     }
}

export const fetchformfielderror = (data, field_error) => {
    return async(dispatch) => {
         dispatch(error(data));
         dispatch(field_with_error(field_error)); 
    }
}

export const resetform = () => {
  return async(dispatch) => {
    dispatch(reset());
  }
}