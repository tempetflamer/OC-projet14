import React from 'react'
import PropTypes from 'prop-types'
import Layout from '../../components/Layout/Layout'
import { useSelector } from 'react-redux'
import { useCallback } from 'react'
import { useEffect } from 'react'
import DataTable, { createTheme } from 'react-data-table-component'
import { useState } from 'react'
import './Employees.scss'
import { useMemo } from 'react'

export default function Employees() {
  const stateEmployee = useSelector((state) => state.employee.employees)
  const [filterText, setFilterText] = useState('')
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false)

  //filter system, filter everything
  const filteredItems = stateEmployee.filter(
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

  // createTheme create a new theme named wealth-health that overrides the build in light theme
  createTheme(
    'wealth-health',
    {
      text: {
        primary: '#93AD18',
        secondary: '#2aa198',
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

  // create column for table
  const columns = [
    {
      name: 'First Name',
      selector: (row) => row.firstName,
      sortable: true,
      style: {},
    },
    {
      name: 'Last Name',
      selector: (row) => row.lastName,
      sortable: true,
      style: {},
    },
    {
      name: 'Start Date',
      selector: (row) => row.startDate,
      sortable: true,
      style: {},
    },
    {
      name: 'Department',
      selector: (row) => row.department,
      sortable: true,
      style: {},
    },
    {
      name: 'Date of Birth',
      selector: (row) => row.dateOfBirth,
      sortable: true,
      style: {},
    },
    {
      name: 'Street',
      selector: (row) => row.street,
      sortable: true,
      style: {},
    },
    {
      name: 'City',
      selector: (row) => row.city,
      sortable: true,
      style: {},
    },
    {
      name: 'State',
      selector: (row) => row.state,
      sortable: true,
      style: {},
    },
    {
      name: 'Zip Code',
      selector: (row) => row.zipCode,
      sortable: true,
      style: {},
    },
  ]

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

  const employees = JSON.parse(localStorage.getItem('employees'))
  console.log('localStorage: ', employees)

  if (!stateEmployee && !columns /* && !data */) {
    return ''
  }
  console.log('stateEemployee', stateEmployee, typeof stateEmployee)
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
          //paginationResetDefaultPage={resetPaginationToggle} // optionally, a hook to reset pagination to page 1
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
