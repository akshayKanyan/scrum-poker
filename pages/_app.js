import React, { useState } from "react";
import { ThemeProvider } from "styled-components";
import { ThemeProvider as MaterialThemeProvider } from "@material-ui/core/styles";
import { materialTheme } from "../theme/materialTheme";
import { sCTheme } from "../theme/sCTheme";
import Link from "next/link";
import socketIOClient from "socket.io-client";
import { Wrapper } from "../components/templates/wrapper";
import { H3 } from "../components/typography";
import "../styles/globals.css";

const ENDPOINT =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:3000"
    : "https://scrum-poker-3pg.herokuapp.com/";
const socket = socketIOClient(ENDPOINT);
export const SocketContext = React.createContext({});
export const RoomNameContext = React.createContext("");

function MyApp({ Component, pageProps }) {
  const [roomName, setRoomName] = useState("");
  const [userName, setUserName] = useState("");

  return (
    <MaterialThemeProvider theme={materialTheme}>
      <ThemeProvider theme={sCTheme}>
        <Wrapper col>
          <Wrapper className={"header"}>
            <Link href="/">
              <H3 cursor={"pointer"} animation>
                Scrum Poker
              </H3>
            </Link>
          </Wrapper>
          <SocketContext.Provider value={{ socket }}>
            <RoomNameContext.Provider
              value={{ roomName, setRoomName, userName, setUserName }}
            >
              <Component {...pageProps} />
            </RoomNameContext.Provider>
          </SocketContext.Provider>
        </Wrapper>
      </ThemeProvider>
    </MaterialThemeProvider>
  );
}

export default MyApp;
