/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const EmployeeList = () => {
  const employees = useSelector((state: any) => state.employees.list);

  return (
    <ListContainer>
      <h2>Employee List</h2>
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Start Date</th>
            <th>Department</th>
            <th>Date of Birth</th>
            <th>State</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee: any, index: number) => (
            <tr key={index}>
              <td>{employee.firstName}</td>
              <td>{employee.lastName}</td>
              <td>{employee.startDate}</td>
              <td>{employee.department}</td>
              <td>{employee.dateOfBirth}</td>
              <td>{employee.state}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <a href="/">Home</a>
    </ListContainer>
  );
};

export default EmployeeList;

const ListContainer = styled.div`
  padding: 2rem;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  margin-top: 2rem;
  
  table {
    width: 100%;
    border-collapse: collapse;
    
    th, td {
      padding: 0.75rem;
      text-align: left;
      border-bottom: 1px solid #ddd;
    }
    
    th {
      background-color: #f4f4f4;
    }
  }
`;
