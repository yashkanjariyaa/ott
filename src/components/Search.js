import React, { useState } from 'react';
import axios from 'axios';
import movieObject from "../disneyPlusMoviesData.json";
import "../App.css";

const SearchBar = () => {
  const [searchText, setSearchText] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const moviesarray = [];
  for(let i = 0; i < 16; i++){
    moviesarray.push(
        movieObject.movies[i]
    )
  }
  const [dropdownOptions] = useState(moviesarray);
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    setSearchText(e.target.value);
    setShowDropdown(true);
  };

  const handleOptionClick = (option) => {
    setSearchText(option);
    setShowDropdown(false);
  };

  const handleInputBlur = () => {
    setTimeout(() => {
      setShowDropdown(false);
    }, 200);
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:1337/search?query=${encodeURIComponent(searchText)}`);
      const data = response.data;

      if (data.Error) {
        setError(data.Error);
        setMovies([]);
      } else {
        setMovies(data.Search || []); // Assuming data.Search contains an array of movies
        setError('');
      }
    } catch (error) {
      setError('Error fetching data');
      setMovies([]);
    }
  };

  const handleKeyPress = async (e) => {
    if (e.key === 'Enter') {
      await handleSearch();
    }
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search..."
        value={searchText}
        onChange={handleInputChange}
        onBlur={handleInputBlur}
        onFocus={() => setShowDropdown(true)}
        onKeyPress={handleKeyPress} // Added this line to trigger search on Enter key press
      />
      {showDropdown && (
        <ul className="dropdown">
          {dropdownOptions
            .filter((option) =>
              option.toLowerCase().includes(searchText.toLowerCase())
            )
            .map((option, index) => (
              <li key={index} onClick={() => handleOptionClick(option)}>
                {option}
              </li>
            ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
