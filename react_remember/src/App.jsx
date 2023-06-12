import React from "react";
import { useEffect, useState } from "react";
import SearchIcon from "./search.svg";
import "./Style.css";
import Movie from "./Movie";

//  fc77a9ec
const API_URL = "https://www.omdbapi.com?apikey=fc77a9ec";

export default function App() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();

    setMovies(data.Search);
  };
  useEffect(() => {
    searchMovies("Shrek");
  }, []);
  return (
    <div className="app ">
      <h1>MovieHouse</h1>
      <div className="search">
        <input
          type="text"
          placeholder="Search for movies"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />
        <img
          src={SearchIcon}
          alt="SearchIcon"
          onClick={() => searchMovies(searchTerm)}
        />
      </div>
      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <Movie key={movie.imdbID} movie={movie} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No movies found (</h2>
        </div>
      )}
    </div>
  );
}
