import React, { useState, useRef, useMemo, useCallback } from 'react'
import PropTypes from 'prop-types'
import { states, departments } from '../../data/data.js'
import './FormCreateEmployee.scss'
//import { addEmployee, getEmployees } from '../../redux/reducer.js'
import * as actions from '../../redux/reducer.js'

import { useDispatch } from 'react-redux'

export default function FormCreateEmployee() {
  const [errorMessage, setErrorMessage] = useState('')
  const [selectedDepartment, setSelectedDepartment] = useState('')
  const [modalIsDisplayed, setModalIsDisplayed] = useState(false)
  const [messageModal, setMessageModal] = useState('')

  const birthdateRef = useRef()
  const errorMessageRef = useRef()
  const dispatch = useDispatch()

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

  // theroiquement il faudrait aussi rajouter , [initDate] à initBirthday et vérifier si la date du jour à chnagé pour initDate

  //j'ai mis le checkbirthday mais techniquement si je met une date plus haute,
  //j'ai une erreur qui apparait : la date ou l'heure doit être égale  ou antérieur à dateMin (ex:16/06/2023)
  const checkBirthdate = (inputDate) => {
    let isValid = false
    const { month, day, yearMin, yearMax } = initDate()

    // Input form
    const inputDay = inputDate.slice(-2)
    const inputMonth = inputDate.slice(5, -3)
    const inputYear = inputDate.slice(0, -6)

    console.log('inputrs day, month, year', inputDay, inputMonth, inputYear)

    // Age requirement
    if (
      inputYear > yearMin - 1 &&
      inputYear < yearMax + 1 &&
      inputMonth > 0 &&
      inputMonth < 13 &&
      inputDay > 0 &&
      inputDay < new Date(inputYear, inputMonth, 0).getDate() + 1
    ) {
      if (inputYear > yearMin && inputYear < yearMax) {
        isValid = true
      } else if ((inputYear == yearMin && inputMonth > month) || (inputYear == yearMax && inputMonth < month)) {
        isValid = true
      } else if (
        (inputYear == yearMin && inputMonth == month && inputDay > day - 1) ||
        (inputYear == yearMax && inputMonth == month && inputDay < day + 1)
      ) {
        isValid = true
      }
    }
    return isValid
  }

  function toggleModal() {
    setModalIsDisplayed(!modalIsDisplayed)
  }

  function closeModal() {
    setModalIsDisplayed(false)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log('e creation', e, e.target.firstname, 'state', e.target.state)
    //console.log('all refs', firstNameref, departmentRef, codeZipRef, firstNameref.current.value)
    //if (e.firstname)
    const firstName = e.target.firstname.value.trim(),
      lastName = e.target.lastname.value.trim(),
      dateOfBirth = e.target.birthdate.value,
      startDate = e.target.startDate.value,
      department = e.target.department.value,
      street = e.target.street.value.trim(),
      city = e.target.city.value.trim(),
      state = e.target.state.value,
      zipCode = e.target.code.value.trim()

    console.log(typeof zipCode, zipCode.match(/^\d{5}$/gm) ? 'ok' : 'foiré')
    ///^\d{5}$/gm
    //   if (!value.match(/[a-zA-Z0-9]+@[a-zA-Z]+\.[a-zA-Z]{2,9}/mg)) {
    //     container.classList.add("error");
    //     errorDisplay.textContent = "Veuillez entrer une adresse mail valide.";
    // } else {
    //     errorDisplay.textContent = "";
    //     isValid = true;
    // }

    const birthdateIsValid = checkBirthdate(dateOfBirth)

    if (
      // firstName,
      // lastName !== '' &&
      firstName !== '' &&
      lastName !== '' &&
      dateOfBirth !== '' &&
      startDate !== '' &&
      street !== '' &&
      city !== '' &&
      zipCode !== '' &&
      //Number.isInteger(zipCode) &&
      zipCode.match(/^\d{5}$/gm) &&
      birthdateIsValid
    ) {
      const employee = {
        firstName: firstName,
        lastName: lastName,
        dateOfBirth: dateOfBirth,
        startDate: startDate,
        department: department,
        street: street,
        city: city,
        state: state,
        zipCode: zipCode,
      }
      //dispatch(addEmployee(employee))
      try {
        dispatch(actions.addEmployee(employee))
        setMessageModal('Employee Created!')
        toggleModal()
      } catch (e) {
        setMessageModal('Error, unable to create employee!')
        toggleModal()
      }
    }
  }

  function handleChangeDepartment(e) {
    setSelectedDepartment(e.target.value)
  }

  return (
    <form onSubmit={handleSubmit} className="form-new-employee">
      <div className="input-wrapper">
        <label htmlFor="firstname">First Name</label>
        <input type="text" id="firstname" name="firstname" autoComplete="on" />
      </div>
      <div className="input-wrapper">
        <label htmlFor="lastname">Last Name</label>
        <input type="text" id="lastname" name="lastname" autoComplete="on" />
      </div>
      <div className="input-wrapper">
        <label htmlFor="birthdate">Date of Birth</label>
        <input type="date" id="birthdate" name="birthdate" autoComplete="off" aria-required="true" ref={birthdateRef} onClick={initBirthdate} />
      </div>
      <div className="input-wrapper">
        <label htmlFor="start-date">Start Date</label>
        <input type="date" id="start-date" name="startDate" autoComplete="off" aria-required="true" />
      </div>
      <fieldset className="address--container">
        <legend className="address--legend">Address</legend>
        <div className="input-wrapper">
          <label htmlFor="street">Street</label>
          <input type="text" id="street" name="street" autoComplete="on" />
        </div>
        <div className="input-wrapper">
          <label htmlFor="city">City</label>
          <input type="text" id="city" name="city" autoComplete="on" />
        </div>
        <div className="input-wrapper">
          <label htmlFor="state">State</label>
          <select className="state" id="state" name="state" /* ref={stateRef} */>
            {states.map((val) => (
              <option value={val.abbreviation} key={val.abbreviation}>
                {val.name}
              </option>
            ))}
          </select>
        </div>
        <div className="input-wrapper">
          <label htmlFor="code">Zip code</label>
          <input type="number" id="code" name="code" minLength="5" maxLength="5" autoComplete="on" />
          {/* normally zip code is a type="number" */}
        </div>
      </fieldset>

      <div className="input-wrapper">
        <label htmlFor="department">Department</label>
        <select
          className="department"
          id="department"
          name="department"
          onChange={handleChangeDepartment}
          value={selectedDepartment}
          /* ref={departmentRef} */
        >
          {departments.map((val) => (
            <option value={val.name} key={val.name}>
              {val.name}
            </option>
          ))}
        </select>
      </div>
      <span className="error-message" ref={errorMessageRef}>
        {errorMessage}
      </span>
      <button className="btn btn-save" type="submit">
        Save
      </button>

      {!modalIsDisplayed ? (
        ''
      ) : (
        <div className="background-modal" onClick={toggleModal}>
          <div className="modal">
            <button className="close-modal" onClick={toggleModal} autoFocus>
              X
            </button>
            <p className="message">{messageModal}</p>
          </div>
        </div>
      )}
    </form>
  )
}
