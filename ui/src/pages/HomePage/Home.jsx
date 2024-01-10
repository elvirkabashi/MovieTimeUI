import React, { useEffect, useState } from "react";
import axios from 'axios';
import MovieCard from "../../components/MovieCard";
import LoadingSpinner from "../../components/LoadingSpinner";

function Home() {
  const [movies, setMovies] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState({ query: '' });
  const [noResults, setNoResults] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const apiUrl = `https://localhost:7147/api/Movies?query=${search.query}`;
      const response = await axios.get(apiUrl);

      if (response.data && Array.isArray(response.data)) {
        const exactMatch = response.data.find(movie =>
          movie.title.toLowerCase().includes(search.query.toLowerCase()) ||
          movie.description.toLowerCase().includes(search.query.toLowerCase()) ||
          movie.publishedYear.toString().includes(search.query)
        );

        if (exactMatch) {
          setMovies([exactMatch]);
          setNoResults(false);
        } else {
          setMovies([]);
          setNoResults(true);
        }
      } else {
        setMovies([]);
        setNoResults(true);
      }
    } catch (error) {
      console.error('Error fetching movies:', error);
      setError('Error fetching movies. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const apiUrl = `https://localhost:7147/api/Movies?query=${search.query}`;
    axios.get(apiUrl)
      .then(res => {
        setMovies(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching movies:', err);
        setError('Error fetching movies!');
        setLoading(false);
      });
  }, [search.query]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <h3 className="text-danger text-center">{error}</h3>;
  }

  return (
    <>
      <form onSubmit={handleSearch} className="mb-4">
        <input
          type="text"
          placeholder="Search movies by title, description, or year..."
          name="searchInput"
          value={search.query}
          onChange={(e) => setSearch({ ...search, query: e.target.value })}
        />
        <button type="submit">Search</button>
      </form>

      {noResults && <p>No results found for "{search.query}"</p>}

      <div className="container d-flex flex-wrap gap-3 py-5">
        {movies && movies.map(movie => (
          <MovieCard key={movie.movieId}
            movieId={movie.movieId}
            title={movie.title}
            publishedYear={movie.publishedYear} />
        ))}
      </div>
    </>
  );
}

export default Home;
