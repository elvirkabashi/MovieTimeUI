import { useEffect, useState } from "react";
import axios from 'axios';
import MovieCard from "../../components/MovieCard";
import LoadingSpinner from "../../components/LoadingSpinner";

function Home() {
  const [movies, setMovies] = useState();
  const [loading, setLoading] = useState(true);
  //const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    let apiUrl = 'https://localhost:7147/api/Movies';
    if (searchQuery.trim() !== '') {
      apiUrl += `?query=${encodeURIComponent(searchQuery)}`;
    }

    axios.get(apiUrl)
      .then(res => {
        setMovies(res.data);
        setLoading(false);
      })
      .catch(() => {
        //console.error('Error fetching movies:', err);
       // setError('Error fetching movies!');
        setLoading(false);
      });
  }, [searchQuery]);

  const handleSearch = (e) => {
    e.preventDefault();
    // You can add additional search-related logic here if needed
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if(movies == undefined){
    return <div className="text-danger text-center">No Movies Found</div>;
  }
  

  return (
    <>
      <form className="mb-4" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search movies by title, description, or year..."
          name="searchInput"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
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
