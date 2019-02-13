import React, { Component } from "react";
import { render, hydrate } from "react-dom";
import App from "./Components/App.jsx";

console.log(location.pathname)
hydrate(<App pathname={location.pathname}/>, document.getElementById("root"));
