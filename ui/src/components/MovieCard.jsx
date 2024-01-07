import { useEffect, useState } from 'react';
import noimage from '../assets/img/movietime.jpg'
import PropTypes from 'prop-types'; 
import axios from 'axios';


function MovieCard({wlistId,movieId,title}) {

  const [wtachListButton,setWtachListButton] = useState(false);
  
  useEffect(()=>{
    const currentUrl = window.location.href;
    if(currentUrl.split("/")[3] === 'watchlist'){
      setWtachListButton(true) 
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



  return (
    <a href={`/movie/id/${movieId}`}>
    <div className="card" 
    style={{
      width: '280px',
      height: '150px',
      position: 'relative',
      backgroundImage: `linear-gradient(rgba(255, 255, 255, 0) 0%, rgba(0, 0, 0, 0.8) 85%), url(${noimage})`,
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center top',
      border:'none'
    }}>
      {wtachListButton && 
        <button type="button" className="btn-close btn btn-secondary" data-bs-toggle="tooltip" data-bs-placement="left"
        title="Delete" aria-label="Close" style={{ position: 'absolute', top: 5, right: 5 }}
        onClick={handleDeleteWatchlist}></button>
      }
      
        <div
        className='px-3 py-1'
            style={{
              position: 'absolute',
              bottom: '0',
              left: '0',
              width: '100%',
            }}
          >
         <b style={{fontSize:'22px'}} className="card-title text-white">{title}</b>
          <ul className='text-white d-flex gap-1' style={{ listStyleType: 'none', margin: 0, padding: 0 ,fontSize:'12px'}}>
            <li>2h 12m</li>
            <li> • </li>
            <li>2012</li>
          </ul>
        </div>

      </div></a>
      )
    }

  
MovieCard.propTypes = {
    wlistId : PropTypes.number.isRequired,
    movieId : PropTypes.number.isRequired,
    title : PropTypes.string.isRequired,
    description : PropTypes.string,
    publishedYear : PropTypes.number,
    genre : PropTypes.string,
    actors : PropTypes.arrayOf(PropTypes.string)
}

export default MovieCard