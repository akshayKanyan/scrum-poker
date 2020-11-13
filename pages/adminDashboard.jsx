import React, { useState, useContext, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Wrapper } from "../components/templates/wrapper";
import { H2 } from "../components/typography";
import { SocketContext, RoomNameContext } from "./_app";
import { useRouter } from "next/router";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";

import { AdminDashboardStyle } from "../theme/adminDashboardStyle.js";

const useStyles = makeStyles(AdminDashboardStyle);

export default function AdminDashboard() {
  const classes = useStyles();
  const router = useRouter();
  const [users, setUsers] = useState([]);
  const [story, setStory] = useState("");

  const { socket } = useContext(SocketContext);
  const { roomName, setRoomName } = useContext(RoomNameContext);

  useEffect(() => {
    if (!roomName.trim()) {
      router.push("/admin");
    } else {
      //when new user is added
      socket.on("users", (data = {}) => {
        setUsers([...Object.keys(data)]);
      });
      //when admin refresh the page it gets the users data if avalilable
      socket.emit("get-users", { roomName });
    }
  }, []);

  const handleStoryChange = (e) => {
    setStory(e.target.value);
  };
  const addStory = (e) => {
    socket.emit("set-story", {story, roomName});
  };

  return (
    <Wrapper justify="space-between" margin="0px 0px 0px 30px">
      <Wrapper col>
        <Wrapper noFlex pt={30}>
          <Tooltip
            title="share this room name with the team"
            placement="bottom"
          >
            <H2 cursor="pointer">
              ROOM NAME: <span className={classes.roomName}>{roomName}</span>
            </H2>
          </Tooltip>
        </Wrapper>
        <Wrapper pt={30}>
          <TextField
            id="standard-multiline-flexible"
            label="Story"
            multiline
            rowsMax={7}
            value={story}
            onChange={handleStoryChange}
          />
          <Button
            disabled={!story.trim().length}
            onClick={addStory}
            className={classes.Button}
            variant="outlined"
            color="secondary"
          >
            Create
          </Button>
        </Wrapper>
      </Wrapper>
      <Wrapper noFlex>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell classes={{ root: classes.tableCell }}>
                  Members {users.length}
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((row) => (
                <TableRow key={row}>
                  <TableCell component="th" scope="row">
                    {row}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Wrapper>
    </Wrapper>
  );
}
