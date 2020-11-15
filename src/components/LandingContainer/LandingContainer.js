import { makeStyles } from "@material-ui/core";
import React, { useState } from "react";
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
    marginBottom: 20,
  },
});

export default function LandingContainer() {
  const { container, searchContainer } = useStyles();

  const [movies, setMovies] = useState([]);

  return (
    <div className={container}>
      <Logo />
      <div className={searchContainer}>
        <Search setMovies={setMovies} />
      </div>
      <ResultsContainer movies={movies} />
    </div>
  );
}
