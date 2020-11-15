const getImageURL = (path, width = 1280) =>
  `http://image.tmdb.org/t/p/w${width}${path}`;

export { getImageURL };
