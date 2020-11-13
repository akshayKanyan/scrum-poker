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
    const { pathname, query } = parsedUrl;

    if (pathname === "/a") {
      app.render(req, res, "/a", query);
    } else if (pathname === "/b") {
      app.render(req, res, "/b", query);
    } else {
      handle(req, res, parsedUrl);
    }
  }).listen(3000, (err) => {
    if (err) throw err;
    console.log("> Ready on http://localhost:3000");
  });
  const io = socketIo(server);
  let users = [];
  io.on("connection", (socket) => {
    socket.on("login", (userName) => {
      users.push({
        id: socket.id,
        userName: userName,
        connectionTime: new moment().format("YYYY-MM-DD HH:mm:ss"),
      });
      socket.emit("connecteduser", JSON.stringify(users[users.length - 1]));
      io.emit("users", JSON.stringify(users));
    });

    socket.on("sendMsg", (msgTo) => {
      msgTo = JSON.parse(msgTo);
      const minutes = new Date().getMinutes();
      io.emit(
        "getMsg",
        JSON.stringify({
          id: socket.id,
          userName: users.find((e) => e.id == msgTo.id).userName,
          msg: msgTo.msg,
          time:
            new Date().getHours() +
            ":" +
            (minutes < 10 ? "0" + minutes : minutes),
        })
      );
    });

    socket.once("disconnect", () => {
      let index = -1;
      if (users.length >= 0) {
        index = users.findIndex((e) => e.id == socket.id);
      }
      if (index >= 0) users.splice(index, 1);
      io.emit("users", JSON.stringify(users));
    });
  });
});
