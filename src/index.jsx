import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { EmployeeContextProvider } from './utils/EmployeeContext'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <EmployeeContextProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </EmployeeContextProvider>
)
