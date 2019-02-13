import React from "react";
 require('./Rooms.scss') 

export default function Rooms(props) {
  return (
    <div className="roomWrapper">
      <div className="roomBox">
        Available Rooms
        {props.rooms.map((room, index) => {
          return (
            <h3
              className="roomList"
              onClick={e => props.roomClick(e)}
              key={index}
            >
              {room}
            </h3>
          );
        })}
      </div>
    </div>
  );
}
