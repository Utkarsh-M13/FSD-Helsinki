import React from 'react'

const Total = ({parts}) => {
  return (
    <b>Number of exercises {parts.reduce((total, p)=> p.exercises + total, 0)}</b>

  )
}

export default Total