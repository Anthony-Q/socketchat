import React from "react";

export default function Login(props) {
  return (
    <div className="loginContainer">
      <div className="userName">Username</div> <input />
      <div className="insertData2">Password</div> <input />
      <button className="authenticateSubmit">Submit</button>
    </div>
  );
}
