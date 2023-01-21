import axios from 'axios';
import { UserActionsTypes } from './user.types';
import { createAction } from "../../utils/actions";

const fetchuserstart = () => (createAction(UserActionsTypes.FETCH_REQUEST));

const fetchuser = (user) => (createAction(UserActionsTypes.FETCH_USER, user));

const fetchusererror = (error) => (createAction(UserActionsTypes.FETCH_ERROR, error));

 const userFetch = () => {
    return async (dispatch) => {
        dispatch(fetchuserstart);

        try{

            // const config = {
            //   withCredentials: true,
            //     headers: {
            //       Accept: "application/json",
            //       "Content-Type": "application/json",
            //       "Access-Control-Allow-Credentials": true,
            //     },
            //   };

            // const res = await axios.get('/auth/current_user', config);

            const res = await axios.get('/auth/current_user');

            // console.log(res.data);

            dispatch(fetchuser(res.data));
        }catch(e){
            dispatch(fetchusererror(e.message));
        }
    }
}

export default userFetch;