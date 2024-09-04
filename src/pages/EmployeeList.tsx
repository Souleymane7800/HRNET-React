import React from 'react';
import { useSelector } from 'react-redux';
import {
      useTable,
      usePagination,
      useGlobalFilter,
      useSortBy,
      Column,
      TableState,
      TableInstance,
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
            rows,
            canPreviousPage,
            canNextPage,
            pageOptions,
            // pageCount,
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
      const totalCount = employees.length;
      const filteredCount = rows.length;

      return (
            <ListContainer>
                  <Title>Employee List</Title>
                  <StyledDiv>
                        <div>
                              <label htmlFor='select'></label>
                              Show {''}
                              <select
                                    id='select'
                                    name='select'
                                    aria-label='select'
                                    value={pageSize}
                                    onChange={(e) =>
                                          setPageSize(Number(e.target.value))
                                    }
                              >
                                    {[10, 25, 50, 100].map((size) => (
                                          <option key={size} value={size}>
                                                {size}
                                          </option>
                                    ))}
                              </select>
                              {''} entries
                        </div>
                        <GlobalFilter
                              filter={globalFilter || ''}
                              setFilter={setGlobalFilter}
                        />
                  </StyledDiv>
                  <TableWrapper>
                        <table {...getTableProps()}>
                              <thead>
                                    {headerGroups.map((headerGroup) => (
                                          <tr
                                                {...headerGroup.getHeaderGroupProps()}
                                          >
                                                {headerGroup.headers.map(
                                                      (column: any) => (
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
                                    {employees.length > 0 ? (
                                          page.length > 0 ? (
                                                page.map((row) => {
                                                      prepareRow(row);
                                                      return (
                                                            <tr
                                                                  {...row.getRowProps()}
                                                            >
                                                                  {row.cells.map(
                                                                        (
                                                                              cell
                                                                        ) => (
                                                                              <td
                                                                                    {...cell.getCellProps()}
                                                                              >
                                                                                    {cell.render(
                                                                                          'Cell'
                                                                                    )}
                                                                              </td>
                                                                        )
                                                                  )}
                                                            </tr>
                                                      );
                                                })
                                          ) : (
                                                <tr>
                                                      <td
                                                            colSpan={
                                                                  columns.length
                                                            }
                                                            style={{
                                                                  textAlign:
                                                                        'center',
                                                            }}
                                                      >
                                                            No matching records
                                                            found
                                                      </td>
                                                </tr>
                                          )
                                    ) : (
                                          <tr>
                                                <td
                                                      colSpan={columns.length}
                                                      style={{
                                                            textAlign: 'center',
                                                      }}
                                                >
                                                      No data available in table
                                                </td>
                                          </tr>
                                    )}
                              </tbody>
                        </table>
                  </TableWrapper>
                  <PaginationWrapper>
                        <span>
                              {filteredCount > 0
                                    ? `Showing ${
                                            pageIndex * pageSize + 1
                                      } to ${Math.min(
                                            (pageIndex + 1) * pageSize,
                                            filteredCount
                                      )} of ${filteredCount} entries`
                                    : `Showing 0 to 0 of 0 entries`}
                              {filteredCount < totalCount &&
                                    ` (filtered from ${totalCount} total entries)`}
                        </span>
                        <div>
                              {/* <button
                                    onClick={() => gotoPage(0)}
                                    disabled={!canPreviousPage}
                              >
                                    First
                              </button> */}
                              <button
                                    onClick={() => previousPage()}
                                    disabled={!canPreviousPage}
                              >
                                    Previous
                              </button>
                              {pageOptions.map((page) => (
                                    <button
                                          key={page}
                                          onClick={() => gotoPage(page)}
                                          style={{
                                                fontWeight:
                                                      page === pageIndex
                                                            ? 'bold'
                                                            : 'normal',
                                                backgroundColor:
                                                      page === pageIndex
                                                            ? '#ddd'
                                                            : 'transparent',
                                          }}
                                    >
                                          {page + 1}
                                    </button>
                              ))}
                              <button
                                    onClick={() => nextPage()}
                                    disabled={!canNextPage}
                              >
                                    Next
                              </button>
                              {/* <button
                                    onClick={() => gotoPage(pageCount - 1)}
                                    disabled={!canNextPage}
                              >
                                    Last
                              </button> */}
                        </div>
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

const StyledDiv = styled.div`
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      margin: 1rem 0; // Vous pouvez ajuster la marge selon vos besoins

      @media (max-width: 768px) {
            flex-direction: column;
            gap: 1rem;
      }
`;

const Title = styled.h2`
      justify-content: center;
      display: flex;
      padding-bottom: 1rem;
`;

const TableWrapper = styled.div`
      overflow-x: auto;
      margin-bottom: 1rem;

      tbody tr:nth-child(odd) {
            background-color: #f2f2f2; /* couleur pour les lignes impaires */
      }

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
      justify-content: space-between;
      width: 100%;
      gap: 0.5rem;
      margin: 2rem 0;

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
