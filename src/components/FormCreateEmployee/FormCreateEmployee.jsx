import React, { useCallback, useRef, useState } from 'react'
import { departments, states } from '../../data/data.js'
import './FormCreateEmployee.scss'
import { useEmployeeState } from '../../utils/EmployeeContext.jsx'
import InputForm from '../InputForm/InputForm'
import { Dropdown } from 'custom_dropdown_comp'
import ModalForm from '../ModalForm/ModalForm'

export default function FormCreateEmployee() {
  const [errorMessage, setErrorMessage] = useState('')
  const [modalIsDisplayed, setModalIsDisplayed] = useState(false)
  const [messageModal, setMessageModal] = useState('')

  const errorMessageRef = useRef()
  const { addEmployee } = useEmployeeState()

  const initDate = useCallback(() => {
    const date = new Date()
    const year = date.getFullYear()
    const month = ('0' + (date.getMonth() + 1)).slice(-2)
    const day = ('0' + date.getDate()).slice(-2)
    const yearMin = year - 80
    const yearMax = year - 16
    return { month, day, yearMin, yearMax }
  })

  const initBirthdate = useCallback((e) => {
    const { month, day, yearMin, yearMax } = initDate()
    e.target.min = yearMin + '-' + month + '-' + day
    e.target.max = yearMax + '-' + month + '-' + day
  })

  function toggleModal() {
    setModalIsDisplayed(!modalIsDisplayed)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const firstName = e.target.firstname.value.trim(),
      lastName = e.target.lastname.value.trim(),
      dateOfBirth = e.target.birthdate.value,
      startDate = e.target.startDate.value,
      department = e.target.department.value,
      street = e.target.street.value.trim(),
      city = e.target.city.value.trim(),
      state = e.target.state.value,
      zipCode = e.target.zipCode.value.trim()

    if (
      firstName !== '' &&
      lastName !== '' &&
      dateOfBirth !== '' &&
      startDate !== '' &&
      street !== '' &&
      city !== '' &&
      zipCode !== '' &&
      zipCode.match(/^\d{5}$/gm)
    ) {
      setErrorMessage('')
      try {
        addEmployee({
          firstName: firstName,
          lastName: lastName,
          dateOfBirth: dateOfBirth,
          startDate: startDate,
          department: department,
          street: street,
          city: city,
          state: state,
          zipCode: zipCode,
        })
        setMessageModal('Employee Created!')
        toggleModal()
      } catch (e) {
        setMessageModal('Error, unable to create employee!')
        toggleModal()
      }
    } else {
      setErrorMessage('At least one of the above fields is not filled properly')
    }
  }

  if (!states && !departments) {
    return ''
  }
  return (
    <form onSubmit={handleSubmit} className="form-new-employee">
      <InputForm text="First Name" type="text" id="firstname" autoComplete="on" />
      <InputForm text="Last Name" type="text" id="lastname" autoComplete="on" />
      <InputForm text="Date of Birth" type="date" id="birthdate" autoComplete="off" onClick={initBirthdate} />
      <InputForm text="Start Date" type="date" id="start-date" name="startDate" autoComplete="off" />
      <fieldset className="address--container">
        <legend className="address--legend">Address</legend>
        <InputForm text="Street" type="text" id="street" autoComplete="on" />
        <InputForm text="City" type="text" id="city" autoComplete="on" />
        <Dropdown textLabel="State" name="state" data={states} />
        <InputForm text="Zip code" type="number" id="zip-code" name="zipCode" autoComplete="on" />
      </fieldset>
      <Dropdown textLabel="Department" name="department" data={departments} />
      <span className="error-message" ref={errorMessageRef}>
        {errorMessage}
      </span>
      <button className="btn btn-save" type="submit">
        Save
      </button>

      {!modalIsDisplayed ? '' : <ModalForm toggleModal={toggleModal} messageModal={messageModal} />}
    </form>
  )
}
