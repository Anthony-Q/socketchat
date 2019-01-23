import React, { Component } from "react";
import "../index.scss";
import io from "socket.io-client";
import newMessageView from "./methods/handleNewMessage.js";
import Form from "./Form.jsx";
import Rooms from "./rooms/Rooms.jsx";
import CreateRoom from "./CreateRoom.jsx";
import DirectMessage from "./DirectMessage.jsx";
import Portal from "./Portal.jsx";
import handleSubmit from "./methods/handleSubmit.js";
import makeRoom from "./methods/makeRoom.js";
import roomClick from "./methods/roomClick.js";
import MessageEntryList from "./Messages/MessageEntryList.jsx";
import ChatWindow from "./ChatWindow.jsx";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      roomView: false,
      text: "",
      chatLog: [],
      directMessageLog: [],
      username: null,
      rooms: [
        "Lobby",
        "Arena",
        "Anthony's Corner",
        "Phamily Kitchen",
        "Sports"
      ],
      room: "Lobby",
      directMessage: false,
      socketNum: null
    };
    // this.messagesEnd = React.createRef();
    this.roomClick = roomClick.bind(this);
    this.makeRoom = makeRoom.bind(this);
    this.handleSubmit = handleSubmit.bind(this);
    // this.scrollToBottom = this.scrollToBottom.bind(this);
    this.socket = io("localhost:8080");

    //General chat log
    this.socket.on("broadcast", (room, message, id) => {
      this.setState(
        prevState => {
          let newState = prevState.chatLog;
          message.id = id;
          newState.push(message);
          console.log("ID", id);
          return { chatLog: newState };
        },
        () => newMessageView("left")
      );
    });

    //DM's
    this.socket.on("privateBroadcast", data => {
      this.setState(prevState => {
        let newDirectMessageLog = prevState.directMessageLog;
        newDirectMessageLog.push(data);
        console.log("DML", newDirectMessageLog);
        return { directMessageLog: newDirectMessageLog };
      });
    });
  }

  // scrollToBottom = () => {
  //   window.scrollBy(0, 100);
  // };

  // componentDidUpdate() {
  //   this.scrollToBottom();
  // }

  componentDidMount() {
    let promptVal = prompt("what is your name");
    this.setState(prevState => {
      return { username: promptVal };
    });
  }

  scrollIntoView = () => {
    const newestMessage = document.querySelector(".messages");
    console.log(newestMessage[newestMessage.length - 1]);
  };

  roomToggle = () => {
    this.setState(prevState => {
      return { roomView: !prevState.roomView };
    });
  };
  messageUser = id => {
    // this.socket.emit("dmMessage", `${id}`);
    this.setState(
      prevState => {
        return { directMessage: true, socketNum: id };
      },
      () => console.log("direct message status:", this.state.directMessage)
    );
  };

  handleChange = e => {
    this.socket.emit("typing");
    this.setState({ text: e.target.value });
  };

  render() {
    const roomPortal = this.state.roomView ? (
      <Portal portal="roomPortal">
        <Rooms rooms={this.state.rooms} roomClick={this.roomClick} />
      </Portal>
    ) : (
      <button onClick={this.roomToggle}>Show Rooms</button>
    );

    const dmView = this.state.directMessage ? (
      <Portal portal="chatPortal">
        <ChatWindow directMessageLog={this.state.directMessageLog} />
      </Portal>
    ) : (
      <div />
    );
    return this.state.username === null ? (
      <div />
    ) : (
      <div>
        {roomPortal}
        {/* <div ref={this.messagesEnd}> */}
        <MessageEntryList
          private={true}
          username={this.state.username}
          chatLog={this.state.chatLog}
          client={this.state.username}
          privateMessage={this.messageUser}
          currRoom={this.state.room}
        />
        {/* </div> */}
        <CreateRoom makeRoom={this.makeRoom} />
        {dmView}
        <Form
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          text={this.state.text}
        />
      </div>
    );
  }
}
