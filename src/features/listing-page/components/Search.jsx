import React, { useState } from "react";
import styled from "styled-components";

const StyleSearchInput = styled.input`
  padding: 8px;
  border-radius: 3px;
  width: 20rem;

  border: 1px solid rgba(0, 0, 0, 0.1);
  outline: none;
  transition: all 0.3s;

  &:focus {
    border: 1px solid rgba(0, 0, 255, 0.4);
  }

  &:active {
    border: 1px solid rgba(0, 0, 255, 0.4);
  }
`;
//value paramater: which kind of value is going to be specifying inside this search component
//name: not product name !!!
const Search = ({ handleSearchChange, searchValueSaved }) => {
  const [searchValue, setSearchValue] = useState(searchValueSaved); //For CSS + 'checked' attribute purpose

  //for saving data in search bar
  const handleInputChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearchChange(searchValue);
    }
  };

  return (
    <div>
      <StyleSearchInput
        value={searchValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder="what are you looking for..."
      />
    </div>
  );
};

export default Search;
