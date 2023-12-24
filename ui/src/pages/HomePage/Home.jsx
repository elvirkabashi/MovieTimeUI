import { useEffect, useState } from "react"
import axios from 'axios'
import MovieCard from "../../components/MovieCard";
function Home() {

  const [movies,setMovies] = useState();
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('https://localhost:7147/api/Movies')
    .then(res => {
        setMovies(res.data);
    })
    .catch(err => {
      console.error('Error fetching movies:', err);
      setError('Error fetching movies!');
    });
  },[])

  if (error) {
    return <div className="text-danger">{error}</div>;
  }

  return (
    <>
      <div className="container d-flex flex-wrap gap-3">
          {movies && movies.map(movie => (
            <MovieCard key={movie.movieId}
             
            title={movie.title} 
            description={movie.description} 
            publishedYear={movie.publishedYear}
            genre={movie.genre} 
            actors={movie.actors}/>
          ))}
      </div>
    </>
  )
}

export default Home