import React, { createContext, useContext, useReducer } from 'react'

const EmployeeContext = createContext({
  employees: [],
  dispatch: {},
})

/**
 * A reducer with differents actions to change the global state of EmployeeContext
 */
function reducer(employees, action) {
  switch (action.type) {
    case 'addEmployee':
      employees.push(action.payload)
      return employees
    default:
      throw new Error()
  }
}

/**
 * EmployeeContext.Provider allow us to touch global state everywhere in our App.
 * This global state will carry state & dispatch from our reducer.
 */
export const EmployeeContextProvider = ({ children, value = [] }) => {
  const [employees, dispatch] = useReducer(reducer, value)
  return <EmployeeContext.Provider value={{ employees, dispatch }}>{children}</EmployeeContext.Provider>
}

/**
 * Allow us to use useEmployeeState() instead of useContext(EmployeeContext) for better clarity
 */
export const useEmployeeState = () => {
  const context = useContext(EmployeeContext)
  if (!context) {
    throw new Error('useEmployeeState must be used within a EmployeeContext')
  }
  return context
}
