import React, { useState, useContext, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Wrapper } from "../components/templates/wrapper";
import { SocketContext } from "./_app";
import { v4 as uuidv4 } from "uuid";
import Link from "next/link";
import Button from "@material-ui/core/Button";
import { H1 } from "../components/typography";

import { PokerStyle } from "../theme/pokerStyle.js";

// export const getStaticProps = async (context) => {
//   // let productData = await axios
//   //   .get(
//   //     `https://3pupscript.globexcorp.net/wp-json/wp/v2/pages/?slug=hair-loss`
//   //   )
//   //   .then((_) => {
//   //     let { data = [] } = _;
//   //     console.log("abcd", data);
//   //     let { ACF } = data[0] || {};
//   //     return ACF || {};
//   //   });

//   return {
//     revalidate: 10,
//     props: {},
//   };
// };

// export async function getStaticPaths() {
//   return {
//     paths: [
//       // See the "paths" section below
//     ],
//     fallback: true, // See the "fallback" section below
//   };
// }

const useStyles = makeStyles(PokerStyle);

export default function ScrumPoker() {
  const classes = useStyles();
  const { name, setName } = useState("");
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

  return (
    <Wrapper align="center" col>
      <H1 pt={30}>SELECT USER</H1>
      <Wrapper align="center" col>
        <Link href="/admin">
          <Button className={classes.Button} variant="outlined" color="primary">
            Admin
          </Button>
        </Link>
        <Link href="/user">
          <Button
            className={classes.Button}
            variant="outlined"
            color="secondary"
          >
            User
          </Button>
        </Link>
      </Wrapper>
      {/* <input type="text" onChange={setUserName} />
      <input type="button" value="login" onClick={loginUser} /> */}
    </Wrapper>
  );
}
