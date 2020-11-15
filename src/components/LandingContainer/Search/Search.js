import React, { useState } from "react";
import SearchBar from "material-ui-search-bar";
import { makeStyles } from "@material-ui/core";
import axios from "axios";
import { API_KEY } from "../../../utils/constants";

const useStyle = makeStyles({
  search: {
    width: 300,
    height: 45,
  },
});

export default function Search({ setMovies }) {
  const { search } = useStyle();

  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = async (newValue) => {
    if (newValue.length) {
      setSearchTerm(newValue);
      const result = await fetchMovies(newValue);
      setMovies(result);
    } else {
      setMovies([]);
    }
  };

  async function fetchMovies(searchVal) {
    try {
      const response = await axios.get(
        `http://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=` +
          searchVal
      );
      const { data } = await response;
      return data.results;
    } catch (error) {
      console.error("Could not fetch movies.", error);
    }
  }

  return (
    <SearchBar
      className={search}
      onChange={handleSearchChange}
      value={searchTerm}
      placeholder="Enter movie name..."
      onCancelSearch={() => setMovies([])}
    />
  );
}
