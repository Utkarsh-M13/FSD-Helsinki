import { useState } from 'react'
import Search from './Search'
import Form from './Form'
import Contacts from './Contacts'

const users = [
  { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
]

const App = () => {
  const [persons, setPersons] = useState(users) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')


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