import React from 'react';
import { useDispatch } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styled from 'styled-components';
import { Modal } from 'my-modal-souleymane7800';
import Select from 'react-select';
import { Employee } from '../models/Employee';
import { states } from '../models/State';
import employeeValidation from '../types/employeeValidation';
import { addEmployee } from '../features/emplyeesSlice';
import { OptionType } from '../types/EmployeeFormValues';

const calculateMaxDateOfBirth = () => {
      const today = new Date();
      return new Date(
            today.getFullYear() - 18,
            today.getMonth(),
            today.getDate()
      );
};

const CreateEmployee = () => {
      const dispatch = useDispatch();

      // Options for selection fields (Select)
      const departmentOptions = [
            { value: 'Sales', label: 'Sales' },
            { value: 'Marketing', label: 'Marketing' },
            { value: 'Engineering', label: 'Engineering' },
            { value: 'Human Resources', label: 'Human Resources' },
            { value: 'Legal', label: 'Legal' },
      ];

      const stateOptions = states.map((state) => ({
            value: state.abbreviation,
            label: state.name,
      }));

      // Modal state management
      const [isModalOpen, setIsModalOpen] = React.useState(false);

      const handleCloseModal = () => {
            setIsModalOpen(false);
      };

      return (
            <FormContainer>
                  <h2>Create a new Employee</h2>
                  <Formik
                        initialValues={{
                              firstName: '',
                              lastName: '',
                              dateOfBirth: null as Date | null,
                              startDate: null as Date | null,
                              street: '',
                              city: '',
                              state: null as OptionType | null,
                              zipCode: '',
                              department: null as OptionType | null,
                        }}
                        validationSchema={employeeValidation}
                        onSubmit={(values, { resetForm }) => {
                              // Prepare data for sending
                              const employee: Employee = {
                                    firstName: values.firstName,
                                    lastName: values.lastName,
                                    dateOfBirth: values.dateOfBirth
                                          ? values.dateOfBirth
                                                  .toLocaleDateString('en-GB', {
                                                        day: '2-digit',
                                                        month: '2-digit',
                                                        year: 'numeric',
                                                  })
                                                  .replace(/\//g, '-') // Replace / with -
                                          : '',

                                    startDate: values.startDate
                                          ? values.startDate
                                                  .toLocaleDateString('en-GB', {
                                                        day: '2-digit',
                                                        month: '2-digit',
                                                        year: 'numeric',
                                                  })
                                                  .replace(/\//g, '-') // Replace / with -
                                          : '',

                                    street: values.street,
                                    city: values.city,
                                    state: values.state!.value,
                                    zipCode: values.zipCode,
                                    department: values.department!.value,
                              };

                              // Dispatch to add the employee
                              dispatch(addEmployee(employee));

                              // Reset the form
                              resetForm();
                              setIsModalOpen(true);
                        }}
                  >
                        {({ values, setFieldValue }) => (
                              <StyledFormikForm>
                                    <label htmlFor='firstName'>
                                          First Name:
                                    </label>
                                    <Field
                                          name='firstName'
                                          as={Input}
                                          type='text'
                                          id='firstName'
                                          aria-label='First Name'
                                    />
                                    <ErrorMessage
                                          name='firstName'
                                          component={WarningSpan}
                                    />

                                    <label htmlFor='lastName'>Last Name:</label>
                                    <Field
                                          name='lastName'
                                          as={Input}
                                          type='text'
                                          id='lastName'
                                          aria-label='Last Name'
                                    />
                                    <ErrorMessage
                                          name='lastName'
                                          component={WarningSpan}
                                    />

                                    <label htmlFor='dateOfBirth'>
                                          Date of Birth:
                                    </label>
                                    <StyledDatePicker
                                          id='dateOfBirth'
                                          placeholderText='DD/MM/YYYY'
                                          selected={values.dateOfBirth}
                                          onChange={(date) =>
                                                setFieldValue(
                                                      'dateOfBirth',
                                                      date
                                                )
                                          }
                                          dateFormat='dd/MM/yyyy'
                                          maxDate={calculateMaxDateOfBirth()}
                                    />
                                    <ErrorMessage
                                          name='dateOfBirth'
                                          component={WarningSpan}
                                    />

                                    <StyledLabel htmlFor='startDate'>
                                          Start Date:
                                    </StyledLabel>
                                    <StyledDatePicker
                                          id='startDate'
                                          placeholderText='DD/MM/YYYY'
                                          selected={values.startDate}
                                          onChange={(date) =>
                                                setFieldValue('startDate', date)
                                          }
                                          dateFormat='dd/MM/yyyy'
                                    />
                                    <ErrorMessage
                                          name='startDate'
                                          component={WarningSpan}
                                    />

                                    <StyledFieldset>
                                          <legend>Address</legend>
                                          <label htmlFor='street'>
                                                Street:
                                          </label>
                                          <Field
                                                name='street'
                                                as={Input}
                                                type='text'
                                                aria-label='Street'
                                                id='street'
                                          />
                                          <ErrorMessage
                                                name='street'
                                                component={WarningSpan}
                                          />

                                          <label htmlFor='city'>City:</label>
                                          <Field
                                                name='city'
                                                as={Input}
                                                type='text'
                                                aria-label='City'
                                                id='city'
                                          />
                                          <ErrorMessage
                                                name='city'
                                                component={WarningSpan}
                                          />

                                          <label htmlFor='state'>State:</label>
                                          <StyledSelect
                                                id='state'
                                                name='state'
                                                aria-label='Select state'
                                                classNamePrefix='Select'
                                                placeholder='Select state'
                                                value={values.state}
                                                onChange={(newValue) =>
                                                      setFieldValue(
                                                            'state',
                                                            newValue
                                                      )
                                                }
                                                options={stateOptions}
                                          />
                                          <ErrorMessage
                                                name='state'
                                                component={WarningSpan}
                                          />

                                          <label htmlFor='zipCode'>
                                                Zip Code:
                                          </label>
                                          <Field
                                                id='zipcode'
                                                name='zipCode'
                                                as={Input}
                                                type='text'
                                                aria-label='Zip code'
                                          />
                                          <ErrorMessage
                                                name='zipCode'
                                                component={WarningSpan}
                                          />
                                    </StyledFieldset>

                                    <label htmlFor='department'>
                                          Department:
                                    </label>
                                    <StyledSelect
                                          id='department'
                                          name='department'
                                          aria-label='Department'
                                          classNamePrefix='Select'
                                          placeholder='Select department'
                                          value={values.department}
                                          onChange={(newValue) =>
                                                setFieldValue(
                                                      'department',
                                                      newValue
                                                )
                                          }
                                          options={departmentOptions}
                                    />
                                    <ErrorMessage
                                          name='department'
                                          component={WarningSpan}
                                    />

                                    <StyledButton type='submit'>
                                          Save
                                    </StyledButton>
                              </StyledFormikForm>
                        )}
                  </Formik>
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
                                    backgroundColor: 'rgba(0, 0, 0, 0.3)',
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
                                    backgroundColor: 'white',
                                    width: '325px',
                                    height: '100px',
                                    position: 'relative',
                              }}
                              bodyStyle={{ marginTop: '10px' }}
                        >
                              <button
                                    style={{
                                          position: 'absolute',
                                          bottom: '10px',
                                          right: '10px',
                                          backgroundColor: 'rgb(185 180 180)',
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

const StyledFormikForm = styled(Form)`
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

const WarningSpan = styled.span`
      color: red;
      font-size: 0.875rem;
      margin-top: -0.5rem;
      margin-bottom: 1rem;
      display: inline-block;
      opacity: 1;
      transition: opacity 0.3s ease-in-out;
`;

const StyledFieldset = styled.fieldset`
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      padding: 1rem;
      margin-bottom: 1rem;
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
            margin-bottom: 1rem;
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
