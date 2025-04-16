import React from 'react'

const Total = ({parts}) => {
  return (
    <p>Number of exercises {parts.reduce((total, p)=> p.exercises + total, 0)}</p>

  )
}

export default Total