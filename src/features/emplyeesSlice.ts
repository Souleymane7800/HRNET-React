import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import employees from '../mockData/employees.json';
import { Employee } from '../models/Employee';

const employeesSlice = createSlice({
  name: 'employees',
  initialState: {
    list: employees || [],
  },
  reducers: {
    addEmployee(state, action: PayloadAction<Employee>) {
      state.list.push(action.payload);
    },
  },
});

export const { addEmployee } = employeesSlice.actions;
export default employeesSlice.reducer;

