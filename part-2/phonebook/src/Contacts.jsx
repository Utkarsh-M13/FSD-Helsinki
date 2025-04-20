import React from "react";

const Contacts = ({ contacts, handleDelete }) => {
  return (
    <ul>
      {contacts.map((person) => (
        <div key={person.id}>
          <li>
            {person.name}: {person.number}
          </li>
          <button onClick={() => handleDelete(person.id)}>Delete</button>
        </div>
      ))}
    </ul>
  );
};

export default Contacts;
