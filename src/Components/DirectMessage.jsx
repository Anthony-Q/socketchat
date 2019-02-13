import React from "react";
import messages from "./Messages/Messages.jsx";


export default function DirectMessage(props) {
  return (
    <div>
      <div className="messageBox">DM's Go Here!</div>
      {props.directMessageLog.map((message, index) => {
        <Messages
          message={message.message}
          key={index}
          username={message.username}
          client={props.client}
        />;
      })}
    </div>
  );
}
