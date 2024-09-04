export interface FieldWarnings {
      firstName: boolean;
      lastName: boolean;
      dateOfBirth: boolean;
      startDate: boolean;
      street: boolean;
      city: boolean;
      state: boolean;
      zipCode: boolean;
      department: boolean;
}

export const validateFields = (
      firstName: string,
      lastName: string,
      dateOfBirth: Date | null,
      startDate: Date | null,
      street: string,
      city: string,
      state: { value: string; label: string } | null,
      zipCode: string,
      department: { value: string; label: string } | null
): FieldWarnings => {
      return {
            firstName: !firstName.trim(),
            lastName: !lastName.trim(),
            dateOfBirth: !dateOfBirth,
            startDate: !startDate,
            street: !street.trim(),
            city: !city.trim(),
            state: !state,
            zipCode: !zipCode.trim(),
            department: !department || !department.value.trim(),
      };
};

export const hasValidationErrors = (warnings: FieldWarnings): boolean => {
      return Object.values(warnings).some(Boolean);
};
