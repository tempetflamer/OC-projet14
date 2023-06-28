import React, { createContext, useContext, useState } from 'react'

/**
 * Create context EmployeeContext
 */
export const EmployeeContext = createContext({
  employees: [],
  setEmployees: () => Function.prototype,
  addEmployee: () => Function.prototype,
})

/**
 * Allow us to use useEmployeeState() instead of useContext(EmployeeContext) for better clarity
 */
export const useEmployeeState = () => useContext(EmployeeContext)

/**
 * EmployeeContext.Provider allow us to touch global state everywhere in our App.
 * This global state will carry state & dispatch from our reducer.
 */
const EmployeeContextProvider = ({ children }) => {
  const [employees, setEmployees] = useState([])

  const addEmployee = (employee) => {
    setEmployees([...employees, employee])
  }

  return <EmployeeContext.Provider value={{ employees, setEmployees, addEmployee }}>{children}</EmployeeContext.Provider>
}

export default EmployeeContextProvider
