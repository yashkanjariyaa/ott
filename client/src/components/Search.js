import React, { useState } from "react";
import axios from "axios";
import movieObject from "../disneyPlusMoviesData.json";
import "../App.css";
import { useHistory } from "react-router-dom";
const SearchBar = () => {
    const history  = useHistory();
  const [searchText, setSearchText] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [dropdownOptions] = useState([
    movieObject.movies[1].title,
    movieObject.movies[2].title,
    movieObject.movies[3].title,
    movieObject.movies[4].title,
    movieObject.movies[5].title,
    movieObject.movies[6].title,
    movieObject.movies[7].title,
    movieObject.movies[8].title,
    movieObject.movies[9].title,
    movieObject.movies[10].title,
    movieObject.movies[11].title,
    movieObject.movies[12].title,
    movieObject.movies[13].title,
    movieObject.movies[14].title,
    movieObject.movies[15].title,
    movieObject.movies[16].title,
    // Add more options as needed
  ]);
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    setSearchText(e.target.value);
    setShowDropdown(true);
  };

  const handleOptionClick = async (id) => {
    setShowDropdown(false);
    await fetchMovieData(id);
  };

  const fetchMovieData = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:1337/api/search?query=${id}`
      );
      const data = response.data;
      console.log(data);
      if (data.Error) {
        console.log(data.Error);
        setError(data.Error);
        setMovies([]);
      } else {
        const movies = data.Search; // Assuming data.Search contains an array of movies
        history.push(`/detail/` + movies.id);
        setError("");
      }
    } catch (error) {
      setError("Error fetching data");
      setMovies([]);
    }
  };

  const handleInputBlur = () => {
    setTimeout(() => {
      setShowDropdown(false);
    }, 200);
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
      />
      {showDropdown && (
        <ul className="dropdown">
          {dropdownOptions
            .filter((option) =>
              option.toLowerCase().includes(searchText.toLowerCase())
            )
            .map((option, index) => (
              <li key={index} onClick={() => handleOptionClick(index + 1)}>
                {option}
              </li>
            ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
