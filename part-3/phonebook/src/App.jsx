import { useEffect, useState } from "react";
import Search from "./Search";
import Form from "./Form";
import Contacts from "./Contacts";
import { deleteContact, getContacts } from "./services/phonebook";
import Notification from "./Notification";
import "./styles.css";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState({ message: null, error: false });

  useEffect(() => {
    getContacts().then((contacts) => setPersons(contacts));
  }, []);

  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = (id) => {
    const person = persons.find((person) => person.id === id);
    if (window.confirm(`Are you sure you want to delete ${person.name}`)) {
      deleteContact(id).then(() => {
        console.log("Deleted:", person);
      });
      setPersons(persons.filter((p) => p.id !== id));
    }
  };

  return (
    <div className="main">
      <div>
        <h2>Phonebook</h2>
        <Notification
          message={message.message}
          error={message.error}
        ></Notification>
        <Search search={search} setSearch={setSearch}></Search>
        <Form
          newName={newName}
          setNewName={setNewName}
          newNumber={newNumber}
          setNewNumber={setNewNumber}
          persons={persons}
          setPersons={setPersons}
          setMessage={setMessage}
        ></Form>
      </div>
      <div>
        <h2>Numbers</h2>
        <Contacts
          contacts={filteredPersons}
          handleDelete={handleDelete}
        ></Contacts>
      </div>
    </div>
  );
};

export default App;
