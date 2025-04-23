import React from "react";
import X from "./assets/x.svg?react";

const Contacts = ({ contacts, handleDelete }) => {
  return (
    <div>
      {contacts.map((person) => (
        <div key={person.id}>
          <div className="person">
            <button className="x" onClick={() => handleDelete(person.id)}>
              <X fill="white"></X>
            </button>
            {person.name}: {person.number}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Contacts;
