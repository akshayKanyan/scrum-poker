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

import { UserDashboardStyle } from "../theme/userDashboardStyle.js";

const useStyles = makeStyles(UserDashboardStyle);

export default function UserDashboard() {
  const classes = useStyles();
  const router = useRouter();
  const [story, setStory] = useState({});
  const [storyPoint, setStoryPoint] = useState({});

  const { socket } = useContext(SocketContext);
  const { roomName, userName } = useContext(RoomNameContext);

  const onNewStory = (data = {}) => {
    let { usersRes = {} } = data;
    setStory({ ...data });
    let point = usersRes[userName] || "";
    setStoryPoint(point);
  };

  const setPoint = (data = "") => {
    setStoryPoint(data);
    socket.emit("set-user-story-point", {
      userName,
      roomName,
      storyPoint: data,
    });
  };
  useEffect(() => {
    if (!roomName.trim() || !userName.trim()) {
      router.push("/");
    } else {
      socket.on("new-story", onNewStory);
      socket.on("stop-estimations", onNewStory);
      socket.emit("get-user-data", { roomName, userName });
    }
  }, []);

  const points = ["XS", "S", "M", "L", "XL", "XXL", "?"];

  return (
    <Wrapper col margin="0px 0px 0px 30px">
      <Wrapper noFlex pt={30}>
        <Tooltip
          title="you are in this room make sure this is same name set by admin"
          placement="bottom"
        >
          <H2 cursor="pointer">
            {userName} IN ROOM:{" "}
            <span className={classes.roomName}>{roomName}</span>
          </H2>
        </Tooltip>
      </Wrapper>
      <Wrapper col pt={30}>
        <h3>
          Story: <span className={classes.Story}>{story.story}</span>
        </h3>
        {story.story ? (
          <Wrapper className={classes.cardsWrapper} pt={30}>
            {points.map((row) => (
              <Wrapper
                key={row}
                cardHoverStyle
                className={`${classes.pointsCard}
                ${
                  story.estimationsStopped
                    ? storyPoint === row
                      ? classes.estimatedStopSelected
                      : classes.estimationsStopped
                    : ""
                }
                  ${storyPoint === row ? classes.selectedStoryPoint : ""} `}
                margin={30}
                center
                onClick={() => !story.estimationsStopped && setPoint(row)}
                noFlex
                col
              >
                {row}
              </Wrapper>
            ))}
          </Wrapper>
        ) : null}
      </Wrapper>
    </Wrapper>
  );
}
