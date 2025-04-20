import axios from "axios";

const baseURL = "http://localhost:3001/persons";

const getContacts = () => {
  return axios.get(baseURL).then((response) => response.data);
};

const addContact = (contact) => {
  return axios.post(baseURL, contact).then((response) => response.data);
};

const deleteContact = (id) => {
  const URL = `${baseURL}/${id}`;
  return axios.delete(URL).then((response) => response.data);
};

const replaceNumber = (contact) => {
  const URL = `${baseURL}/${contact.id}`;
  return axios.put(URL, contact).then((response) => response.data);
};

export { getContacts, addContact, deleteContact, replaceNumber };
