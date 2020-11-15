import { makeStyles, Link } from "@material-ui/core";
import React from "react";
import { Link as RouterLink } from "react-router-dom";

const useStyles = makeStyles({
  logo: {
    fontFamily: "'Varela Round', sans-serif",
    color: "#E50A14",
    textShadow: "1.5px 1.5px 2px #fff",
    fontSize: 70,
    fontWeight: 800,
  },
  small: {
    fontSize: 30,
    textShadow: "0.8px 0.8px 1px #fff",
  },
});

export default function Logo({ isSmall }) {
  const { logo, small } = useStyles();

  return (
    <div className={`${logo} ${isSmall && small}`}>
      <Link
        {...{
          to: "/",
          component: RouterLink,
          color: "inherit",
          style: { textDecoration: "none" },
        }}
      >
        moviefind
      </Link>
    </div>
  );
}
