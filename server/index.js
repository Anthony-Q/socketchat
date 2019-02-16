import express from "express";
import parser from "body-parser";
import path from "path";
import pool from "../db/index.js";
import React from "react";
import router from "./router";
const app = express();

app.use(parser.json());
app.use(parser.urlencoded({ extended: false }));
app.use("/", router);

app.use(express.static(__dirname + "/../build"));

const Server = require("http").Server(app);

Server.listen(8080, () => console.log("<=====LISTENING ON PORT 8080====>"));

const io = require("socket.io")(Server);
io.on("connection", socket => {
  console.log("<===A USER CONNECTED===>", socket.id);
  socket.join("Lobby");

  socket.on("click", (room, data) => {
    //would only submit data to the socket in the previously stated room
    console.log("ROOM", room);
    console.log("message:", data);
    // console.log("POOL", pool);
    console.log("pool.client", pool.query("select * from clients"));

    pool.query(`INSERT INTO MESSAGES(message_id, username, message, room, date_sent) 
      VALUES(default, '${data.username}', '${
      data.message
    }', '${room}', default);`);
    socket.to(room).emit("broadcast", room, data, socket.id);

    socket.on("dmMessage", (id, data) => {
      console.log("dm data =>", data);
      io.to(id).emit("privateBroadcast", data);
    });
  });

  //doesnt exist yet
  socket.on("roomClick", (room, password) => {
    //on room create that socket instance would connect ot the room
    console.log("ROOM", room);
    if (password) {
      socket.emit("pwCheck", data);
    }
    pool.query(`INSERT INTO ROOMS(rooms_id, room)
      VALUES (default, '${room}');`);
    socket.join(room); //https://socket.io/docs/server-api/#socket-handshake
  });

  socket.on("typing", socket => {
    console.log("a user is typing");
  });

  socket.on("sendMessage", message => {
    io.emit("receivedMessage", message);
    console.log("message was emitted");
  });

  socket.on("disconnect", () => {
    console.log("===>A USER DISCONNECTED<===");
  });
});

// module.exports = Server;
