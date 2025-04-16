import React from 'react'

const StatLine = ({text, value}) => {
  return  (
  <tr>
    <th scope="row">{text}</th>
    <td>{value}</td>
  </tr>
)

}

const Statistics = ({good, bad, neutral}) => {
  const total = good + bad + neutral;
  const average = (good - bad) /total;
  const percent = good/total * 100

  if (total != 0) return (
    <>
    <table>
      <tbody>
      <StatLine text="Good Reviews " value={good}></StatLine>
      <StatLine text="Bad Reviews " value={bad}></StatLine>
      <StatLine text="Neutral Reviews " value={neutral}></StatLine>
      <StatLine text="Total Reviews " value={total}></StatLine>
      <StatLine text="Average Reviews " value={average}></StatLine>
      <StatLine text="Good Percentage " value={percent}></StatLine>
      </tbody>
    </table>
    
    </>
  )
  return <div>No Feedback Given</div>
}

export default Statistics