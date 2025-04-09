// src/components/MessageArea.jsx
import React from "react";

function MessageArea({ message }) {
  if (!message) return null;

  return (
    <div id="message-div" className="message-div">
      <p className="warning-message">{message}</p>
    </div>
  );
}

export default MessageArea;
