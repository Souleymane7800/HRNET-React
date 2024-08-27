import React from 'react';
import { useSelector } from 'react-redux';
import {
      useTable,
      usePagination,
      useGlobalFilter,
      Column,
      TableState,
      TableInstance,
      Row,
} from 'react-table';
import styled from 'styled-components';

interface RootState {
      employees: {
            list: Employee[];
      };
}

interface Employee {
      firstName: string;
      lastName: string;
      startDate: string;
      department: string;
      dateOfBirth: string;
      street: string;
      city: string;
      state: string;
      zipCode: string;
}

interface TableStateWithGlobalFilter<D extends object> extends TableState<D> {
      globalFilter: string; // Typé comme string, et non unknown
      page: number;
      pageIndex: number;
      pageSize: number;
}

// Composant de recherche globale
const GlobalFilter = ({
      filter,
      setFilter,
}: {
      filter: string;
      setFilter: (filterValue: string) => void;
}) => {
      return (
            <SearchWrapper>
                  Search:{' '}
                  <input
                        value={filter || ''}
                        onChange={(e) => setFilter(e.target.value)}
                        placeholder='Search...'
                  />
            </SearchWrapper>
      );
};

const EmployeeList = () => {
      const employees = useSelector((state: RootState) => state.employees.list);

      const columns: Column<Employee>[] = React.useMemo(
            () => [
                  {
                        Header: 'First Name',
                        accessor: 'firstName',
                  },
                  {
                        Header: 'Last Name',
                        accessor: 'lastName',
                  },
                  {
                        Header: 'Start Date',
                        accessor: 'startDate',
                  },
                  {
                        Header: 'Department',
                        accessor: 'department',
                  },
                  {
                        Header: 'Date of Birth',
                        accessor: 'dateOfBirth',
                  },
                  {
                        Header: 'Street',
                        accessor: 'street',
                  },
                  {
                        Header: 'City',
                        accessor: 'city',
                  },
                  {
                        Header: 'State',
                        accessor: 'state',
                  },
                  {
                        Header: 'Zip Code',
                        accessor: 'zipCode',
                  },
            ],
            []
      );

      const {
            getTableProps,
            getTableBodyProps,
            headerGroups,
            prepareRow,
            page,
            canPreviousPage,
            canNextPage,
            pageOptions,
            pageCount,
            gotoPage,
            nextPage,
            previousPage,
            setPageSize,
            state,
            setGlobalFilter,
      } = useTable<Employee>(
            {
                  columns,
                  data: employees,
                  initialState: { pageIndex: 0, pageSize: 10 },
            },
            useGlobalFilter,
            usePagination
      ) as TableInstance<Employee> & {
            state: TableStateWithGlobalFilter<Employee>;
            // page: unknown,
            // canPreviousPage: unknown,
            // canNextPage: unknown,
            // pageOptions: unknown,
            // pageCount: unknown,
            // gotoPage: unknown,
            // nextPage: unknown,
            // previousPage: unknown,
            // setPageSize: unknown,
            // // state,
            // setGlobalFilter: unknown,
      };

      const { globalFilter, pageIndex, pageSize } = state;

      return (
            <ListContainer>
                  <h2>Employee List</h2>
                  <GlobalFilter
                        filter={globalFilter || ''}
                        setFilter={setGlobalFilter}
                  />
                  <TableWrapper>
                        <table {...getTableProps()}>
                              <thead>
                                    {headerGroups.map((headerGroup) => {
                                          const {
                                                key: headerGroupKey,
                                                ...headerGroupProps
                                          } = headerGroup.getHeaderGroupProps();
                                          return (
                                                <tr
                                                      key={headerGroupKey}
                                                      {...headerGroupProps}
                                                >
                                                      {headerGroup.headers.map(
                                                            (column) => {
                                                                  const {
                                                                        key,
                                                                        ...restHeaderProps
                                                                  } =
                                                                        column.getHeaderProps();
                                                                  return (
                                                                        <th
                                                                              key={
                                                                                    key
                                                                              }
                                                                              {...restHeaderProps}
                                                                        >
                                                                              {column.render(
                                                                                    'Header'
                                                                              )}
                                                                        </th>
                                                                  );
                                                            }
                                                      )}
                                                </tr>
                                          );
                                    })}
                              </thead>
                              <tbody {...getTableBodyProps()}>
                                    {page.map((row: Row<Employee>) => {
                                          prepareRow(row);
                                          const { key: rowKey, ...rowProps } =
                                                row.getRowProps();
                                          return (
                                                <tr key={rowKey} {...rowProps}>
                                                      {row.cells.map((cell) => {
                                                            const {
                                                                  key,
                                                                  ...restCellProps
                                                            } =
                                                                  cell.getCellProps();
                                                            return (
                                                                  <td
                                                                        key={
                                                                              key
                                                                        }
                                                                        {...restCellProps}
                                                                  >
                                                                        {cell.render(
                                                                              'Cell'
                                                                        )}
                                                                  </td>
                                                            );
                                                      })}
                                                </tr>
                                          );
                                    })}
                              </tbody>
                        </table>
                  </TableWrapper>
                  <PaginationWrapper>
                        <button
                              onClick={() => gotoPage(0)}
                              disabled={!canPreviousPage}
                        >
                              {'<<'}
                        </button>
                        <button
                              onClick={() => previousPage()}
                              disabled={!canPreviousPage}
                        >
                              {'<'}
                        </button>
                        <span>
                              Page{' '}
                              <strong>
                                    {pageIndex + 1} of {pageOptions.length}
                              </strong>{' '}
                        </span>
                        <button
                              onClick={() => nextPage()}
                              disabled={!canNextPage}
                        >
                              {'>'}
                        </button>
                        <button
                              onClick={() => gotoPage(pageCount - 1)}
                              disabled={!canNextPage}
                        >
                              {'>>'}
                        </button>
                        <select
                              value={pageSize}
                              onChange={(e) => {
                                    setPageSize(Number(e.target.value));
                              }}
                        >
                              {[10, 20, 30, 40, 50].map((pageSize) => (
                                    <option key={pageSize} value={pageSize}>
                                          Show {pageSize}
                                    </option>
                              ))}
                        </select>
                  </PaginationWrapper>
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
`;

const TableWrapper = styled.div`
      overflow-x: auto;
      margin-bottom: 1rem;

      table {
            width: 100%;
            border-collapse: collapse;

            th,
            td {
                  padding: 0.75rem;
                  text-align: left;
                  border-bottom: 1px solid #ddd;
                  white-space: nowrap;
            }

            th {
                  background-color: #8fdf93;
            }
      }
`;

const PaginationWrapper = styled.div`
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      margin-bottom: 1rem;

      button {
            padding: 0.25rem 0.5rem;
            border: 1px solid #ddd;
            background-color: #f4f4f4;
            cursor: pointer;

            &:disabled {
                  opacity: 0.5;
                  cursor: not-allowed;
            }
      }

      select {
            padding: 0.25rem;
      }
`;

const SearchWrapper = styled.div`
      margin-bottom: 1rem;

      input {
            margin-left: 0.5rem;
            padding: 0.25rem;
            width: 200px;
            font-size: 18px;
      }
`;

// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { useSelector } from 'react-redux';
// import { useTable } from 'react-table'
// import styled from 'styled-components';

// const EmployeeList = () => {
//       const employees = useSelector((state: any) => state.employees.list);

//       return (
//             <ListContainer>
//                   <h2>Employee List</h2>
//                   <table>
//                         <thead>
//                               <tr>
//                                     <th>First Name</th>
//                                     <th>Last Name</th>
//                                     <th>Start Date</th>
//                                     <th>Department</th>
//                                     <th>Date of Birth</th>
//                                     <th>State</th>
//                               </tr>
//                         </thead>
//                         <tbody>
//                               {employees.map((employee: any, index: number) => (
//                                     <tr key={index}>
//                                           <td>{employee.firstName}</td>
//                                           <td>{employee.lastName}</td>
//                                           <td>{employee.startDate}</td>
//                                           <td>{employee.department}</td>
//                                           <td>{employee.dateOfBirth}</td>
//                                           <td>{employee.state}</td>
//                                     </tr>
//                               ))}
//                         </tbody>
//                   </table>
//                   <a href='/'>Home</a>
//             </ListContainer>
//       );
// };

// export default EmployeeList;

// const ListContainer = styled.div`
//       padding: 2rem;
//       background-color: #fff;
//       border-radius: 8px;
//       box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
//       margin-top: 2rem;

//       table {
//             width: 100%;
//             border-collapse: collapse;

//             th,
//             td {
//                   padding: 0.75rem;
//                   text-align: left;
//                   border-bottom: 1px solid #ddd;
//             }

//             th {
//                   background-color: #f4f4f4;
//             }
//       }
// `;
