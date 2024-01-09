import { useEffect, useState } from "react";
import axios from 'axios';
import MovieCard from "../../components/MovieCard";
import LoadingSpinner from "../../components/LoadingSpinner";

function Home() {
  const [movies, setMovies] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('https://localhost:7147/api/Movies')
      .then(res => {
        setMovies(res.data);
        setLoading(false); 
      })
      .catch(err => {
        console.error('Error fetching movies:', err);
        setError('Error fetching movies!');
        setLoading(false); 
      });
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <h3 className="text-danger text-center">{error}</h3>;
  }

  return (
    <>
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
