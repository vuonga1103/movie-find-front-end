import { Grid, makeStyles } from "@material-ui/core";
import React from "react";
import { opaqueGrey } from "../../../utils/constants";
import MovieCard from "./MovieCard/MovieCard";

const useStyles = makeStyles({
  container: {
    maxWidth: 800,
    margin: "10px 20px",
    backgroundColor: opaqueGrey,
    padding: "20px",
  },
});
export default function ResultsContainer({ movies }) {
  const { container } = useStyles();

  const displayMovieCards = () => {
    if (movies.length) {
      return movies.map(({ id, poster_path: path, original_title: title }) => {
        return (
          <Grid item key={id}>
            <MovieCard
              {...{
                path,
                id,
                title,
              }}
            />
          </Grid>
        );
      });
    }
  };
  return movies.length ? (
    <Grid
      container
      {...{ className: container, spacing: 3, justify: "center" }}
    >
      {displayMovieCards()}
    </Grid>
  ) : null;
}
