import { Grid, makeStyles, Typography, Link } from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_KEY, BACKEND_BASE_URL } from "../../utils/constants";
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
      padding: "20px 10px 60px",
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
      bottom: 25,
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
  } = useStyle();

  const [movie, setMovie] = useState({});
  const [fillLike, setFillLike] = useState(false);
  const [fillDislike, setFillDislike] = useState(false);
  const [countLikes, setCountLikes] = useState(0);
  const [countDislikes, setCountDislikes] = useState(0);

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
        const { likes, dislikes } = result;
        setCountLikes(likes);
        setCountDislikes(dislikes);
      }
    });
  }, [id]);

  const handleDislikeClick = () => {
    if (fillDislike) {
      setFillDislike(false);
      removeOneDislike();
    } else {
      if (fillLike) {
        removeOneLike();
        setFillLike(false);
      }
      setFillDislike(true);
      addOneDislike();
    }
  };

  const handleLikeClick = () => {
    if (fillLike) {
      setFillLike(false);
      removeOneLike();
    } else {
      if (fillDislike) {
        removeOneDislike();
        setFillDislike(false);
      }
      setFillLike(true);
      addOneLike();
    }
  };

  const removeOneLike = async () => {
    try {
      const response = await axios.post(
        `http://localhost:4000/movies/${id}/remove-like`
      );
      const {
        data: { likes },
      } = await response;
      setCountLikes(likes);
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
        data: { dislikes },
      } = await response;
      setCountDislikes(dislikes);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const addOneDislike = async () => {
    try {
      const response = await axios.post(BACKEND_BASE_URL + id + "/add-dislike");

      const {
        data: { dislikes },
      } = await response;

      setCountDislikes(dislikes);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const addOneLike = async () => {
    try {
      const response = await axios.post(BACKEND_BASE_URL + id + "/add-like");
      const {
        data: { likes },
      } = await response;

      setCountLikes(likes);
    } catch (error) {
      console.log("Error:", error);
    }
  };

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
