import { configureStore } from '@reduxjs/toolkit';
import employeesReducer from '../features/emplyeesSlice';

const store = configureStore({
  reducer: {
    employees: employeesReducer
  }
});

export default store;
