import React from "react";
import { AppBar, makeStyles, Toolbar } from "@material-ui/core";
import Logo from "../LandingContainer/Logo/Logo";

const useStyles = makeStyles({
  header: {
    backgroundColor: "rgba(32, 32, 32, 0.4)",
    paddingLeft: 25,
    "@media (max-width: 799px)": { paddingLeft: 0 },
  },
});
export default function Header() {
  const { header } = useStyles();

  return (
    <AppBar position="static" className={header}>
      <Toolbar>
        <Logo isSmall />
      </Toolbar>
    </AppBar>
  );
}
