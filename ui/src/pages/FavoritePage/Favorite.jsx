import { useEffect, useState } from "react"
import axios from 'axios';
import LoadingSpinner from "../../components/LoadingSpinner";
import MovieCard from "../../components/MovieCard";


function Favorite (){
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const[favoriteMovies,setFavoriteMovies]=useState([])

    useEffect(() => {
        const fetchFavoriteMovies = async () => {
          try {
            const response = await axios.get('https://localhost:7147/api/Favorites');
    
            if (response.status === 200) {
              setFavoriteMovies(response.data);
            } else {
              setError('Failed to fetch favorite movies');
            }
          } catch (error) {
            setError('Error fetching favorite movies');
          } finally {
            setLoading(false);
          }
        };
    
        fetchFavoriteMovies();
      }, []);
    if (loading) {
        return <LoadingSpinner/>;
    }
    
    if (error) {
        return <h3 className="text-danger text-center">{error}</h3>;
    }
    return(
        <div>
        <h2>Favorite Movies</h2>
        <div className="row">
          {favoriteMovies.map((movie) => (
            <div key={movie.movieId} className="col-md-3">
              <MovieCard
                wlistId={movie.wlistId}
                movieId={movie.movieId}
                title={movie.title}
                description={movie.description}
                publishedYear={movie.publishedYear}
                genre={movie.genre}
                actors={movie.actors}
              />
            </div>
          ))}
        </div>
      </div>
    )
}

export default Favorite