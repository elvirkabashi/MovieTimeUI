import { useEffect, useState } from 'react';
import noimage from '../assets/img/no-image.jpg'
import PropTypes from 'prop-types'; 
import axios from 'axios';


function MovieCard({favoriteId,wlistId,movieId,title}) {

  const [wtachListButton,setWtachListButton] = useState(false);

  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  const [isInFavorites, setIsInFavorites] = useState(false);
  

  useEffect(()=>{
    const currentUrl = window.location.href;
    if(currentUrl.split("/")[3] === 'watchlist'){
      setWtachListButton(true) 
    }


    const tooltipElement = document.querySelector('[data-bs-toggle="tooltip"]');
    if (tooltipElement) {
      new window.bootstrap.Tooltip(tooltipElement);
    }

    checkIfInFavorites();

    return () => {
      const tooltipInstance = window.bootstrap.Tooltip.getInstance(tooltipElement);
      if (tooltipInstance) {
        tooltipInstance.dispose();
      }
    };
  },[isInFavorites])


  const checkIfInFavorites = async () => {
    try {
      const favoritesResponse = await axios.get('https://localhost:7147/api/Favorites');
      const currentFavorite = favoritesResponse.data;

      const isInFavorites = currentFavorite.some(item => item.movieId === movieId);
      setIsInFavorites(isInFavorites);
    } catch (error) {
      console.error('Error checking if in Favorites:', error);
    }
  };

  const handleDeleteWatchlist = async () => {
    const confirmed = window.confirm(`Are you sure you want to delete ${title}?`);

    if (confirmed) {
      try {
        
        const response = await axios.delete(`https://localhost:7147/api/Watchlists/${wlistId}`);

        if (response.status === 200) {
          console.log('Movie deleted successfully');
        } else {
          console.error('Failed to delete movie');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  const handleFavorite = async () => {
    try {
      const favoritesResponse = await axios.get('https://localhost:7147/api/Favorites');
      const currentFavorite = favoritesResponse.data;

      if (currentFavorite.some(item => item.movieId === movieId)) {
        alert("This is already in your favorite list");
      } else {
        await axios.post('https://localhost:7147/api/Favorites', {
          movieId: movieId,
        });

        setShowSuccessAlert(true);
      }
    } catch (error) {
      console.error('Error adding to Favorites:', error);
    }
  };


  const handleDeleteFavorite = async () => {

    try {
      await axios.delete(`https://localhost:7147/api/Favorites/${favoriteId}`);
  
    
    } catch (error) {
      console.error('Error:', error);
    }

  };
  



  return (
    <div className="card" style={{ width: '18rem' }}>
      {wtachListButton && 
        <button type="button" className="btn-close btn btn-secondary" data-bs-toggle="tooltip" data-bs-placement="left"
        title="Delete" aria-label="Close" style={{ position: 'absolute', top: 5, right: 5 }}
        onClick={handleDeleteWatchlist}></button>
      }
      

    <img src={noimage} className="card-img-top" alt="Movie Poster" />
    <div className="card-body">
      {showSuccessAlert && (
        <p className=" fade show" role="alert" style={{ maxWidth: '300px' }}>
          Successfully added to Favorites.
        </p>
      )}
      <h5 className="card-title">{title}</h5>
      <div className='d-flex justify-content-between'>
      <a href={`/movie/id/${movieId}`} className="btn btn-outline-primary">
        Details
      </a>

      {isInFavorites ? (
          <button className='btn' onClick={() => (isInFavorites ? handleDeleteFavorite(favoriteId) : handleFavorite)}>
            
            <i className="bi bi-heart-fill text-danger"></i>
          </button>
        ) : (
          <button className='btn' onClick={handleFavorite}>
            <i className="bi bi-heart"></i>
            
          </button>
        )}
      </div>

      
    </div>
  </div>
  )
}
  
MovieCard.propTypes = {
    wlistId : PropTypes.number.isRequired,
    favoriteId : PropTypes.number.isRequired,
    movieId : PropTypes.number.isRequired,
    title : PropTypes.string.isRequired,
    description : PropTypes.string,
    publishedYear : PropTypes.number,
    genre : PropTypes.string,
    actors : PropTypes.arrayOf(PropTypes.string)
}

export default MovieCard