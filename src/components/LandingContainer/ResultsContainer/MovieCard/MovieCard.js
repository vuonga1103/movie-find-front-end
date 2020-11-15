import React from "react";
import { Link } from "react-router-dom";
import { getImageURL } from "../../../../utils/helperFns";
import noPoster from "../../../../images/no-poster.jpg";
import { makeStyles, Tooltip } from "@material-ui/core";

const useStyles = makeStyles({
  container: {
    width: 165,
    height: 240,
  },
  movieImg: {
    width: 150,
    borderRadius: "10px",
    "&:hover": {
      width: 160,
      transition: ".3s ease-in-out",
    },
  },
});

export default function MovieCard({ path, id, title }) {
  const { movieImg, container } = useStyles();
  const imgURL = path ? getImageURL(path) : noPoster;

  return (
    <div className={container}>
      <Link to={`/movie/${id}`}>
        <Tooltip arrow {...{ title, placement: "top" }}>
          {/* This ensures that title text displays on hover*/}
          <img
            {...{
              src: imgURL,
              alt: title,
              className: movieImg,
            }}
          />
        </Tooltip>
      </Link>
    </div>
  );
}
