import { configureStore } from '@reduxjs/toolkit';
import employeeReducer from './reducer.js';

export default configureStore({
    reducer: {
        employee: employeeReducer,
    }
})