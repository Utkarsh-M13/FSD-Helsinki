import React from "react";

const Search = ({ search, setSearch }) => {
  return (
    <div>
      <div className="label">Search:</div>
      <input
        type="text"
        value={search}
        onChange={(event) => setSearch(event.target.value)}
      />
    </div>
  );
};

export default Search;
