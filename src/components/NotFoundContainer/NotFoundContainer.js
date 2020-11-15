import { Link, makeStyles, Typography } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles({
  container: {
    margin: "60px auto",
    padding: 20,
    maxWidth: 500,
    backgroundColor: "rgba(32, 32, 32, 0.4)",
  },
});

export default function NotFoundContainer() {
  const { container } = useStyles();

  return (
    <div className={container}>
      <Typography variant="h3">Oops! </Typography>
      <Typography variant="h5">That page could not be found.</Typography>
      <p>
        <Link color="inherit" href="/">
          <strong>Go Back Home</strong>
        </Link>
      </p>
    </div>
  );
}
