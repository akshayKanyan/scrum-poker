import React, { useState, useContext, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Wrapper } from "../components/templates/wrapper";
import { SocketContext } from "./_app";
import { v4 as uuidv4 } from "uuid";
import Link from "next/link";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

import { AdminStyle } from "../theme/adminStyle.js";

const useStyles = makeStyles(AdminStyle);

export default function Admin() {
  const classes = useStyles();
  const [roomName, setRoomName] = useState("");
  const { socket } = useContext(SocketContext);

  const setUserName = (e) => {
    setName(e.target.value);
  };
  const loginUser = () => {
    console.log("sssxxxxxxx");
    socket.emit("login", "akshay");
  };

  useEffect(() => {
    // subscribe a new user
    // socket.emit("login", { id: uuidv4() , });
    // list of connected users
    socket.on("users", (data) => {
      console.log("ssssss", data);
      // setUser({ usersList: JSON.parse(data) });
    });
    // we get the messages
    socket.on("getMsg", (data) => {
      let listMessages = recMsg.listMsg;
      listMessages.push(JSON.parse(data));
      setRecMsg({ listMsg: listMessages });
    });
  }, []);

  const onRoomNameChange = (e) => {
    setRoomName(e.target.value);
  };

  const createRoom = () => {

  };
  const onKeypress = (e) => {
    if(e.key === 13){
        alert("sssss")
    }
  };    

  return (
    <Wrapper align="center" col>
      <Wrapper noFlex pt={30}>
        <TextField
          value={roomName}
          onKeypress={onKeypress}
          onChange={onRoomNameChange}
          className={classes.textField}
          id="room-name"
          label="Room Name"
        />
      </Wrapper>
      <Wrapper noFlex>
        <Button
          disabled={!roomName.trim().length}
          onClick={createRoom}
          className={classes.Button}
          variant="outlined"
          color="secondary"
        >
          Create
        </Button>
      </Wrapper>
    </Wrapper>
  );
}
