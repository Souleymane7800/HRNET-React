import React from 'react';
import { useSelector } from 'react-redux';
import {
      useTable,
      usePagination,
      useGlobalFilter,
      useSortBy, // Importation du hook de tri
      Column,
      TableState,
      TableInstance,
      Row,
      UsePaginationState,
      UsePaginationInstanceProps,
      UseGlobalFiltersInstanceProps,
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

interface TableStateWithGlobalFilter<D extends object = object>
      extends TableState<D> {
      globalFilter: string;
      pageIndex: number;
      pageSize: number;
}

interface TableStateWithPagination<D extends object = object>
      extends TableState<D>,
            UsePaginationState<D> {}

interface CustomTableInstance<D extends object = object>
      extends TableInstance<D>,
            UsePaginationInstanceProps<D>,
            UseGlobalFiltersInstanceProps<D> {
      state: TableStateWithGlobalFilter<D>;
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
                  initialState: { pageIndex: 0, pageSize: 10 } as Partial<
                        TableStateWithPagination<Employee>
                  >,
            },
            useGlobalFilter,
            useSortBy,
            usePagination
      ) as CustomTableInstance<Employee>;

      const { globalFilter, pageIndex, pageSize } = state;

      return (
            <ListContainer>
                  <Title>Employee List</Title>
                  <GlobalFilter
                        filter={globalFilter || ''}
                        setFilter={setGlobalFilter}
                  />
                  <TableWrapper>
                        <table {...getTableProps()}>
                              <thead>
                                    {headerGroups.map((headerGroup) => (
                                          <tr
                                                {...headerGroup.getHeaderGroupProps()}
                                          >
                                                {headerGroup.headers.map(
                                                      (column) => (
                                                            <th
                                                                  {...column.getHeaderProps(
                                                                        column.getSortByToggleProps()
                                                                  )}
                                                                  style={{
                                                                        cursor: 'pointer',
                                                                  }}
                                                            >
                                                                  {column.render(
                                                                        'Header'
                                                                  )}
                                                                  <span>
                                                                        {column.isSorted
                                                                              ? column.isSortedDesc
                                                                                    ? ' 🔽'
                                                                                    : ' 🔼'
                                                                              : ''}
                                                                  </span>
                                                            </th>
                                                      )
                                                )}
                                          </tr>
                                    ))}
                              </thead>
                              <tbody {...getTableBodyProps()}>
                                    {page.map((row: Row<Employee>) => {
                                          prepareRow(row);
                                          return (
                                                <tr {...row.getRowProps()}>
                                                      {row.cells.map((cell) => (
                                                            <td
                                                                  {...cell.getCellProps()}
                                                            >
                                                                  {cell.render(
                                                                        'Cell'
                                                                  )}
                                                            </td>
                                                      ))}
                                                </tr>
                                          );
                                    })}
                              </tbody>
                        </table>
                  </TableWrapper>

                  {/* <TableWrapper>
                        <table {...getTableProps()}>
                              <thead>
                                    {headerGroups.map((headerGroup) => (
                                          <tr
                                                key={
                                                      headerGroup.getHeaderGroupProps()
                                                            .key
                                                }
                                                {...headerGroup.getHeaderGroupProps()}
                                          >
                                                {headerGroup.headers.map(
                                                      (column) => (
                                                            <th
                                                                  key={
                                                                        column.getHeaderProps()
                                                                              .key
                                                                  }
                                                                  {...column.getHeaderProps(
                                                                        column.getSortByToggleProps()
                                                                  )} // Ajout des propriétés de tri
                                                                  style={{
                                                                        cursor: 'pointer',
                                                                  }}
                                                            >
                                                                  {column.render(
                                                                        'Header'
                                                                  )}
                                                                  <span>
                                                                        {column.isSorted
                                                                              ? column.isSortedDesc
                                                                                    ? ' 🔽' // Tri descendant
                                                                                    : ' 🔼' // Tri ascendant
                                                                              : ''}
                                                                  </span>
                                                            </th>
                                                      )
                                                )}
                                          </tr>
                                    ))}
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
                  </TableWrapper> */}
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
`;

const Title = styled.h2`
      justify-content: center;
      display: flex;
      padding-bottom: 1rem;
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
      margin: 2rem;

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

      @media (max-width: 768px) {
            flex-wrap: wrap;
            justify-content: center;
            width: 100%;
            margin: 1rem 0;
            padding: 0 1rem;
            box-sizing: border-box;

            button,
            select {
                  margin: 0.25rem;
            }
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

// import React from 'react';
// import { useSelector } from 'react-redux';
// import {
//       useTable,
//       usePagination,
//       useGlobalFilter,
//       Column,
//       TableState,
//       TableInstance,
//       Row,
//       UsePaginationState,
//       UsePaginationInstanceProps,
//       UseGlobalFiltersInstanceProps,
// } from 'react-table';
// import styled from 'styled-components';

// interface RootState {
//       employees: {
//             list: Employee[];
//       };
// }

// interface Employee {
//       firstName: string;
//       lastName: string;
//       startDate: string;
//       department: string;
//       dateOfBirth: string;
//       street: string;
//       city: string;
//       state: string;
//       zipCode: string;
// }

// interface TableStateWithGlobalFilter<D extends object = object> extends TableState<D> {
//       globalFilter: string;
//       pageIndex: number;
//       pageSize: number;
//     }

// interface TableStateWithPagination<D extends object = object> extends TableState<D>, UsePaginationState<D> {}

// interface CustomTableInstance<D extends object = object> extends
//   TableInstance<D>,
//   UsePaginationInstanceProps<D>,
//   UseGlobalFiltersInstanceProps<D> {
//   state: TableStateWithGlobalFilter<D>;
// }

// // Composant de recherche globale
// const GlobalFilter = ({
//       filter,
//       setFilter,
// }: {
//       filter: string;
//       setFilter: (filterValue: string) => void;
// }) => {
//       return (
//             <SearchWrapper>
//                   Search:{' '}
//                   <input
//                         value={filter || ''}
//                         onChange={(e) => setFilter(e.target.value)}
//                         placeholder='Search...'
//                   />
//             </SearchWrapper>
//       );
// };

// const EmployeeList = () => {
//       const employees = useSelector((state: RootState) => state.employees.list);

//       const columns: Column<Employee>[] = React.useMemo(
//             () => [
//                   {
//                         Header: 'First Name',
//                         accessor: 'firstName',
//                   },
//                   {
//                         Header: 'Last Name',
//                         accessor: 'lastName',
//                   },
//                   {
//                         Header: 'Start Date',
//                         accessor: 'startDate',
//                   },
//                   {
//                         Header: 'Department',
//                         accessor: 'department',
//                   },
//                   {
//                         Header: 'Date of Birth',
//                         accessor: 'dateOfBirth',
//                   },
//                   {
//                         Header: 'Street',
//                         accessor: 'street',
//                   },
//                   {
//                         Header: 'City',
//                         accessor: 'city',
//                   },
//                   {
//                         Header: 'State',
//                         accessor: 'state',
//                   },
//                   {
//                         Header: 'Zip Code',
//                         accessor: 'zipCode',
//                   },
//             ],
//             []
//       );

//       const {
//             getTableProps,
//             getTableBodyProps,
//             headerGroups,
//             prepareRow,
//             page,
//             canPreviousPage,
//             canNextPage,
//             pageOptions,
//             pageCount,
//             gotoPage,
//             nextPage,
//             previousPage,
//             setPageSize,
//             state,
//             setGlobalFilter,
//           } = useTable<Employee>(
//             {
//               columns,
//               data: employees,
//               initialState: { pageIndex: 0, pageSize: 10 } as Partial<TableStateWithPagination<Employee>>,
//             },
//             useGlobalFilter,
//             usePagination
//           ) as CustomTableInstance<Employee>;

//       const { globalFilter, pageIndex, pageSize } = state;

//       return (
//             <ListContainer>
//                   <Title>Employee List</Title>
//                   <GlobalFilter
//                         filter={globalFilter || ''}
//                         setFilter={setGlobalFilter}
//                   />
//                   <TableWrapper>
//                         <table {...getTableProps()}>
//                               <thead>
//                                     {headerGroups.map((headerGroup) => {
//                                           const {
//                                                 key: headerGroupKey,
//                                                 ...headerGroupProps
//                                           } = headerGroup.getHeaderGroupProps();
//                                           return (
//                                                 <tr
//                                                       key={headerGroupKey}
//                                                       {...headerGroupProps}
//                                                 >
//                                                       {headerGroup.headers.map(
//                                                             (column) => {
//                                                                   const {
//                                                                         key,
//                                                                         ...restHeaderProps
//                                                                   } =
//                                                                         column.getHeaderProps();
//                                                                   return (
//                                                                         <th
//                                                                               key={
//                                                                                     key
//                                                                               }
//                                                                               {...restHeaderProps}
//                                                                         >
//                                                                               {column.render(
//                                                                                     'Header'
//                                                                               )}
//                                                                         </th>
//                                                                   );
//                                                             }
//                                                       )}
//                                                 </tr>
//                                           );
//                                     })}
//                               </thead>
//                               <tbody {...getTableBodyProps()}>
//                                     {page.map((row: Row<Employee>) => {
//                                           prepareRow(row);
//                                           const { key: rowKey, ...rowProps } =
//                                                 row.getRowProps();
//                                           return (
//                                                 <tr key={rowKey} {...rowProps}>
//                                                       {row.cells.map((cell) => {
//                                                             const {
//                                                                   key,
//                                                                   ...restCellProps
//                                                             } =
//                                                                   cell.getCellProps();
//                                                             return (
//                                                                   <td
//                                                                         key={
//                                                                               key
//                                                                         }
//                                                                         {...restCellProps}
//                                                                   >
//                                                                         {cell.render(
//                                                                               'Cell'
//                                                                         )}
//                                                                   </td>
//                                                             );
//                                                       })}
//                                                 </tr>
//                                           );
//                                     })}
//                               </tbody>
//                         </table>
//                   </TableWrapper>
//                   <PaginationWrapper>
//                         <button
//                               onClick={() => gotoPage(0)}
//                               disabled={!canPreviousPage}
//                         >
//                               {'<<'}
//                         </button>
//                         <button
//                               onClick={() => previousPage()}
//                               disabled={!canPreviousPage}
//                         >
//                               {'<'}
//                         </button>
//                         <span>
//                               Page{' '}
//                               <strong>
//                                     {pageIndex + 1} of {pageOptions.length}
//                               </strong>{' '}
//                         </span>
//                         <button
//                               onClick={() => nextPage()}
//                               disabled={!canNextPage}
//                         >
//                               {'>'}
//                         </button>
//                         <button
//                               onClick={() => gotoPage(pageCount - 1)}
//                               disabled={!canNextPage}
//                         >
//                               {'>>'}
//                         </button>
//                         <select
//                               value={pageSize}
//                               onChange={(e) => {
//                                     setPageSize(Number(e.target.value));
//                               }}
//                         >
//                               {[10, 20, 30, 40, 50].map((pageSize) => (
//                                     <option key={pageSize} value={pageSize}>
//                                           Show {pageSize}
//                                     </option>
//                               ))}
//                         </select>
//                   </PaginationWrapper>
//             </ListContainer>
//       );
// };

// export default EmployeeList;

// const ListContainer = styled.div`
//       padding: 2rem;
//       background-color: #fff;
//       border-radius: 8px;
//       box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
// `;

// const Title = styled.h2`
//       justify-content: center;
//       display: flex;
//       padding-bottom: 1rem;
// `;

// const TableWrapper = styled.div`
//       overflow-x: auto;
//       margin-bottom: 1rem;

//       table {
//             width: 100%;
//             border-collapse: collapse;

//             th,
//             td {
//                   padding: 0.75rem;
//                   text-align: left;
//                   border-bottom: 1px solid #ddd;
//                   white-space: nowrap;
//             }

//             th {
//                   background-color: #8fdf93;
//             }
//       }
// `;

// const PaginationWrapper = styled.div`
//       display: flex;
//       align-items: center;
//       justify-content: center;
//       gap: 0.5rem;
//       margin: 2rem;

//       button {
//             padding: 0.25rem 0.5rem;
//             border: 1px solid #ddd;
//             background-color: #f4f4f4;
//             cursor: pointer;

//             &:disabled {
//                   opacity: 0.5;
//                   cursor: not-allowed;
//             }
//       }

//       select {
//             padding: 0.25rem;
//       }

//       @media (max-width: 768px) {
//             flex-wrap: wrap;
//             justify-content: center;
//             width: 100%;
//             margin: 1rem 0;
//             padding: 0 1rem;
//             box-sizing: border-box;

//             button,
//             select {
//                   margin: 0.25rem;
//             }
//       }
// `;

// const SearchWrapper = styled.div`
//       margin-bottom: 1rem;

//       input {
//             margin-left: 0.5rem;
//             padding: 0.25rem;
//             width: 200px;
//             font-size: 18px;
//       }
// `;
