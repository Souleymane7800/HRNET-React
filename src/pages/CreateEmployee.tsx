import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addEmployee } from '../features/emplyeesSlice';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styled from 'styled-components';
import { Modal } from 'my-modal-souleymane7800';
// import 'my-modal-souleymane7800/dist/modal/Modal.css'
import Select, { SingleValue } from 'react-select';
import { Employee } from '../models/Employee';
import { states } from '../models/State'; // Import states

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
      const navigate = useNavigate();

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
            selectedOption: SingleValue<{ value: string; label: string }>
      ) => {
            if (selectedOption) {
                  setDepartment(selectedOption);
            }
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
            setIsModalOpen(true);
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
                                    placeholder='Select state'
                                    value={state}
                                    onChange={handleStateChange}
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
                              placeholder='Select department'
                              value={department}
                              onChange={handleDepartmentChange}
                              options={departmentOptions}
                        />

                        <StyledButton type='submit'>Save</StyledButton>
                  </Form>

                  {isModalOpen && (
                        <Modal
                              isOpen={isModalOpen}
                              onClose={() => setIsModalOpen(false)}
                              message='Employee Created!'
                              label='Employee Creation'
                              confirm='OK'
                              close='Close'
                        >
                              <h2>Employee Created!</h2>
                              <button
                                    onClick={() => navigate('/employee-list')}
                              >
                                    Go to Employee List
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
      //padding: 0 20px 20px;

      @media (max-width: 768px) {
            margin: 20px 10px; // Ajuste la marge pour les écrans mobiles
            width: calc(
                  100% - 20px
            ); // Assure que la largeur totale (avec les marges) ne dépasse pas 100%
            max-width: none; // Supprime la max-width pour les petits écrans
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

const StyledSelect = styled(Select).attrs(() => ({}))`
      .react-select__control {
            border-color: #ccc; /* Couleur de bordure par défaut */
            &:hover {
                  border-color: #888; /* Couleur de bordure au survol */
            }
      }

      .react-select__control--is-focused {
            border-color: #29712c; /* Couleur de bordure lorsque le composant est en focus */
            box-shadow: 0 0 5px #29712c; /* Ombre lorsque le composant est en focus */
      }

      .react-select__placeholder {
            color: #888; /* Couleur du placeholder */
      }

      .react-select__menu {
            border-color: #29712c; /* Bordure du menu déroulant */
      }
      border: 1px solid black;
      &:focus {
            outline: none;
            border: none;
            box-shadow: 0 0 10px #29712c;
      }
`;
