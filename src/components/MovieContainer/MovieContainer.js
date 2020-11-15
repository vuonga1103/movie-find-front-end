import { Grid, makeStyles, Typography, Link } from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_KEY } from "../../utils/constants";
import { getImageURL } from "../../utils/helperFns";
import thumbUp from "../../images/up.png";
import thumbUpFilled from "../../images/upfilled.png";
import thumbDown from "../../images/down.png";
import thumbDownFilled from "../../images/downfilled.png";

const useStyle = makeStyles({
  container: {
    maxWidth: 900,
    margin: "20px auto",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    position: "relative",
  },
  backdrop: {
    width: "100%",
    height: 300,
    objectFit: "cover",
    objectPosition: "0 15%",
    borderRadius: "20px 20px 0 0",
    "@media (max-width: 799px)": { display: "none" },
  },
  infoContainer: {
    padding: "20px",
    marginTop: 0,
    width: "100%",
    height: "100%",
    "@media (min-width: 799px)": { backgroundColor: "rgba(32, 32, 32, 0.4)" },
  },
  title: {
    "@media (max-width: 799px)": { fontSize: 22 },
  },
  details: {
    marginLeft: 6,
    paddingBottom: 30,
    height: "100%",
    "@media (max-width: 799px)": {
      backgroundColor: "rgba(32, 32, 32, 0.4)",
      padding: "20px 10px 40px",
      borderRadius: 10,
    },
  },
  thumbs: {
    position: "absolute",
    bottom: 0,
    right: 20,
    display: "flex",
    "@media (max-width: 799px)": {
      right: 50,
      bottom: 20,
    },
  },
  thumb: {
    width: 50,
    marginBottom: 0,
  },
  thumbContainer: { position: "relative" },
  count: {
    position: "absolute",
    bottom: 0,
    right: 0,
    textAlign: "right",
  },
});
export default function MovieContainer() {
  const { id } = useParams();
  const {
    container,
    infoContainer,
    backdrop,
    details,
    title,
    thumbs,
    thumb,
    thumbContainer,
    count,
  } = useStyle();

  const [movie, setMovie] = useState({});

  useEffect(() => {
    async function fetchMovie(id) {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US}`
        );
        const { data } = await response;
        return data;
      } catch (error) {
        console.error("Could not fetch movie.", error);
      }
    }

    fetchMovie(id).then((result) => setMovie(result));
  }, [id]);

  const getBackdrop = () => {
    if (Object.keys(movie).length) {
      const { backdrop_path, original_title } = movie;
      const imgURL = getImageURL(backdrop_path);

      return <img src={imgURL} alt={original_title} className={backdrop} />;
    }
  };

  const getPoster = () => {
    if (Object.keys(movie).length) {
      const { poster_path, original_title } = movie;
      const imgURL = getImageURL(poster_path, 200);

      return <img src={imgURL} alt={original_title} />;
    }
  };

  const getDetails = () => {
    if (Object.keys(movie).length) {
      const {
        original_title,
        homepage: url,
        overview,
        release_date,
        runtime,
        vote_average,
      } = movie;
      return (
        <div className={details}>
          <Typography variant="h4" className={title}>
            <Link color="inherit" href={url}>
              {original_title} {`(${release_date.slice(0, 4)})`}
            </Link>
          </Typography>

          <div style={{ textAlign: "left" }}>
            <p>
              <strong>Released: </strong>
              {release_date}
              <br />
              <strong>Runtime: </strong>
              {runtime} min
              <br />
              <strong>Rating: </strong>
              {vote_average}/10
            </p>

            <p>{overview}</p>
          </div>

          <div className={thumbs}>
            <div className={thumbContainer}>
              <img src={thumbDown} className={thumb} alt="thumbs down icon" />{" "}
              {/* <div className={count}>2</div> */}
            </div>
            <div className={thumbContainer}>
              <img
                src={thumbUp}
                className={thumb}
                alt="thumbs up icon"
                style={{ width: 45 }}
              />{" "}
              {/* <div className={count}>1</div> */}
            </div>
          </div>
        </div>
      );
    }
  };

  return (
    <div className={container}>
      {getBackdrop()}
      <Grid
        className={infoContainer}
        container
        direction="row"
        justify="center"
        alignItems="flex-start"
        spacing={4}
      >
        <Grid item xs={12} sm={4}>
          {getPoster()}
        </Grid>
        <Grid item xs={12} sm={8}>
          {getDetails()}
        </Grid>
      </Grid>
    </div>
  );
}
