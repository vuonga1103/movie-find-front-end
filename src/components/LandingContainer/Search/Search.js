import React, { useState } from "react";
import SearchBar from "material-ui-search-bar";
import { makeStyles } from "@material-ui/core";

const useStyle = makeStyles({
  search: {
    width: 300,
    height: 45,
  },
});
export default function Search() {
  const { search } = useStyle();
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <SearchBar
      className={search}
      value={searchTerm}
      onChange={(newValue) => setSearchTerm(newValue)}
      // onRequestSearch={() => doSomethingWith(this.state.value)}
    />
  );
}
