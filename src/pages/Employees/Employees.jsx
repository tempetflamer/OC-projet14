import React, { useMemo, useState } from 'react'
import DataTable, { createTheme } from 'react-data-table-component'
import Layout from '../../components/Layout/Layout'
import { useEmployeeState } from '../../utils/EmployeeContext.jsx'
import './Employees.scss'
import { columns } from '../../data/data.js'

export default function Employees() {
  const { employees } = useEmployeeState()
  const [filterText, setFilterText] = useState('')
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false)

  /**
   *  Create a filter to search for an element in all items in each column
   */
  const filteredItems = employees.filter(
    (item) =>
      item.firstName.toLowerCase().includes(filterText.toLowerCase()) ||
      item.lastName.toLowerCase().includes(filterText.toLowerCase()) ||
      item.city.toLowerCase().includes(filterText.toLowerCase()) ||
      item.department.toLowerCase().includes(filterText.toLowerCase()) ||
      item.dateOfBirth.toLowerCase().includes(filterText.toLowerCase()) ||
      item.state.toLowerCase().includes(filterText.toLowerCase()) ||
      item.street.toLowerCase().includes(filterText.toLowerCase()) ||
      item.zipCode.toLowerCase().includes(filterText.toLowerCase()) ||
      item.startDate.toLowerCase().includes(filterText.toLowerCase())
  )

  /**
   * createTheme create a new theme named wealth-health that overrides the build in light theme
   */
  createTheme(
    'wealth-health',
    {
      text: {
        primary: '#3C8303', // 93AD18
        secondary: '#196161',
      },
      background: {
        default: '#F5FFFA',
      },
      context: {
        background: '#C3B84E',
        text: '#FFFFFF',
      },
      divider: {
        default: '#93AD18',
      },
      action: {
        button: 'rgba(0,0,0,.54)',
        hover: 'rgba(0,0,0,.08)',
        disabled: 'rgba(0,0,0,.12)',
      },
    },
    'light'
  )

  /**
   * Create a sub-header that will contain the search system to look for an element in the table.
   */
  const subHeaderComponentMemo = useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle)
        setFilterText('')
      }
    }

    return (
      <>
        <input
          className="search-input"
          id="search"
          type="text"
          placeholder="Search an employee(s)"
          aria-label="Search Input"
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
        />
        <button className="clearSearch" type="button" onClick={handleClear}>
          X
        </button>
      </>
    )
  }, [filterText, resetPaginationToggle])

  if (!employees && !columns) {
    return ''
  }
  return (
    <Layout>
      <h2>Current Employee</h2>
      <div className="table--container">
        <DataTable
          columns={columns}
          data={filteredItems}
          theme="wealth-health"
          pagination
          paginationRowsPerPageOptions={[10, 25, 50, 100]}
          subHeader
          subHeaderComponent={subHeaderComponentMemo}
          noDataComponent="No employee found"
          striped
          responsive
        />
      </div>
    </Layout>
  )
}
