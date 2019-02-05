import React from "react";
import CreateRoom from "./CreateRoom.jsx";
import "./header.scss";

export default function Header(props) {
  return (
    <div className="header-container">
      <p className="header-title">&lt;Socket Chat/&gt;</p>
      <div className="buttonWrapper">
        <CreateRoom makeRoom={props.makeRoom} />
        <button className="showRoom-btn" onClick={e => props.roomToggle(e)}>
          Show Rooms
        </button>
      </div>
    </div>
  );
}
