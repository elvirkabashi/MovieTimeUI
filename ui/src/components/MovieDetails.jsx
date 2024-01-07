import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import LoadingSpinner from './LoadingSpinner';

import noimage from '../assets/img/no-image.jpg'
import RatingForm from './RatingForm';

function MovieDetails() {

    const { id } = useParams()
    const [movie,setMovie] = useState()
    const [isInFavorites,setIsInFavorites] = useState(true);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    const [showWarningAlert, setShowWarningAlert] = useState(false);
  
    useEffect(() => {
      axios.get(`https://localhost:7147/api/Movies/${id}`)
        .then(res => {
          setMovie(res.data);
          setLoading(false); 
        })
        .catch(err => {
          console.error('Error fetching movies:', err);
          setError('Error fetching movies!');
          setLoading(false); 
        });

    }, [id]);

    const addToWatchlist = async () => {
        try {
          
          const watchlistResponse = await axios.get('https://localhost:7147/api/Watchlists');
          const currentWatchlist = watchlistResponse.data;
    
          
          if (currentWatchlist.some(item => item.movieId === movie.id)) {
            setShowWarningAlert(true);
          } else {
           
            await axios.post('https://localhost:7147/api/Watchlists', { movieId: id });
            setShowSuccessAlert(true);
          }
        } catch (error) {
          console.error('Error adding to watchlist:', error);
          
        }
      };

      useEffect(() => {

        const checkIfInFavorites = async () => {
          try {
            const favoritesResponse = await axios.get('https://localhost:7147/api/Favorites');
            const favorites = favoritesResponse.data;
            const isInFavorites = favorites.some(item => item.movieId.toString() === id.toString());
            setIsInFavorites(isInFavorites);
          } catch (error) {
            console.error('Error checking if in favorites:', error);
          }
        };

        checkIfInFavorites();
    }, [id]);

    const addToFavorites = async () => {
      try {
        const favoritesResponse = await axios.get('https://localhost:7147/api/Favorites');
        const currentFavorites = favoritesResponse.data;
        console.log(currentFavorites.some(item => item.movieId.toString() === id))
        if (currentFavorites.some(item => item.movieId.toString() === id)) {
          
          const favoriteToDelete = currentFavorites.find(item => item.movieId.toString() === id);
          await axios.delete(`https://localhost:7147/api/Favorites/${favoriteToDelete.favoriteId}`);
          setIsInFavorites(false);
        } else {
          await axios.post('https://localhost:7147/api/Favorites', { movieId: id });
          setIsInFavorites(true);
        }
      } catch (error) {
        console.error('Error adding to favorites:', error);
      }
    };

 
    if (loading) {
      return <LoadingSpinner />;
    }
  
    if (error) {
      return <h3 className="text-danger text-center">{error}</h3>;
    }

    const closeAlerts = () => {
        setShowSuccessAlert(false);
        setShowWarningAlert(false); 
      };

  return (
    <div className="text-white container">
        
        <div className='d-flex flex-column justify-content-center align-items-center'>
            {showSuccessAlert && (
                <div className="alert alert-primary alert-dismissible fade show" role="alert" style={{ maxWidth: '300px' }}>
                Successfully added to <a href="/watchlist" className="alert-link">watchlist</a>.
                <button type="button" className="btn-close" onClick={closeAlerts} aria-label="Close"></button>
                </div>
            )}

            {showWarningAlert && (
                <div className="alert alert-warning alert-dismissible fade show d-flex" role="alert" style={{ maxWidth: '600px' }}>
                <p>Movie is already in the watchlist</p>
                <a href="/watchlist" className="alert-link ms-2">
                    Click me to check
                </a>
                .
                <button type="button" className="btn-close" onClick={closeAlerts} aria-label="Close"></button>
                </div>
            )}
        </div>

        <div className='d-flex flex-column justify-content-center align-items-center'>
            <h1 className=''>{movie.title} </h1>
            {isInFavorites ? (
              <button className='btn' onClick={addToFavorites}>
                <i className="bi bi-heart-fill text-danger"></i>
              </button>
              ) : (
              <button className='btn' onClick={addToFavorites}>
                <i className="bi bi-heart text-white"></i>
              </button>
            )}
            <div className='d-flex gap-5 py-2'>
                <h4>Published Year: {movie.publishedYear}</h4>
                <button className='btn btn-outline-warning' onClick={addToWatchlist}>Add to Watchlist</button>
            </div>
            <img src={noimage} alt="" width={600}/>
            <p>{movie.description}</p>
            <hr/>
            <p>Actors: {movie.actors.map(a => <div className="d-flex flex-row" key={a}><b>{a}</b></div>)}</p>
        </div>
        <div className='d-flex flex-column justify-content-center align-items-center'>
        <RatingForm movieId={id} />
      </div>
    </div>
  )
}

export default MovieDetails