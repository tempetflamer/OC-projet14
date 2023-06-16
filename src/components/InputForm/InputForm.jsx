import React from 'react'
import PropTypes from 'prop-types'

/**
 *
 * @param {string} text
 * @param {string} type
 * @param {string} name
 * @param {string} autoComplete
 * @param {string} required
 * @returns
 */
export default function InputForm({ text, type, name, autoComplete, required }) {
  return (
    <div className="input-wrapper">
      <label htmlFor={name}>{text}</label>
      <input type={type} id={name} name={name} autoComplete={autoComplete} />
    </div>
  )
}

InputForm.propTypes = {}
