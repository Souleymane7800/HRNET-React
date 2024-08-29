import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addEmployee } from '../features/emplyeesSlice';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styled from 'styled-components';
import { Modal } from 'my-modal-souleymane7800';
import Select, { SingleValue } from 'react-select';
import { Employee } from '../models/Employee';
import { states } from '../models/State';

// Calculate the maximum date for the date of birth (today - 18 years)
const calculateMaxDateOfBirth = () => {
      const today = new Date();
      return new Date(
            today.getFullYear() - 18,
            today.getMonth(),
            today.getDate()
      );
};

const CreateEmployee = () => {
      const [firstName, setFirstName] = useState('');
      const [lastName, setLastName] = useState('');
      const [dateOfBirth, setDateOfBirth] = useState<Date | null>(null);
      const [startDate, setStartDate] = useState<Date | null>(null);
      const [street, setStreet] = useState('');
      const [city, setCity] = useState('');
      const [state, setState] = useState<{
            value: string;
            label: string;
      } | null>(null);
      const [zipCode, setZipCode] = useState('');
      const [department, setDepartment] = useState<{
            value: string;
            label: string;
      } | null>(null);
      const [isModalOpen, setIsModalOpen] = useState(false);

      const dispatch = useDispatch();

      // Handle date changes for date of birth and start date
      const handleDateChange = (date: Date | null, fieldName: string) => {
            if (fieldName === 'dateOfBirth') {
                  setDateOfBirth(date);
            } else if (fieldName === 'startDate') {
                  setStartDate(date);
            }
      };

      // Handle department selection change
      const handleDepartmentChange = (
            selectedOption: { value: string; label: string } | null
      ) => {
            setDepartment(selectedOption);
      };

      // Handle state selection change
      const handleStateChange = (
            selectedOption: SingleValue<{ value: string; label: string }>
      ) => {
            if (selectedOption) {
                  setState(selectedOption);
            }
      };

      // Format date to MM/dd/yyyy
      const formatDate = (date: Date | null) => {
            return date
                  ? date.toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: '2-digit',
                          day: '2-digit',
                    })
                  : '';
      };

      // Handle form submission
      const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();

            // Ensure that both department and state are selected
            if (!department || !state || !dateOfBirth || !startDate) return;

            // Check if the selected date of birth is 18 years or older
            const today = new Date();
            const minAgeDate = new Date(
                  today.getFullYear() - 18,
                  today.getMonth(),
                  today.getDate()
            );

            if (dateOfBirth > minAgeDate) {
                  alert('The employee must be at least 18 years old.');
                  return;
            }

            // Format dates before saving
            const formattedDateOfBirth = formatDate(dateOfBirth);
            const formattedStartDate = formatDate(startDate);

            const employee: Employee = {
                  firstName,
                  lastName,
                  dateOfBirth: formattedDateOfBirth,
                  startDate: formattedStartDate,
                  street,
                  city,
                  state: state.value, // Use the selected state value
                  zipCode,
                  department: department.value, // Use the selected department value
            };

            dispatch(addEmployee(employee));

            // Reset the form fields
            setFirstName('');
            setLastName('');
            setDateOfBirth(null);
            setStartDate(null);
            setStreet('');
            setCity('');
            setState(null);
            setZipCode('');
            setDepartment(null);

            setIsModalOpen(true); // Open the modal after saving the employee
      };

      // Department options for the select dropdown
      const departmentOptions = [
            { value: 'Sales', label: 'Sales' },
            { value: 'Marketing', label: 'Marketing' },
            { value: 'Engineering', label: 'Engineering' },
            { value: 'Human Resources', label: 'Human Resources' },
            { value: 'Legal', label: 'Legal' },
      ];

      // Create state options for the select dropdown
      const stateOptions = states.map((state) => ({
            value: state.abbreviation,
            label: state.name,
      }));

      // Function to handle closing the modal
      const handleCloseModal = () => {
            setIsModalOpen(false);
      };

      return (
            <FormContainer>
                  <h2>Create a new Employee</h2>
                  <Form onSubmit={handleSubmit}>
                        <label>First Name:</label>
                        <Input
                              value={firstName}
                              onChange={(e) => setFirstName(e.target.value)}
                              type='text'
                              required
                        />

                        <label>Last Name:</label>
                        <Input
                              value={lastName}
                              onChange={(e) => setLastName(e.target.value)}
                              type='text'
                              required
                        />

                        <label htmlFor='dateOfBirth'>Date of Birth:</label>

                        <StyledDatePicker
                              id='dateOfBirth'
                              placeholderText='dd/mm/yyyy'
                              selected={dateOfBirth}
                              onChange={(date) =>
                                    handleDateChange(date, 'dateOfBirth')
                              }
                              dateFormat='dd/mm/yyyy'
                              maxDate={calculateMaxDateOfBirth()} // Set max date to enforce 18 years minimum
                        />

                        <label htmlFor='startDate'>Start Date:</label>
                        <StyledDatePicker
                              id='startDate'
                              placeholderText='dd/mm/yyyy'
                              selected={startDate}
                              onChange={(date) =>
                                    handleDateChange(date, 'startDate')
                              }
                              dateFormat='dd/mm/yyyy'
                        />

                        <StyledFieldset>
                              <legend>Address</legend>
                              <label>Street:</label>
                              <Input
                                    value={street}
                                    onChange={(e) => setStreet(e.target.value)}
                                    type='text'
                                    required
                              />

                              <label>City:</label>
                              <Input
                                    value={city}
                                    onChange={(e) => setCity(e.target.value)}
                                    type='text'
                                    required
                              />

                              <label>State:</label>
                              <StyledSelect
                                    classNamePrefix='Select'
                                    placeholder='Select state'
                                    value={state}
                                    onChange={(newValue) =>
                                          handleStateChange(
                                                newValue as {
                                                      value: string;
                                                      label: string;
                                                }
                                          )
                                    }
                                    options={stateOptions}
                              />

                              <StyledLabel>Zip Code:</StyledLabel>
                              <Input
                                    value={zipCode}
                                    onChange={(e) => setZipCode(e.target.value)}
                                    type='text'
                                    required
                              />
                        </StyledFieldset>

                        <StyledLabel>Department:</StyledLabel>
                        <StyledSelect
                              classNamePrefix='Select'
                              placeholder='Select department'
                              value={department}
                              onChange={(newValue) =>
                                    handleDepartmentChange(
                                          newValue as {
                                                value: string;
                                                label: string;
                                          }
                                    )
                              }
                              options={departmentOptions}
                        />

                        <StyledButton type='submit'>Save</StyledButton>
                  </Form>

                  {isModalOpen && (
                        <Modal
                              isOpen={isModalOpen}
                              onClose={handleCloseModal}
                              message='Employee Created !'
                              label=''
                              confirm=''
                              close=''
                              overlayStyle={{
                                    position: 'fixed',
                                    top: 0,
                                    left: 0,
                                    right: 0,
                                    bottom: 0,
                                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                              }}
                              contentStyle={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontWeight: 'bold',
                                    borderRadius: '10px',
                                    position: 'relative', // Important for absolute positioning of the close button
                              }}
                              bodyStyle={{ marginBottom: '20px' }}
                        >
                              <button
                                    style={{
                                          position: 'absolute',
                                          bottom: '10px',
                                          right: '10px',
                                          backgroundColor: 'rgb(185 180 180)', // Change the background color as needed
                                          color: 'black',
                                          borderRadius: '15%',
                                          padding: '10px',
                                          border: 'none',
                                          cursor: 'pointer',
                                    }}
                                    onClick={handleCloseModal}
                              >
                                    X
                              </button>
                        </Modal>
                  )}
            </FormContainer>
      );
};

export default CreateEmployee;

const FormContainer = styled.div`
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.5rem;
      padding: 2rem;
      background-color: #f9f9f9;
      border-radius: 8px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

      border: 3px solid #ccc;
      border-radius: 5px;
      margin: 40px auto 80px;
      max-width: 800px;

      @media (max-width: 768px) {
            margin: 20px 10px;
            width: calc(100% - 20px);
            max-width: none;
      }
`;

const Form = styled.form`
      display: flex;
      flex-direction: column;
      width: 100%;
      gap: 0.5rem;
      padding-bottom: 3rem;
`;

const Input = styled.input`
      padding: 0.5rem;
      border-radius: 4px;
      font-size: 16px;
      margin-bottom: 1rem;

      &:focus {
            outline: none;
            border: none;
            box-shadow: 0 0 10px #29712c;
      }
`;

const StyledFieldset = styled.fieldset`
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      padding: 1rem;
      background-color: #f0f3e5;
      border: 3px solid #29712c;
`;

const StyledLabel = styled.label`
      padding-top: 1rem;
      display: block;
`;

const StyledButton = styled.button`
      background-color: #29712c;
      color: white;
      font-weight: bold;
      padding: 10px 20px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 20px;
      margin-top: 20px;
      transition: background-color 0.3s ease;

      &:hover {
            background-color: #45a049;
      }

      &:active {
            background-color: #3e8e41;
      }

      @media (max-width: 768px) {
            width: 100%;
            padding: 12px;
      }
`;

const StyledDatePicker = styled(DatePicker)`
      padding: 0.75rem;
      border-radius: 4px;

      font-size: 16px;
      width: 100%;
      margin-bottom: 1rem;

      &:focus {
            outline: none;
            border: none;
            box-shadow: 0 0 10px #29712c;
      }
` as typeof DatePicker;

const StyledSelect = styled(Select)`
      .Select__control {
            height: 40px;
            width: 100%;
            border-top: 2px solid black;
            border-left: 2px solid black;
            border-right: 2px solid gray;
            border-bottom: 2px solid gray;
            border-radius: 4px;
            cursor: pointer;

            &:hover {
                  outline: none;
                  border: none;
                  box-shadow: 0 0 10px #29712c;
            }

            &.Select__control--is-focused {
                  outline: none;
                  border: none;
                  box-shadow: 0 0 10px #29712c;
            }
      }

      .Select__menu {
            color: black;
            background-color: white;

            .Select__option:hover {
                  background-color: green;
                  color: white;
            }

            .Select__option--is-selected {
                  background-color: #29712c;
                  color: white;
            }
      }
`;

// import React, { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { addEmployee } from '../features/emplyeesSlice';
// import { useNavigate } from 'react-router-dom';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';
// import styled from 'styled-components';
// import { Modal } from 'my-modal-souleymane7800';
// // import 'my-modal-souleymane7800/dist/modal/Modal.css'
// import Select, { SingleValue } from 'react-select';
// import { Employee } from '../models/Employee';
// import { states } from '../models/State';

// const CreateEmployee = () => {
//       const [firstName, setFirstName] = useState('');
//       const [lastName, setLastName] = useState('');
//       const [dateOfBirth, setDateOfBirth] = useState<Date | null>(null);
//       const [startDate, setStartDate] = useState<Date | null>(null);
//       const [street, setStreet] = useState('');
//       const [city, setCity] = useState('');
//       const [state, setState] = useState<{
//             value: string;
//             label: string;
//       } | null>(null);
//       const [zipCode, setZipCode] = useState('');
//       const [department, setDepartment] = useState<{
//             value: string;
//             label: string;
//       } | null>(null);
//       const [isModalOpen, setIsModalOpen] = useState(false);

//       const dispatch = useDispatch();
//       const navigate = useNavigate();

//       // Handle date changes for date of birth and start date
//       const handleDateChange = (date: Date | null, fieldName: string) => {
//             if (fieldName === 'dateOfBirth') {
//                   setDateOfBirth(date);
//             } else if (fieldName === 'startDate') {
//                   setStartDate(date);
//             }
//       };

//       // Handle department selection change
//       const handleDepartmentChange = (
//             selectedOption: { value: string; label: string } | null
//       ) => {
//             setDepartment(selectedOption);
//       };

//       // Handle state selection change
//       const handleStateChange = (
//             selectedOption: SingleValue<{ value: string; label: string }>
//       ) => {
//             if (selectedOption) {
//                   setState(selectedOption);
//             }
//       };

//       // Format date to MM/dd/yyyy
//       const formatDate = (date: Date | null) => {
//             return date
//                   ? date.toLocaleDateString('en-US', {
//                           year: 'numeric',
//                           month: '2-digit',
//                           day: '2-digit',
//                     })
//                   : '';
//       };

//       // Handle form submission
//       const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//             e.preventDefault();

//             // Ensure that both department and state are selected
//             if (!department || !state || !dateOfBirth || !startDate) return;

//             // Format dates before saving
//             const formattedDateOfBirth = formatDate(dateOfBirth);
//             const formattedStartDate = formatDate(startDate);

//             const employee: Employee = {
//                   firstName,
//                   lastName,
//                   dateOfBirth: formattedDateOfBirth,
//                   startDate: formattedStartDate,
//                   street,
//                   city,
//                   state: state.value, // Use the selected state value
//                   zipCode,
//                   department: department.value, // Use the selected department value
//             };

//             dispatch(addEmployee(employee));
//             setIsModalOpen(true);
//       };

//       // Department options for the select dropdown
//       const departmentOptions = [
//             { value: 'Sales', label: 'Sales' },
//             { value: 'Marketing', label: 'Marketing' },
//             { value: 'Engineering', label: 'Engineering' },
//             { value: 'Human Resources', label: 'Human Resources' },
//             { value: 'Legal', label: 'Legal' },
//       ];

//       // Create state options for the select dropdown
//       const stateOptions = states.map((state) => ({
//             value: state.abbreviation,
//             label: state.name,
//       }));

//       return (
//             <FormContainer>
//                   <h2>Create a new Employee</h2>
//                   <Form onSubmit={handleSubmit}>
//                         <label>First Name:</label>
//                         <Input
//                               value={firstName}
//                               onChange={(e) => setFirstName(e.target.value)}
//                               type='text'
//                               required
//                         />

//                         <label>Last Name:</label>
//                         <Input
//                               value={lastName}
//                               onChange={(e) => setLastName(e.target.value)}
//                               type='text'
//                               required
//                         />

//                         <label htmlFor='dateOfBirth'>Date of Birth:</label>

//                         <StyledDatePicker
//                               id='dateOfBirth'
//                               placeholderText='dd/mm/yyyy'
//                               selected={dateOfBirth}
//                               onChange={(date) =>
//                                     handleDateChange(date, 'dateOfBirth')
//                               }
//                               dateFormat='dd/mm/yyyy'
//                         />

//                         <label htmlFor='startDate'>Start Date:</label>
//                         <StyledDatePicker
//                               id='startDate'
//                               placeholderText='dd/mm/yyyy'
//                               selected={startDate}
//                               onChange={(date) =>
//                                     handleDateChange(date, 'startDate')
//                               }
//                               dateFormat='dd/mm/yyyy'
//                         />

//                         <StyledFieldset>
//                               <legend>Address</legend>
//                               <label>Street:</label>
//                               <Input
//                                     value={street}
//                                     onChange={(e) => setStreet(e.target.value)}
//                                     type='text'
//                                     required
//                               />

//                               <label>City:</label>
//                               <Input
//                                     value={city}
//                                     onChange={(e) => setCity(e.target.value)}
//                                     type='text'
//                                     required
//                               />

//                               <label>State:</label>
//                               <StyledSelect
//                                     classNamePrefix='Select'
//                                     placeholder='Select state'
//                                     value={state}
//                                     onChange={(newValue) =>
//                                           handleStateChange(
//                                                 newValue as {
//                                                       value: string;
//                                                       label: string;
//                                                 }
//                                           )
//                                     }
//                                     options={stateOptions}
//                               />

//                               <StyledLabel>Zip Code:</StyledLabel>
//                               <Input
//                                     value={zipCode}
//                                     onChange={(e) => setZipCode(e.target.value)}
//                                     type='text'
//                                     required
//                               />
//                         </StyledFieldset>

//                         <StyledLabel>Department:</StyledLabel>
//                         <StyledSelect
//                               classNamePrefix='Select'
//                               placeholder='Select department'
//                               value={department}
//                               onChange={(newValue) =>
//                                     handleDepartmentChange(
//                                           newValue as {
//                                                 value: string;
//                                                 label: string;
//                                           }
//                                     )
//                               }
//                               options={departmentOptions}
//                         />

//                         <StyledButton type='submit'>Save</StyledButton>
//                   </Form>

//                   {isModalOpen && (
//                         <Modal
//                               isOpen={isModalOpen}
//                               onClose={() => setIsModalOpen(false)}
//                               message='Employee Created!'
//                               label=''
//                               confirm='X'
//                               close=''
//                         >
//                               {/* <h2>Employee Created!</h2> */}
//                               <button
//                                     onClick={() => navigate('/employee-list')}
//                               >
//                                     Go to Employee List
//                               </button>
//                         </Modal>
//                   )}
//             </FormContainer>
//       );
// };

// export default CreateEmployee;

// const FormContainer = styled.div`
//       display: flex;
//       flex-direction: column;
//       align-items: center;
//       gap: 0.5rem;
//       padding: 2rem;
//       background-color: #f9f9f9;
//       border-radius: 8px;
//       box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

//       border: 3px solid #ccc;
//       border-radius: 5px;
//       margin: 40px auto 80px;
//       max-width: 800px;
//       //padding: 0 20px 20px;

//       @media (max-width: 768px) {
//             margin: 20px 10px; // Ajuste la marge pour les écrans mobiles
//             width: calc(
//                   100% - 20px
//             ); // Assure que la largeur totale (avec les marges) ne dépasse pas 100%
//             max-width: none; // Supprime la max-width pour les petits écrans
//       }
// `;

// const Form = styled.form`
//       display: flex;
//       flex-direction: column;
//       width: 100%;
//       gap: 0.5rem;
//       padding-bottom: 3rem;
// `;

// const Input = styled.input`
//       padding: 0.5rem;
//       border-radius: 4px;
//       font-size: 16px;
//       margin-bottom: 1rem;

//       &:focus {
//             outline: none;
//             border: none;
//             box-shadow: 0 0 10px #29712c;
//       }
// `;

// const StyledFieldset = styled.fieldset`
//       display: flex;
//       flex-direction: column;
//       gap: 0.5rem;
//       padding: 1rem;
//       background-color: #f0f3e5;
//       border: 3px solid #29712c;
// `;

// const StyledLabel = styled.label`
//       padding-top: 1rem;
//       display: block;
// `;

// const StyledButton = styled.button`
//       background-color: #29712c;
//       color: white;
//       font-weight: bold;
//       padding: 10px 20px;
//       border: none;
//       border-radius: 4px;
//       cursor: pointer;
//       font-size: 20px;
//       margin-top: 20px;
//       transition: background-color 0.3s ease;

//       &:hover {
//             background-color: #45a049;
//       }

//       &:active {
//             background-color: #3e8e41;
//       }

//       @media (max-width: 768px) {
//             width: 100%;
//             padding: 12px;
//       }
// `;

// const StyledDatePicker = styled(DatePicker)`
//       padding: 0.75rem;
//       border-radius: 4px;

//       font-size: 16px;
//       width: 100%;
//       margin-bottom: 1rem;

//       &:focus {
//             outline: none;
//             border: none;
//             box-shadow: 0 0 10px #29712c;
//       }
// ` as typeof DatePicker;

// const StyledSelect = styled(Select)`
//       .Select__control {
//             height: 40px;
//             width: 100%;
//             border-top: 2px solid black;
//             border-left: 2px solid black;
//             border-right: 2px solid gray;
//             border-bottom: 2px solid gray;
//             border-radius: 4px;
//             cursor: pointer;

//             &:hover {
//                   outline: none;
//                   border: none;
//                   box-shadow: 0 0 10px #29712c;
//             }

//             &.Select__control--is-focused {
//                   outline: none;
//                   border: none;
//                   box-shadow: 0 0 10px #29712c;
//             }
//       }

//       .Select__menu {
//             color: black;
//             background-color: white;

//             .Select__option:hover {
//                   background-color: green;
//                   color: white;
//             }

//             .Select__option--is-selected {
//                   background-color: #29712c;
//                   color: white;
//             }
//       }
// `;
