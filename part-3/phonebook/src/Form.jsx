import React from "react";
import { addContact, replaceNumber } from "./services/phonebook";

const Form = ({
  newName,
  setNewName,
  newNumber,
  setNewNumber,
  persons,
  setPersons,
  setMessage,
}) => {
  const addName = (event) => {
    event.preventDefault();
    if (!persons.find((p) => p.name === newName)) {
      const newPerson = { name: newName, number: newNumber };
      addContact(newPerson).then((person) => {
        setPersons(persons.concat(person));
      });

      setMessage({
        message: `Added ${newPerson.name} to the phonebook`,
        error: false,
      });
      setTimeout(() => {
        setMessage((prev) => {
          return { ...prev, message: null };
        });
      }, 6000);
    } else if (
      window.confirm(
        `${newName} is already a name in the phonebook, replace their number?`
      )
    ) {
      const newPerson = {
        ...persons.find((p) => p.name === newName),
        number: newNumber,
      };
      replaceNumber(newPerson)
        .then((p) => {
          setPersons(persons.map((pers) => (p.id === pers.id ? p : pers)));
        })
        .catch((error) => {
          setMessage({
            message: `${newPerson.name} has recently been deleted and could not be found`,
            error: true,
          });
          console.log("error", error);
          setPersons(persons.filter((p) => p.id !== newPerson.id));
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
          <div className="label"> Name: </div>
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
          <div className="label">Number:</div>
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
          <button type="submit" className="add" onClick={addName}>
            Add
          </button>
        </div>
      </form>
    </>
  );
};

export default Form;
