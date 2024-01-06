import { useEffect, useState } from 'react';
import noimage from '../assets/img/no-image.jpg'
import PropTypes from 'prop-types'; 
import axios from 'axios';


function MovieCard({wlistId,movieId,title}) {

  const [del,setDel] = useState(false);
  const[isFavorite,setIsFavorite]=useState(false);
  

  const isOnFavoritesPage = window.location.href.includes('/favorite');


  useEffect(()=>{
    const currentUrl = window.location.href;
    if(currentUrl.split("/")[3] === 'watchlist'){
      setDel(true) 
    }

    const tooltipElement = document.querySelector('[data-bs-toggle="tooltip"]');
    if (tooltipElement) {
      new window.bootstrap.Tooltip(tooltipElement);
    }

    return () => {
      const tooltipInstance = window.bootstrap.Tooltip.getInstance(tooltipElement);
      if (tooltipInstance) {
        tooltipInstance.dispose();
      }
    };
  },[])

  const handleDelete = async () => {
    const confirmed = window.confirm(`Are you sure you want to delete ${title}?`);

    if (confirmed) {
      try {
        
        const response = await axios.delete(`https://localhost:7147/api/Watchlists/${wlistId}`);

        if (response.status === 200) {
          // Handle successful deletion (e.g., show a success message)
          console.log('Movie deleted successfully');
        } else {
          // Handle deletion failure (e.g., show an error message)
          console.error('Failed to delete movie');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  const handleFavorite = async () => {
    try {
      const response = await axios.post('https://localhost:7147/api/Favorites', {
        movieId: movieId,
        // Add any additional data related to the favorite, if needed
      });

      if (response.status >= 200 && response.status<300) {
        setIsFavorite(!isFavorite);
        setSuccessMessage('Added to Favorites')
       
     
      } else {
        console.error('Failed to toggle movie as favorite. Response:', response);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  const handleDeleteFavorite = async () => {
    const confirmed = window.confirm(`Are you sure you want to delete ${title}?`);

    if (confirmed) {
    try {
      const response = await axios.delete(`https://localhost:7147/api/Favorites/${movieId}`);
  
      if (response.status === 200) {
        console.log('Movie removed from favorites successfully');
        setIsFavorite(false); // Assuming you also want to update local state
      } else {
        console.error('Failed to remove movie from favorites');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }
  };
  



  return (
    <div className="card" style={{ width: '18rem' }}>
      {del && 
        <button type="button" className="btn-close btn btn-secondary" data-bs-toggle="tooltip" data-bs-placement="left"
        title="Delete" aria-label="Close" style={{ position: 'absolute', top: 5, right: 5 }}
        onClick={handleDelete}></button>
      
      }
      
   <button
  type="button"
  className="btn-close btn btn-secondary"
  data-bs-toggle="tooltip"
  data-bs-placement="left"
  title="Remove from Favorites"
  aria-label="Close"
  style={{ position: 'absolute', top: 5, right: 5 }}
  onClick={() => handleDeleteFavorite(movieId)}
></button>

  
    
    

    <img src={noimage} className="card-img-top" alt="Movie Poster" />
    <div className="card-body">
      <h5 className="card-title">{title}</h5>
      <a href={`/movie/id/${movieId}`} className="btn btn-outline-primary">
        Details
      </a>

  
   
      {isOnFavoritesPage ? (
          <button
            type="button"
            className="btn-close btn btn-secondary"
            data-bs-toggle="tooltip"
            data-bs-placement="left"
            title="Remove from Favorites"
            aria-label="Close"
            style={{ position: 'absolute', top: 5, right: 5 }}
            onClick={handleDeleteFavorite}
          ></button>
        ) : (
          <button
            className={`btn btn-outline-danger`}
            onClick={handleFavorite}
          >
            Add to Favorites
          </button>
        )}

      
    </div>
  </div>
  )
}
  
MovieCard.propTypes = {
    wlistId : PropTypes.number.isRequired,
    movieId : PropTypes.number.isRequired,
    title : PropTypes.string.isRequired,
    description : PropTypes.string.isRequired,
    publishedYear : PropTypes.number.isRequired,
    genre : PropTypes.string.isRequired,
    actors : PropTypes.arrayOf(PropTypes.string)
}

export default MovieCard