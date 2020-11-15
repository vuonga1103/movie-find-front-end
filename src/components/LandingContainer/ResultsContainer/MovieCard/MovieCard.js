import React from "react";
import { Link } from "react-router-dom";
import { getImageURL } from "../../../../utils/helperFns";
import noPoster from "../../../../images/no-poster.jpg";

export default function MovieCard({ path, id, title }) {
  const imgURL = path ? getImageURL(path) : noPoster;

  return (
    <div>
      <Link to={`/movie/${id}`}>
        <span title={title} /*This ensures that title text displays on hover*/>
          <img
            src={imgURL}
            alt={title}
            style={{ width: 150, borderRadius: "10px" }}
          />
        </span>
      </Link>
    </div>
  );
}
