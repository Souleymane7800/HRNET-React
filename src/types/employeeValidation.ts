import * as Yup from 'yup';

// Fonction pour calculer la date maximale de naissance autorisée (au moins 18 ans)
const calculateMaxDateOfBirth = (): Date => {
    const today = new Date();
    return new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());
};

// Fonction pour parser une chaîne de caractères au format dd-MM-yyyy en objet Date
const parseDateString = (originalValue: string | Date | null): Date => {
    if (typeof originalValue === 'string') {
        const [day, month, year] = originalValue.split('-').map(Number);
        return new Date(year, month - 1, day);
    }
    // Si originalValue n'est pas une chaîne, retourner l'objet Date tel quel (ou une nouvelle Date si null)
    return originalValue || new Date();
};

// Schéma de validation pour le formulaire d'employé
const employeeValidationSchema = Yup.object().shape({
    firstName: Yup.string()
        .required('First Name is required')
        .min(2, 'First Name must be at least 2 characters'),
    lastName: Yup.string()
        .required('Last Name is required')
        .min(2, 'Last Name must be at least 2 characters'),
    dateOfBirth: Yup.date()
        .transform(parseDateString)  // Transformation de la date
        .nullable()
        .required('Date of Birth is required')
        .max(calculateMaxDateOfBirth(), 'Must be at least 18 years old'),
    startDate: Yup.date()
        .transform(parseDateString)  // Transformation de la date
        .nullable()
        .required('Start Date is required'),
    street: Yup.string()
        .required('Street is required'),
    city: Yup.string()
        .required('City is required'),
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



// import * as Yup from 'yup';

// // Fonction pour calculer la date maximale de naissance autorisée (au moins 18 ans)
// const calculateMaxDateOfBirth = (): Date => {
//     const today = new Date();
//     return new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());
// };

// // Schéma de validation pour le formulaire d'employé
// const employeeValidationSchema = Yup.object().shape({
//     firstName: Yup.string()
//         .required('First Name is required')
//         .min(2, 'First Name must be at least 2 characters'),
//     lastName: Yup.string()
//         .required('Last Name is required')
//         .min(2, 'Last Name must be at least 2 characters'),
//     dateOfBirth: Yup.date()
//         .nullable()
//         .required('Date of Birth is required')
//         .max(calculateMaxDateOfBirth(), 'Must be at least 18 years old'),
//     startDate: Yup.date()
//         .nullable()
//         .required('Start Date is required'),
//     street: Yup.string()
//         .required('Street is required'),
//     city: Yup.string()
//         .required('City is required'),
//     state: Yup.object({
//         value: Yup.string().required('State is required'),
//         label: Yup.string().required('State is required'),
//     })
//         .nullable()
//         .required('State is required'),
//     zipCode: Yup.string()
//         .required('Zip Code is required')
//         .matches(/^\d{5}$/, 'Zip Code must be exactly 5 digits'),
//     department: Yup.object({
//         value: Yup.string().required('Department is required'),
//         label: Yup.string().required('Department is required'),
//     })
//         .nullable()
//         .required('Department is required'),
// });

// export default employeeValidationSchema;
