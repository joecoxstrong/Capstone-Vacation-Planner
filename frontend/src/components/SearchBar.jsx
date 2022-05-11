import React, { useState } from "react";

const SearchBar = (props) => {
  const [search, setSearch] = useState("");

  function searchVacationPlans(rows) {
    const columns = rows[0] && Object.keys(rows[0]);
    return rows.filter((row) =>
      columns.some(
        (column) =>
          row[column].toString().toLowerCase().indexOf(search.toLowerCase()) >
          -1
      )
    );
  }
  return (
    <input
      type="text"
      placeholder="Search"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      style={{ marginLeft: 1050 }}
    />
  );
};

export default SearchBar;
