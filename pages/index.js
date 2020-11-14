import React, { useState, useContext, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Wrapper } from "../components/templates/wrapper";
import Link from "next/link";
import Button from "@material-ui/core/Button";
import { H1 } from "../components/typography";

import { PokerStyle } from "../theme/pokerStyle.js";

const useStyles = makeStyles(PokerStyle);

export default function ScrumPoker() {
  const classes = useStyles();

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
