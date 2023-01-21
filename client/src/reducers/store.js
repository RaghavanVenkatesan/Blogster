import { configureStore } from '@reduxjs/toolkit'
import logger from 'redux-logger';

import thunk from 'redux-thunk';

import rootReducer from './root-reducer';

const middlewares = [
    process.env.NODE_ENV === 'development' && logger,
    thunk
].filter(Boolean);

export const store = configureStore({
    reducer: rootReducer,
    middleware: middlewares
})