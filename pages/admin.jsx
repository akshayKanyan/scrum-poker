import React, { useContext, useEffect } from "react";
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

  const { socket } = useContext(SocketContext);
  const { roomName, setRoomName } = useContext(RoomNameContext);

  useEffect(() => {
    //join room
    socket.on("room-joined", (data) => {
      router.push("/adminDashboard");
    });
  }, []);

  const createRoom = () => {
    socket.emit("create-room", { roomName: roomName });
  };

  const onKeypress = (e) => {
    if (e.key === "Enter" && roomName.trim().length) {
      createRoom();
    }
  };
  const onRoomNameChange = (e) => {
    setRoomName(e.target.value);
  };

  return (
    <Wrapper align="center" col>
      <Wrapper noFlex pt={30}>
        <H1>ADMIN</H1>
      </Wrapper>
      <Wrapper noFlex pt={30}>
        <TextField
          value={roomName}
          onKeyPress={onKeypress}
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
