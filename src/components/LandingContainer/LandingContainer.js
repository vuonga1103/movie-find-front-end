import { makeStyles } from "@material-ui/core";
import React from "react";
import Logo from "./Logo/Logo";
import ResultsContainer from "./ResultsContainer/ResultsContainer";
import Search from "./Search/Search";

const useStyles = makeStyles({
  container: {
    marginTop: 80,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  searchContainer: {
    marginTop: 10,
    marginBottom: 10,
  },
});
export default function LandingContainer() {
  const { container, searchContainer } = useStyles();

  return (
    <div className={container}>
      <Logo />
      <div className={searchContainer}>
        <Search />
      </div>
      <ResultsContainer />
    </div>
  );
}
