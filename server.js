const { createServer } = require("http");
const { parse } = require("url");
const next = require("next");
const socketIo = require("socket.io");
const moment = require("moment");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = createServer((req, res) => {
    // Be sure to pass `true` as the second argument to `url.parse`.
    // This tells it to parse the query portion of the URL.
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  }).listen(process.env.PORT, (err) => {
    if (err) throw err;
    console.log("> Ready on ", process.env.PORT);
  });
  const io = socketIo(server);
  let users = {};
  io.on("connection", (socket) => {
    socket.on("create-room", (data = {}) => {
      let { roomName } = data || {};
      if (!users[roomName]) {
        users[roomName] = {};
      }
      socket.join(roomName);
      socket.emit("room-joined", true);
      //   users.push({
      //     id: socket.id,
      //     userName: userName,
      //     connectionTime: new moment().format("YYYY-MM-DD HH:mm:ss"),
      //   });
      //   socket.emit("connecteduser", JSON.stringify(users[users.length - 1]));
      //   io.emit("users", JSON.stringify(users));
    });

    socket.on("get-users-data", (data = {}) => {
      let { roomName } = data || {};
      if (!users[roomName]) {
        users[roomName] = {};
      }
      socket.emit("users", users[roomName].users ? users[roomName].users : {});
      socket.emit(
        "update-story-points",
        users[roomName].story && users[roomName].story.length
          ? users[roomName].story[users[roomName].story.length - 1]
          : {}
      );
      socket.emit(
        "update-story",
        users[roomName].story && users[roomName].story.length
          ? users[roomName].story[users[roomName].story.length - 1]
          : {}
      );
    });

    socket.on("get-user-data", (data = {}) => {
      let { roomName, userName } = data || {};
      if (!users[roomName]) {
        socket.emit("no-room-found", "no room found");
        return;
      }
      socket.emit("users", users[roomName].users ? users[roomName].users : {});
      socket.emit(
        "update-story-points",
        users[roomName].story && users[roomName].story.length
          ? users[roomName].story[users[roomName].story.length - 1]
          : {}
      );
      socket.emit(
        "new-story",
        users[roomName].story && users[roomName].story.length
          ? users[roomName].story[users[roomName].story.length - 1]
          : {}
      );
    });

    socket.on("login", (data = {}) => {
      console.log("sssssss", data);
      let { userName, roomName } = data;
      if (!users[roomName]) {
        socket.emit("no-room-found", "no room found");
        return;
      }
      console.log("ssssssssssss11111", data);
      if (
        users[roomName] &&
        users[roomName].users &&
        users[roomName].users[userName]
      ) {
        socket.join(roomName);
        socket.emit("user-room-joined", true);
      } else {
        if (users[roomName] && !users[roomName].users) {
          users[roomName].users = { [userName]: true };
        } else {
          users[roomName].users[userName] = true;
        }
        socket.join(roomName);
        socket.emit("user-room-joined", true);
      }
      //   socket.emit("connecteduser", JSON.stringify(users[users.length - 1]));
      io.to(roomName).emit("users", users[roomName].users);
    });

    socket.on("set-story", (data = {}) => {
      console.log("sssssss", data);
      let { roomName, story } = data;
      if (users[roomName] && users[roomName].story) {
        users[roomName].story.push({
          story,
          storyNumber: users[roomName].story.length - 1,
          usersRes: {},
          estimationsStopped: false,
        });
      } else {
        users[roomName].story = [
          { story, storyNumber: 0, usersRes: {}, estimationsStopped: false },
        ];
      }
      io.to(roomName).emit(
        "new-story",
        users[roomName].story[users[roomName].story.length - 1]
      );
    });

    socket.on("reset-question", (data = {}) => {
      let { roomName } = data;
      io.to(roomName).emit("new-story", {});
    });

    socket.on("set-user-story-point", (data = {}) => {
      console.log("sssssss", data);
      let { roomName, userName, storyPoint } = data;
      users[roomName].story[users[roomName].story.length - 1].usersRes[
        userName
      ] = storyPoint;
      io.to(roomName).emit(
        "update-story-points",
        users[roomName].story[users[roomName].story.length - 1]
      );
    });

    socket.on("stop-estimations", (data = {}) => {
      let { roomName } = data;
      users[roomName].story[
        users[roomName].story.length - 1
      ].estimationsStopped = true;
      io.to(roomName).emit(
        "stop-estimations",
        users[roomName].story[users[roomName].story.length - 1]
      );
    });

    // socket.on("sendMsg", (msgTo) => {
    //   msgTo = JSON.parse(msgTo);
    //   const minutes = new Date().getMinutes();
    //   io.emit(
    //     "getMsg",
    //     JSON.stringify({
    //       id: socket.id,
    //       userName: users.find((e) => e.id == msgTo.id).userName,
    //       msg: msgTo.msg,
    //       time:
    //         new Date().getHours() +
    //         ":" +
    //         (minutes < 10 ? "0" + minutes : minutes),
    //     })
    //   );
    // });

    // socket.once("disconnect", () => {
    //   let index = -1;
    //   if (users.length >= 0) {
    //     index = users.findIndex((e) => e.id == socket.id);
    //   }
    //   if (index >= 0) users.splice(index, 1);
    //   io.emit("users", JSON.stringify(users));
    // });
  });
});
