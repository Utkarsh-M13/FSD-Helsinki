import React from "react";
import { addContact, replaceNumber } from "./services/phonebook";

const Form = ({
  newName,
  setNewName,
  newNumber,
  setNewNumber,
  persons,
  setPersons,
}) => {
  const addName = (event) => {
    event.preventDefault();
    if (!persons.find((p) => p.name === newName)) {
      const newPerson = { name: newName, number: newNumber };
      addContact(newPerson).then((person) => {
        setPersons(persons.concat(person));
      });
    } else if (
      window.confirm(
        `${newName} is already a name in the phonebook, replace their number?`
      )
    ) {
      const newPerson = {
        ...persons.find((p) => p.name === newName),
        number: newNumber,
      };
      replaceNumber(newPerson).then((p) => {
        setPersons(persons.map((pers) => (p.id === pers.id ? p : pers)));
      });
    }
    setNewName("");
    setNewNumber("");
  };

  return (
    <>
      <h3>Add New Contact</h3>
      <form>
        <div>
          name:{" "}
          <input
            value={newName}
            onChange={(event) => {
              {
                setNewName(event.target.value);
              }
            }}
          />
        </div>
        <div>
          number:{" "}
          <input
            type="number"
            value={newNumber}
            onChange={(event) => {
              {
                setNewNumber(event.target.value);
              }
            }}
          />
        </div>
        <div>
          <button type="submit" onClick={addName}>
            add
          </button>
        </div>
      </form>
    </>
  );
};

export default Form;
