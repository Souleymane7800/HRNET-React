// types.ts
export interface EmployeeFormValues {
      firstName: string;
      lastName: string;
      dateOfBirth: Date | null;
      startDate: Date | null;
      street: string;
      city: string;
      state: { value: string; label: string } | null;
      zipCode: string;
      department: { value: string; label: string } | null;
}
