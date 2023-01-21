import { BlogActions } from "./blogs.types";

const INITIAL_STATE = {
    loading: false,
    success: false,
    blogs: {},
    error: null
}

export const  BlogReducer = (state = INITIAL_STATE, action = {}) => {
    const { type, payload} = action;

    switch(type){
        case BlogActions.FETCH_BLOG_REQUEST:
          return { ...state, loading: true }

        case BlogActions.BLOG_CREATE:
            return { ...state, loading: false, blogs: payload}  
          
         case BlogActions.FETCH_BLOGS:
            return { ...state, loading: false, blogs: payload }

        case BlogActions.FETCH_BLOG_TEST:
            return { ...state, loading: false, success: true }    
            
        case BlogActions.FETCH_BLOG:
            return { ...state, loading: false, blogs: payload }
                
        case BlogActions.FETCH_BLOG_ERROR:
            return { ...state, loading: false, error: payload }
            
        default:
            return { ...state }    
    }
}