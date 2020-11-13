import React from "react";
import { ThemeProvider } from "styled-components";
import { ThemeProvider as MaterialThemeProvider } from "@material-ui/core/styles";
import { materialTheme } from "../theme/materialTheme";
import { sCTheme } from "../theme/sCTheme";
import socketIOClient from "socket.io-client";
import { Wrapper } from "../components/templates/wrapper";
import { H3 } from "../components/typography";
import "../styles/globals.css";

const ENDPOINT = "http://localhost:3000";
const socket = socketIOClient(ENDPOINT);
export const SocketContext = React.createContext({});

function MyApp({ Component, pageProps }) {
  return (
    <MaterialThemeProvider theme={materialTheme}>
      <ThemeProvider theme={sCTheme}>
        <Wrapper col>
          <Wrapper className={"header"}>
            <H3 animation>Scrum Poker</H3>
          </Wrapper>
          <SocketContext.Provider value={{ socket }}>
            <Component {...pageProps} />
          </SocketContext.Provider>
        </Wrapper>
      </ThemeProvider>
    </MaterialThemeProvider>
  );
}

export default MyApp;
