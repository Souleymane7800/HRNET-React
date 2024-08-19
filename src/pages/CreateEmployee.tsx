// pages/CreateEmployee.tsx
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addEmployee } from '../features/employeesSlice';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import StateSelect from '../components/StateSelect';
import Modal from '../components/Modal';
import styled from 'styled-components';

const CreateEmployee = () => {
      const [firstName, setFirstName] = useState('');
      const [lastName, setLastName] = useState('');
      const [dateOfBirth, setDateOfBirth] = useState<Date | null>(null);
      const [startDate, setStartDate] = useState<Date | null>(null);
      const [state, setState] = useState('AL');
      const [department, setDepartment] = useState('Sales');
      const [isModalOpen, setIsModalOpen] = useState(false);

      const dispatch = useDispatch();
      const navigate = useNavigate();

      const handleSubmit = (e: React.FormEvent) => {
            e.preventDefault();
            const employee = {
                  firstName,
                  lastName,
                  dateOfBirth: dateOfBirth?.toLocaleDateString() || '',
                  startDate: startDate?.toLocaleDateString() || '',
                  department,
                  state,
            };
            dispatch(addEmployee(employee));
            setIsModalOpen(true);
      };

      return (
            <FormContainer>
                  <h2>Create Employee</h2>
                  <form onSubmit={handleSubmit}>
                        <label>First Name:</label>
                        <input
                              value={firstName}
                              onChange={(e) => setFirstName(e.target.value)}
                        />

                        <label>Last Name:</label>
                        <input
                              value={lastName}
                              onChange={(e) => setLastName(e.target.value)}
                        />

                        <label>Date of Birth:</label>
                        <DatePicker
                              selectedDate={dateOfBirth}
                              onChange={setDateOfBirth}
                        />

                        <label>Start Date:</label>
                        <DatePicker
                              selectedDate={startDate}
                              onChange={setStartDate}
                        />

                        <label>State:</label>
                        <StateSelect value={state} onChange={setState} />

                        <label>Department:</label>
                        <select
                              value={department}
                              onChange={(e) => setDepartment(e.target.value)}
                        >
                              <option>Sales</option>
                              <option>Marketing</option>
                              <option>Engineering</option>
                              <option>Human Resources</option>
                              <option>Legal</option>
                        </select>

                        <button type='submit'>Save</button>
                  </form>

                  <Modal
                        isOpen={isModalOpen}
                        onClose={() => setIsModalOpen(false)}
                  >
                        Employee Created!
                        <button onClick={() => navigate('/employee-list')}>
                              Go to Employee List
                        </button>
                  </Modal>
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
