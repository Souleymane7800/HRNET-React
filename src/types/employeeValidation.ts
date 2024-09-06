import * as Yup from 'yup';

// Function to calculate the maximum authorized date of birth (at least 18 years old)
const calculateMaxDateOfBirth = (): Date => {
      const today = new Date();
      return new Date(
            today.getFullYear() - 18,
            today.getMonth(),
            today.getDate()
      );
};

// Function to parse a character string in dd-MM-yyyy format into a Date object
const parseDateString = (originalValue: string | Date | null): Date => {
      if (typeof originalValue === 'string') {
            const [day, month, year] = originalValue.split('-').map(Number);
            return new Date(year, month - 1, day);
      }
      // If originalValue is not a string, return the Date object as is (or a new Date if null)
      return originalValue || new Date();
};

// Validation scheme for employee form
const employeeValidationSchema = Yup.object().shape({
      firstName: Yup.string()
            .required('First Name is required')
            .min(2, 'First Name must be at least 2 characters'),
      lastName: Yup.string()
            .required('Last Name is required')
            .min(2, 'Last Name must be at least 2 characters'),
      dateOfBirth: Yup.date()
            .transform(parseDateString) // Date transformation
            .nullable()
            .required('Date of Birth is required')
            .max(calculateMaxDateOfBirth(), 'Must be at least 18 years old'),
      startDate: Yup.date()
            .transform(parseDateString) // Date transformation
            .nullable()
            .required('Start Date is required'),
      street: Yup.string().required('Street is required'),
      city: Yup.string().required('City is required'),
      state: Yup.object({
            value: Yup.string().required('State is required'),
            label: Yup.string().required('State is required'),
      })
            .nullable()
            .required('State is required'),
      zipCode: Yup.string()
            .required('Zip Code is required')
            .matches(/^\d{5}$/, 'Zip Code must be exactly 5 digits'),
      department: Yup.object({
            value: Yup.string().required('Department is required'),
            label: Yup.string().required('Department is required'),
      })
            .nullable()
            .required('Department is required'),
});

export default employeeValidationSchema;
