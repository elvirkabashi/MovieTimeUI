import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import LoadingSpinner from './LoadingSpinner';
import '../assets/css/modal.css'

import noimage from '../assets/img/movietime.jpg'

import RatingForm from './RatingForm';
import RatingDisplay from './RatingDisplay ';

function MovieDetails() {

    const { id } = useParams()
    const [movie,setMovie] = useState()
    const [isInFavorites,setIsInFavorites] = useState(true);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    const [showWarningAlert, setShowWarningAlert] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [reviews,setReviews] = useState()
    const [avg,setAvg] = useState()
  
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

        axios.get(`https://localhost:7147/api/Ratings/ByMovieId/${id}`)
        .then(res=>{
          setReviews(res.data)
        })

        axios.get(`https://localhost:7147/api/Ratings/AverageRating/${id}`)
        .then(res=>{
          setAvg(res.data)
        })
    }, [id,reviews,isModalOpen]);

    const addToWatchlist = async () => {
      try {

        const watchlistResponse = await axios.get('https://localhost:7147/api/Watchlists');
        const currentWatchlist = watchlistResponse.data;


        if (currentWatchlist.some(item => item.movieId === movie.movieId)) {
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
    const openModal = () => {
      setIsModalOpen(true);
    };
  
    const closeModal = () => {
      setIsModalOpen(false);
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

      function formatDate(dateString) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
      }

  return (
    <div className="text-white container">

      <div className='d-flex justify-content-between'>
      
        <div className='d-flex flex-column justify-content-center align-items-center'>
          
            
        </div>

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
              <div className='d-flex'>
                <h1 className=''>{movie.title} </h1>
              {isInFavorites ? (
                <button className='btn' onClick={addToFavorites} style={{border:'none'}}>
                  <i className="bi bi-heart-fill text-danger" style={{fontSize:'22px'}}></i>
                </button>
                ) : (
                <button className='btn' onClick={addToFavorites} style={{border:'none'}}>
                  <i className="bi bi-heart text-white" style={{fontSize:'20px'}}></i>
                </button>
              )}
              </div>
              <RatingDisplay rate={avg} />
            <div className='d-flex gap-5 py-2'>
                <h4>Published Year: {movie.publishedYear}</h4>
                <button className='btn btn-outline-warning' onClick={addToWatchlist}>Add to Watchlist</button>
            </div>
            <img src={noimage} alt="" width={600} height={400}/>
            <p>{movie.description}</p>
            <hr/>
            <p>Actors: {movie.actors.map(a => <div className="d-flex flex-row" key={a}><b>{a}</b></div>)}</p>
        </div>

        <div className='d-flex flex-column justify-content-center align-items-center'>
          <div className=''>
                <p>Lastes Reviews</p>

                <div className='cm d-flex flex-column align-items-center justify-content-start' style={{maxWidth:'400px'}}>
                {reviews && reviews.length > 0 ? (
                reviews.map(rev => (
                  <div key={rev.id} className='d-flex align-items-center gap-3 justify-content-between' style={{borderBottom:'2px solid black'}}>
                    <div style={{ margin: '0', padding: '0', width: '200px' }}>
                      <ul style={{ listStyleType: 'none', padding: '0' }}>
                        <li><b>User Name</b></li>
                        <li style={{ fontSize: '10px' }}>{formatDate(rev.created)}</li>
                        <li>{rev.comment}</li>
                      </ul>
                    </div>
                    <div>
                      <RatingDisplay rate={rev.rate} />
                    </div>
                  </div>
                ))
              ) : (
                <p>No reviews available for {movie.title}.</p>
              )}
                 
                </div>
          </div>
        <button type="button" className="btn btn-outline-info my-2" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={isModalOpen? closeModal:openModal}>
          Rate this movie
        </button>
        {isModalOpen && (
          <div className="modal-overlay">
            <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable" style={{backgroundColor:'#7D7D7D',padding:'20px',borderRadius:'10px'}}>
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title px-5 py-2">Rate {movie.title}</h5>
                  <button type="button" className="btn-close" onClick={closeModal}></button>
                </div>
                <div className="modal-body">
                  <RatingForm movieId={id} onSubmit={closeModal}/>
                </div>
              </div>
            </div>
          </div>
        )}
        </div>
      </div> 

    </div>
  )
}

export default MovieDetails