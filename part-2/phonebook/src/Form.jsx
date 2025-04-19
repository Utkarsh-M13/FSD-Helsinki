import React from 'react'



const Form = ({newName, setNewName, newNumber, setNewNumber, persons, setPersons}) => {
  const addName = (event) => {
    event.preventDefault();
    if (!persons.find((p) => p.name === newName)) {
      setPersons(persons.concat({name:newName, number:newNumber}))
    } else {
      window.alert(`${newName} is already a name in the phonebook.`)
    }
    setNewName('')
    setNewNumber('')
  }
  return (
   <>
    <h3>Add New Contact</h3>
    <form>
      <div>
        name: <input value={newName} onChange={(event) => {{setNewName(event.target.value)}}}/>
      </div>
      <div>
        number: <input type='number' value={newNumber} onChange={(event) => {{setNewNumber(event.target.value)}}}/>
      </div>
      <div>
        <button type="submit" onClick={addName}>add</button>
      </div>
    </form>
   </>
  )
}

export default Form