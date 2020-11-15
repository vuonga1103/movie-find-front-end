import { Grid, makeStyles } from "@material-ui/core";
import React from "react";
import MovieCard from "./MovieCard/MovieCard";

const useStyles = makeStyles({
  container: {
    maxWidth: 900,
    margin: "10px 20px",
    backgroundColor: "rgba(32, 32, 32, 0.4)",
    padding: "20px",
  },
});
export default function ResultsContainer({ movies }) {
  const { container } = useStyles();

  const displayMovieCards = () => {
    if (movies.length) {
      return movies.map(({ id, poster_path, original_title }) => {
        return (
          <Grid item key={id}>
            <MovieCard path={poster_path} id={id} title={original_title} />
          </Grid>
        );
      });
    }
  };
  return movies.length ? (
    <Grid className={container} container spacing={3} justify="center">
      {displayMovieCards()}
    </Grid>
  ) : (
    ""
  );
}
