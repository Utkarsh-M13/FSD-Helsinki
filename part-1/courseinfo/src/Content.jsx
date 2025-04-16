import React from 'react'
import Part from './Part'

const Content = ({part1, part2, part3, exercises1, exercises2, exercises3}) => {
  return (
    <>
    <Part exercises={exercises1} name={part1}></Part>
    <Part exercises={exercises2} name={part2}></Part>
    <Part exercises={exercises3} name={part3}></Part>
    </>
  )
}

export default Content