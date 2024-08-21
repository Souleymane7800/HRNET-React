import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Définition du type pour un employé
interface Employee {
      id: number;
      name: string;
      position: string;
}

// Définition du type pour l'état initial
interface EmployeesState {
      list: Employee[];
}

const initialState: EmployeesState = {
      list: [], // Initialisation de la liste vide
};

const employeesSlice = createSlice({
      name: 'employees',
      initialState,
      reducers: {
            addEmployee(state, action: PayloadAction<Employee>) {
                  // Vérifier si l'employé avec le même ID existe déjà
                  const existingEmployee = state.list.find(
                        (emp) => emp.id === action.payload.id
                  );
                  if (!existingEmployee) {
                        state.list.push(action.payload);
                  } else {
                        console.warn(
                              `Employee with id ${action.payload.id} already exists.`
                        );
                  }
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
