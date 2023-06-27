import React from 'react'
import PropTypes from 'prop-types'
import './ModalForm.scss'
import FocusLock from 'react-focus-lock'

/**
 * @param {func} toggleModal
 * @param {string} messageModal
 * @returns {JSX.Element}
 */
export default function ModalForm({ toggleModal, messageModal }) {
  return (
    <div className="background-modal" onClick={toggleModal}>
      <FocusLock>
        <div className="modal">
          <button className="close-modal" onClick={toggleModal} autoFocus>
            X
          </button>
          <p className="message">{messageModal}</p>
        </div>
      </FocusLock>
    </div>
  )
}

ModalForm.propTypes = {
  toggleModal: PropTypes.func.isRequired,
  messageModal: PropTypes.string.isRequired,
}
