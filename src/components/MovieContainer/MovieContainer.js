import { Grid, makeStyles, Typography, Link } from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_KEY, BACKEND_BASE_URL, opaqueGrey } from "../../utils/constants";
import { getImageURL, formatDate } from "../../utils/helperFns";
import thumbUp from "../../images/up.png";
import thumbUpFilled from "../../images/upfilled.png";
import thumbDown from "../../images/down.png";
import thumbDownFilled from "../../images/downfilled.png";

const useStyle = makeStyles({
  container: {
    maxWidth: 900,
    margin: "45px auto",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    position: "relative",
    "@media (max-width: 799px)": { margin: "15px auto" },
  },
  backdrop: {
    width: "100%",
    height: 300,
    objectFit: "cover",
    objectPosition: "0 15%",
    borderRadius: "20px 20px 0 0",
    "@media (max-width: 799px)": { display: "none" },
  },
  label: {
    color: "#c0c0c0",
    fontSize: 16,
  },
  infoContainer: {
    padding: "30px 20px",
    marginTop: 0,
    width: "100%",
    height: "100%",
    "@media (min-width: 799px)": { backgroundColor: opaqueGrey },
  },
  title: {
    "@media (max-width: 799px)": { fontSize: 22 },
  },
  details: {
    marginLeft: 6,
    paddingBottom: 30,
    height: "100%",
    "@media (max-width: 799px)": {
      backgroundColor: opaqueGrey,
      padding: "20px 20px 60px",
      borderRadius: 10,
    },
  },
  thumbs: {
    position: "absolute",
    bottom: 0,
    right: 20,
    display: "flex",
    width: 160,
    justifyContent: "space-between",
    "@media (max-width: 799px)": {
      right: 50,
      bottom: 40,
    },
  },
  thumb: {
    width: 35,
    marginBottom: 0,
    cursor: "pointer",
  },
  thumbContainer: {
    position: "relative",
    display: "flex",
    width: 60,
    alignItems: "center",
    justifyContent: "space-between",
  },
  count: {
    fontSize: 16,
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
    label,
  } = useStyle();

  const [state, setState] = useState({
    movie: {},
    fillLike: false,
    fillDislike: false,
    countLikes: 0,
    countDislikes: 0,
  });

  const { movie, fillLike, fillDislike, countLikes, countDislikes } = state;

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

    fetchMovie(id).then((result) =>
      setState((prevState) => ({ ...prevState, movie: result }))
    );

    // Determines whether or not the movie has already been persisted in backend
    async function movieInBackendDB(id) {
      try {
        const response = await axios.get(BACKEND_BASE_URL + id);
        const { data } = await response;
        return data;
      } catch (error) {
        console.log("Error:", error);
      }
    }

    // If movie returned (no error), set likes/dislikes accordingly
    movieInBackendDB(id).then((result) => {
      if (!result.error) {
        const { likes: countLikes, dislikes: countDislikes } = result;
        setState((prevState) => ({ ...prevState, countLikes, countDislikes }));
      }
    });
  }, [id]);

  const handleDislikeClick = () => {
    if (fillDislike) {
      setState((prevState) => ({ ...prevState, fillDislike: false }));
      removeOneDislike();
    } else {
      if (fillLike) {
        removeOneLike();
        setState((prevState) => ({ ...prevState, fillLike: false }));
      }
      setState((prevState) => ({ ...prevState, fillDislike: true }));
      addOneDislike();
    }
  };

  const handleLikeClick = () => {
    if (fillLike) {
      setState((prevState) => ({ ...prevState, fillLike: false }));
      removeOneLike();
    } else {
      if (fillDislike) {
        removeOneDislike();
        setState((prevState) => ({ ...prevState, fillDislike: false }));
      }
      setState((prevState) => ({ ...prevState, fillLike: true }));
      addOneLike();
    }
  };

  const removeOneLike = async () => {
    try {
      const response = await axios.post(
        `http://localhost:4000/movies/${id}/remove-like`
      );
      const {
        data: { likes: countLikes },
      } = await response;
      setState((prevState) => ({ ...prevState, countLikes }));
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const removeOneDislike = async () => {
    try {
      const response = await axios.post(
        BACKEND_BASE_URL + id + "/remove-dislike"
      );
      const {
        data: { dislikes: countDislikes },
      } = await response;
      setState((prevState) => ({ ...prevState, countDislikes }));
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const addOneDislike = async () => {
    try {
      const response = await axios.post(BACKEND_BASE_URL + id + "/add-dislike");

      const {
        data: { dislikes: countDislikes },
      } = await response;

      setState((prevState) => ({ ...prevState, countDislikes }));
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const addOneLike = async () => {
    try {
      const response = await axios.post(BACKEND_BASE_URL + id + "/add-like");
      const {
        data: { likes: countLikes },
      } = await response;

      setState((prevState) => ({ ...prevState, countLikes }));
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const getBackdrop = () => {
    if (Object.keys(movie).length) {
      const { backdrop_path, original_title } = movie;
      const imgURL = getImageURL(backdrop_path);

      return (
        <img {...{ src: imgURL, alt: original_title, className: backdrop }} />
      );
    }
  };

  const getPoster = () => {
    if (Object.keys(movie).length) {
      const { poster_path, original_title } = movie;
      const imgURL = getImageURL(poster_path, 200);

      return <img {...{ src: imgURL, alt: original_title }} />;
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
          <Typography {...{ variant: "h4", className: title }}>
            <Link {...{ color: "inherit", href: url }}>
              {original_title} {`(${release_date.slice(0, 4)})`}
            </Link>
          </Typography>

          <div style={{ textAlign: "left" }}>
            <p>
              <span className={label}>Released: </span>
              {formatDate(release_date)}
              <br />
              <span className={label}>Runtime: </span>
              {runtime} minutes
              <br />
              <span className={label}>Rating: </span>
              {vote_average}
            </p>

            <p>
              <span className={label}>Overview: </span>
              {overview}
            </p>
          </div>

          <div className={thumbs}>
            <div className={thumbContainer}>
              <div onClick={handleDislikeClick}>
                <img
                  src={fillDislike ? thumbDownFilled : thumbDown}
                  className={thumb}
                  alt="thumbs down icon"
                />
              </div>

              <div className={count}>{countDislikes}</div>
            </div>
            <div className={thumbContainer}>
              <div onClick={handleLikeClick}>
                <img
                  src={fillLike ? thumbUpFilled : thumbUp}
                  className={thumb}
                  alt="thumbs up icon"
                />
              </div>

              <div className={count}>{countLikes}</div>
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
        container
        {...{
          className: infoContainer,
          direction: "row",
          justify: "center",
          alignItems: "flex-start",
          spacing: 4,
        }}
      >
        <Grid item {...{ xs: 12, sm: 4 }}>
          {getPoster()}
        </Grid>
        <Grid item {...{ xs: 12, sm: 8 }}>
          {getDetails()}
        </Grid>
      </Grid>
    </div>
  );
}
