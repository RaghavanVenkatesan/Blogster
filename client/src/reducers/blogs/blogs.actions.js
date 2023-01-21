import { BlogActions } from "./blogs.types";
import { createAction } from "../../utils/actions";
import axios from "axios";

export const fetchblogstart = () => createAction(BlogActions.FETCH_BLOG_REQUEST);

export const createblog = (data) => createAction(BlogActions.BLOG_CREATE, data);

export const fetchallblogs = (data) => createAction(BlogActions.FETCH_BLOG, data);

export const fetchpaticularblog = (data) => createAction(BlogActions.FETCH_BLOGS, data);

export const fetchblogserror = (error) => createAction(BlogActions.FETCH_BLOG_ERROR, error);

export const fetchblogtest = () => createAction(BlogActions.FETCH_BLOG_TEST);

// export const test = () => {
//       return async (dispatch) => {
//             try{

//                 const config = {
//                     headers: {
//                         'Content-Type': 'application/json',
//                     }
//                 }

//          const data  =  await axios.get('/api/test', config);

//          console.log(data);

//                dispatch(fetchblogtest());

//             }catch(e){
//                 dispatch(fetchblogserror(e.message));
//             }
//       }
// }

export const submitBlog = (values, navigate) => {
      return async (dispatch) => {

        dispatch(fetchblogstart())

            try{

                const config = {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                }

         const res  =  await axios.post('/api/blogs', values, config);

        //  console.log(res);

               navigate('/blogs');

               dispatch(createblog(res.data));
            }catch(e){
                dispatch(fetchblogserror(e.message));
            }
      }
}


export const fetchBlogs = () => {
    return async(dispatch) => {
       dispatch(fetchblogstart())

       try{
        const config = {
            headers: {
                'Content-Type': 'application/json',
            }
        }

        const res = await axios.get('/api/blogs', config);

        dispatch(fetchallblogs(res.data));

       } catch(e) {
        let error_payload = e.message;

        dispatch(fetchblogserror(error_payload));
       }
    }
}

export const fetchBlog = (id) => {
    return async(dispatch) => {
       dispatch(fetchblogstart())

       try{
        const config = {
            headers: {
                'Content-Type': 'application/json',
            }
        }

        const res = await axios.get(`/api/blogs/${id}`, config);

        dispatch(fetchpaticularblog(res.data));

       } catch(e) {
        let error_payload = e.message;

        dispatch(fetchblogserror(error_payload));
       }
    }
}