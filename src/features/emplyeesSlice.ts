import { createSlice } from '@reduxjs/toolkit';

const employeesSlice = createSlice({
  name: 'employees',
  initialState: {
    list: JSON.parse(localStorage.getItem('employees') || '[]'),
  },
  reducers: {
    addEmployee(state, action) {
      state.list.push(action.payload);
      localStorage.setItem('employees', JSON.stringify(state.list));
    }
  }
});

export const { addEmployee } = employeesSlice.actions;
export default employeesSlice.reducer;
