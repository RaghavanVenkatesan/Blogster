import { combineReducers } from 'redux';

import { UserReducer } from './user/user.reducer';
import { BlogReducer } from './blogs/blogs.reducer';
import { FormReducer } from './form/form.reducer';

 const rootReducer = combineReducers({
    user: UserReducer,
    form: FormReducer,
    blog: BlogReducer
})

export default rootReducer;