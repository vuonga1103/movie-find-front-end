const getImageURL = (path, width = 1280) =>
  `http://image.tmdb.org/t/p/w${width}${path}`;

const formatDate = (dateStr) => {
  const newDate = new Date(dateStr);
  const month = newDate.getMonth() + 1;
  const date = newDate.getDate();
  const year = newDate.getFullYear();
  return `${month}/${date}/${year}`;
};

export { getImageURL, formatDate };
