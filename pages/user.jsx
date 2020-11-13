import React, { useState, useContext, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Wrapper } from "../components/templates/wrapper";
import { H1 } from "../components/typography";
import { SocketContext, RoomNameContext } from "./_app";
import { useRouter } from "next/router";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

import { AdminStyle } from "../theme/adminStyle.js";

const useStyles = makeStyles(AdminStyle);

export default function Admin() {
  const classes = useStyles();
  const router = useRouter();
  const [error, setError] = useState("");

  const { socket } = useContext(SocketContext);
  const { userName, setUserName, roomName, setRoomName } = useContext(
    RoomNameContext
  );

  useEffect(() => {
    //join room
    socket.on("user-room-joined", (data) => {
      router.push("/userDashboard");
    });
    socket.on("no-room-found", (data) => {
      setError(data);
    });
  }, []);

  const joinRoom = () => {
    socket.emit("login", { roomName, userName });
  };

  const onKeypress = (e) => {
    if (e.key === "Enter" && userName.trim().length) {
      joinRoom();
    }
  };
  const onRoomNameChange = (e) => {
    setRoomName(e.target.value);
  };

  const onUserNameChange = (e) => {
    setUserName(e.target.value);
  };

  return (
    <Wrapper align="center" col>
      <Wrapper noFlex pt={30}>
        <H1>USER</H1>
      </Wrapper>
      <Wrapper col noFlex pt={30}>
        <TextField
          value={roomName}
          onChange={onRoomNameChange}
          className={classes.textField}
          id="room-name"
          label="Room Name"
        />
        <TextField
          value={userName}
          onKeyPress={onKeypress}
          onChange={onUserNameChange}
          className={classes.textField}
          id="user-name"
          label="User Name"
        />
      </Wrapper>
      <Wrapper noFlex>
        <Button
          disabled={!roomName.trim().length || !userName.trim().length}
          onClick={joinRoom}
          className={classes.Button}
          variant="outlined"
          color="secondary"
        >
          Create
        </Button>
      </Wrapper>
      {error && <span>{error}</span>}
    </Wrapper>
  );
}
