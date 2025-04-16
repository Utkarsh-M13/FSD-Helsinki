import { useState } from 'react'
import Statistics from './Statistics'

const Button = ({text, onClick}) => {
    return <button onClick={onClick}>{text}</button>
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleClick = (setState) => {
    setState((prev) => prev +1);
  }

  return (
    <>
    <h1>Give Feedback</h1>
    <Button onClick={() => handleClick(setGood)} text="Good"></Button>
    <Button onClick={() => handleClick(setNeutral)} text="Neutral"></Button>
    <Button onClick={() => handleClick(setBad)}text="Bad"></Button>
    <Statistics good={good} bad={bad} neutral={neutral}></Statistics>
    </>
  )
}

export default App