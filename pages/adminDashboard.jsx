import React, { useState, useContext, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Wrapper } from "../components/templates/wrapper";
import { H2, P2 } from "../components/typography";
import { SocketContext, RoomNameContext } from "./_app";
import { useRouter } from "next/router";
import DoneIcon from "@material-ui/icons/Done";
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
  const [storyStep, setStoryStep] = useState(0);
  const [userResponses, setUserResponses] = useState({});

  const { socket } = useContext(SocketContext);
  const { roomName } = useContext(RoomNameContext);

  const updateStoryPoint = (data = {}) => {
    let { usersRes = {} } = data;
    setUserResponses({ ...usersRes });
  };
  const updateStory = (data = {}) => {
    let { story = "" } = data;
    setStory(story);
    if (story) {
      setStoryStep(1);
    }
  };

  useEffect(() => {
    if (!roomName.trim()) {
      router.push("/admin");
    } else {
      //when new user is added
      socket.on("users", (data = {}) => {
        setUsers([...Object.keys(data)]);
      });
      socket.on("update-story-points", updateStoryPoint);
      socket.on("update-story", updateStory);
      //when admin refresh the page it gets the users data if avalilable
      socket.emit("get-users-data", { roomName });
    }
  }, []);

  const handleStoryChange = (e) => {
    setStory(e.target.value);
  };
  const addStory = (e) => {
    socket.emit("set-story", { story, roomName });
    setStoryStep(1);
  };
  const flipCards = (e) => {
    socket.emit("stop-estimations", { story, roomName });
    setStoryStep(2);
  };

  const resetData = (e) => {
    socket.emit("reset-question", { roomName });
    setStoryStep(0);
    setUserResponses({});
    setStory("");
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
              ADMIN OF ROOM :{" "}
              <span className={classes.roomName}>{roomName}</span>
            </H2>
          </Tooltip>
        </Wrapper>
        <Wrapper noFlex pt={30}>
          <TextField
            id="standard-multiline-flexible"
            label="Story"
            classes={{ root: classes.storyArea }}
            multiline
            rowsMax={7}
            value={story}
            onChange={handleStoryChange}
          />
          {storyStep === 0 ? (
            <Button
              disabled={!story.trim().length}
              onClick={addStory}
              className={classes.Button}
              variant="outlined"
              color="secondary"
            >
              CREATE
            </Button>
          ) : storyStep === 1 ? (
            <Button
              onClick={flipCards}
              className={classes.Button}
              variant="outlined"
              color="secondary"
            >
              FLIP
            </Button>
          ) : (
            <Button
              onClick={resetData}
              className={classes.Button}
              variant="outlined"
              color="secondary"
            >
              RESET
            </Button>
          )}
        </Wrapper>
        <Wrapper className={classes.cardsWrapper} pt={30}>
          {users.map((row) => (
            <Wrapper key={row} margin={30} align="center" noFlex col>
              <div
                className={`flip-card  ${
                  storyStep === 2 ? classes.flipTheCard : ""
                }`}
              >
                <div
                  className={`flip-card-inner ${
                    storyStep === 2 ? classes.flipTheCard : ""
                  }`}
                >
                  <div className="flip-card-front">
                    {userResponses[row] ? (
                      <div className={classes.doneEstimation}>
                        <DoneIcon className={classes.doneIcon} />
                      </div>
                    ) : null}
                  </div>
                  <div className="flip-card-back">
                    <div className={classes.backCard}>
                      {userResponses[row] ? (
                        userResponses[row]
                      ) : (
                        <span className={classes.notAnswred}>NOT ANSWRED</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <P2 className={classes.cardName}>
                <span>{row}</span>
              </P2>
            </Wrapper>
          ))}
        </Wrapper>
      </Wrapper>
      <Wrapper noFlex>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell classes={{ root: classes.tableCell }}>
                  Members: {users.length}
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
