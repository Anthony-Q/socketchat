import { Router } from "express";
import React from "react";
import { renderToString, renderToStaticMarkup } from "react-dom/server";
import "ignore-styles";
// Register(['sass','.scss'])
import Login from "../src/Components/Login.jsx";
import Home from "../src/Components/Home.jsx";
import template from "./template.js";
import Form from "../src/Components/Form.jsx";

const router = Router();

router.route("/", (req, res) => {
  const content = renderToString(<Home />);
  const html = template(content, "socketchatSSR");
  console.log("content 1", content);
  res.send(html);
});

router.use("/login", (req, res) => {
  const content = renderToString(<Login />);
  const html = template(content, "formCheck");
  console.log("content LOGIN", content);
  res.send(content); //was content before
});
export default router;
