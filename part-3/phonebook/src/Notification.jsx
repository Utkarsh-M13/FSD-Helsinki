import React from "react";
import "./styles.css";

const Notification = ({ message, error }) => {
  if (message && error) return <h3 className="error">{message}</h3>;
  if (message) return <h3 className="addMessage">{message}</h3>;
  return;
};

export default Notification;
