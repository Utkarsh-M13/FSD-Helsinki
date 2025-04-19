import { useEffect, useState } from 'react'
import Search from './Search'
import Form from './Form'
import Contacts from './Contacts'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')

  useEffect(() => {
    axios.get("http://localhost:3001/persons")
    .then((response) => setPersons(response.data))
  }, [])


  const filteredPersons = persons.filter((person) => person.name.toLowerCase().includes(search.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Search search={search} setSearch={setSearch}></Search>
      <Form newName={newName} setNewName={setNewName} newNumber={newNumber} setNewNumber={setNewNumber} persons={persons} setPersons={setPersons}></Form>
      
      <h2>Numbers</h2>
      <Contacts contacts={filteredPersons}></Contacts>
    </div>
  )
}

export default App