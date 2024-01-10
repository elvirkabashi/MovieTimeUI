// src/components/SearchBar.js
import React, { useState } from 'react';
import axios from 'axios';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [noResults, setNoResults] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    try {
      setLoading(true);

      const response = await axios.get(`/api/Movies?query=${query}`);
      console.log('API Response:', response.data);

      if (Array.isArray(response.data)) {
        setMovies(response.data);
        setNoResults(response.data.length === 0);
      } else {
        setMovies([]);
        setNoResults(true);
      }
    } catch (error) {
      console.error('Error fetching movies:', error);
      setError('Error fetching movies. Please try again.'); // Set error message
      setMovies([]); // Set movies to an empty array in case of an error
      setNoResults(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search movies by title or description..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>

      {loading && <p>Loading...</p>}

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {noResults && !loading && <p>No results found for "{query}"</p>}

      <ul>
        {movies.map((movie) => (
          <li key={movie.movieId}>
            <h3>{movie.title}</h3>
            <p>{movie.description}</p>
            <p>Year: {movie.publishedYear}</p>
            <p>Genre: {movie.genre}</p>
            <p>Actors: {movie.actors.join(', ')}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchBar;
