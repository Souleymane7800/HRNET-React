import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import employees from '../mockData/employees.json';
import { Employee } from '../models/Employee';

// interface Employee {
//   firstName: string;
//   lastName: string;
//   // Ajoutez d'autres propriétés spécifiques à vos employés ici
// }

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

// localstorage
// import { createSlice } from '@reduxjs/toolkit';

// const employeesSlice = createSlice({
//   name: 'employees',
//   initialState: {
//     list: JSON.parse(localStorage.getItem('employees') || '[]'),
//   },
//   reducers: {
//     addEmployee(state, action) {
//       state.list.push(action.payload);
//       localStorage.setItem('employees', JSON.stringify(state.list));
//     }
//   }
// });

// export const { addEmployee } = employeesSlice.actions;
// export default employeesSlice.reducer;
