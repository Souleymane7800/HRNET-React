import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addEmployee } from '../features/emplyeesSlice';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styled from 'styled-components';
import { Modal } from 'my-modal-souleymane7800';
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
  const [state, setState] = useState<{ value: string; label: string } | null>(null);
  const [zipCode, setZipCode] = useState('');
  const [department, setDepartment] = useState<{ value: string; label: string } | null>({ value: 'Sales', label: 'Sales' });
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
  const handleDepartmentChange = (selectedOption: SingleValue<{ value: string; label: string }>) => {
    if (selectedOption) {
      setDepartment(selectedOption);
    }
  };

  // Handle state selection change
  const handleStateChange = (selectedOption: SingleValue<{ value: string; label: string }>) => {
    if (selectedOption) {
      setState(selectedOption);
    }
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Ensure that both department and state are selected
    if (!department || !state) return;

    const employee: Employee = {
      firstName,
      lastName,
      dateOfBirth,
      startDate,
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
  const stateOptions = states.map(state => ({
    value: state.abbreviation,
    label: state.name
  }));

  return (
    <FormContainer>
      <h2>Create Employee</h2>
      <form onSubmit={handleSubmit}>
        <label>First Name:</label>
        <input
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          type='text'
          required
        />

        <label>Last Name:</label>
        <input
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          type='text'
          required
        />

        <label>Date of Birth:</label>
        <DatePicker
          id='dateOfBirth'
          selected={dateOfBirth}
          onChange={(date) => handleDateChange(date, 'dateOfBirth')}
          dateFormat='MM/dd/yyyy'
        />

        <label htmlFor='startDate'>Start Date:</label>
        <DatePicker
          id='startDate'
          selected={startDate}
          onChange={(date) => handleDateChange(date, 'startDate')}
          dateFormat='MM/dd/yyyy'
        />

        <fieldset>
          <legend>Address</legend>
          <label>Street:</label>
          <input
            value={street}
            onChange={(e) => setStreet(e.target.value)}
            type='text'
            required
          />

          <label>City:</label>
          <input
            value={city}
            onChange={(e) => setCity(e.target.value)}
            type='text'
            required
          />

          <label>State:</label>
          <Select
            value={state}
            onChange={handleStateChange}
            options={stateOptions}
          />

          <label>Zip Code:</label>
          <input
            value={zipCode}
            onChange={(e) => setZipCode(e.target.value)}
            type='text'
            required
          />
        </fieldset>

        <label>Department:</label>
        <Select
          value={department}
          onChange={handleDepartmentChange}
          options={departmentOptions}
        />

        <button type='submit'>Save</button>
      </form>

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
          <button onClick={() => navigate('/employee-list')}>
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
  gap: 1rem;
  padding: 2rem;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;