import React from 'react'
import PropTypes from 'prop-types'

/**
 *
 * @param {string} text
 * @param {string} type
 * @param {string} id
 * @param {string} name
 * @param {string} autoComplete
 * @param {string} name
 * @param {func} onClick
 * @returns
 */
export default function InputForm({ text, type, id, name, autoComplete, onClick }) {
  return (
    <div className="input-wrapper">
      <label htmlFor={id}>{text}</label>
      <input type={type} id={id} name={name ? name : id} autoComplete={autoComplete} onClick={onClick} />
    </div>
  )
}

InputForm.propTypes = {
  text: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string,
  autoComplete: PropTypes.string.isRequired,
  onClick: PropTypes.func,
}
