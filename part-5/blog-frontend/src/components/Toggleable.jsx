import PropTypes from 'prop-types'
import React, { useState } from 'react'

const Toggleable = ({ children, toggleActionName }) => {
  const [visible, setVisibile] = useState()
  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisibile(oldVisible => !oldVisible)
  }

  Toggleable.propTypes = {
    buttonLabel: PropTypes.string.isRequired
  }
  return (
    <>
      <div style={hideWhenVisible}><button onClick={toggleVisibility}>{toggleActionName}</button></div>
      <div style={showWhenVisible}>{children}
        <button onClick={toggleVisibility}>Cancel</button>
      </div>
    </>
  )
}

export default Toggleable