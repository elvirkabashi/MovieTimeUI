import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import LoadingSpinner from './LoadingSpinner';
import '../assets/css/modal.css'

import noimage from '../assets/img/movietime.jpg'
import noprofile from '../assets/img/noprofilepicture.jpg'

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
    const [countComments,setCountComment] = useState()
  
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

        axios.get(`https://localhost:7147/api/Ratings/CountByMovieId/${id}`)
        .then(res=>{
          setCountComment(res.data)
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

    useEffect(() => {
      const hideAlerts = setTimeout(() => {
        setShowSuccessAlert(false);
        setShowWarningAlert(false);
      }, 2000);
    
      return () => clearTimeout(hideAlerts);
    }, [showSuccessAlert, showWarningAlert]);

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

    

      function formatDate(dateString) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
      }

  return (
    <div className="text-white">


      <div className='d-flex py-5'
        style={{
          paddingLeft:'120px',
          width: '100%',
          height: '450px',
          background: `
            linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.8)) top,
            linear-gradient(90deg, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0)) left,
            linear-gradient(90deg, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.8)) right,
            url(${noimage}) center/cover no-repeat
          `,
        }}>
          
        {//!Photo section and triler button
        }
        <div className='d-flex flex-column align-items-center'>
          <div style={{ }}>
            <img src={noimage} alt="" style={{maxWidth:'220px',height:'250px',borderRadius:'10px'}} />
          </div>
          <div style={{width:'100%'}}>
            <button style={{width:'100%',border:'none'}} className='btn'>
              <i style={{fontSize:'25px'}} className="bi bi-play-circle text-warning px-2"></i>
              PLAY TRAILER
              </button>
          </div>
        </div>


        {//!Title, Rate , Genre and Description section
        }
        <div className='ms-5' style={{width:'43%'}}>
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

          <p>{movie.genre}</p>

          <p>{movie.description}</p>
        </div>


        {//!Watchlist and Favorite button section
        }
        <div className='d-flex flex-column align-items-center ms-5 gap-3 my-5'>
          <div className='d-flex flex-column justify-contenc-center align-items-center py-2' style={{ width:'250px',borderRadius:'8px',backgroundColor:'#000000' }}>
            <h1 style={{fontSize:'27px'}}>{movie.publishedYear}</h1>
            <p>Published Year</p>
          </div>
          <div className='d-flex flex-column justify-contenc-center align-items-center py-2' style={{ width:'250px',borderRadius:'8px',backgroundColor:'#000000' }}>
            <h1 style={{fontSize:'27px'}}>{countComments}</h1>
            <p>comments</p>
            {showSuccessAlert && (
                <small onClick={() => setShowSuccessAlert(false)} className='text-success'>Successfully added to watchlist</small>
            )}
            {showWarningAlert && (
              <small onClick={() => setShowSuccessAlert(false)} className='text-danger'>{movie.title} has in watchlist</small>
            )}
            

          </div>
          <div style={{width:'100%'}} className='d-flex flex-column gap-2'>
            <button className='btn btn-outline-warning d-flex align-items-center justify-content-center' onClick={addToWatchlist}>
              <div className='mb-1'><i style={{fontSize:'25px'}} className="bi bi-plus"></i></div>
              <div>Add to Watchlist</div>
            </button>
          </div>
        </div>

      </div>

     {//!Actors show
     }
     <div className='container my-5'>
      <h2>Actors</h2>
        <div className='actors d-flex gap-3'>
        {movie.actors.map(a => 
          <div key={a} className='d-flex flex-column justify-content-center align-items-center'>
            <img src={noprofile} width={120} height={150} style={{borderRadius:'5px'}}/>
            <p>{a}</p>
          </div>  
        )} 
        </div>
     </div>

     {//!Reviews
     }
     <div className='container'>
     <div>
        <p>Lastest Reviews</p>

        <div className='cm d-flex flex-column align-items-center justify-content-start' style={{ maxWidth: '70%', padding: '0 10px' }}>
          {reviews && reviews.length > 0 ? (
            reviews.map(rev => (
              <div key={rev.id} className='d-flex flex-column align-items-start justify-content-between' style={{ borderBottom: '2px solid black', width: '100%' }}>
                  <div className='w-100 d-flex justify-content-between'>
                    <div className='px-2 py-2' style={{ width: '70%' }}>
                      <ul style={{ listStyleType: 'none', padding: '0', margin: '0' }}>
                        <li style={{ fontWeight: 'bold' }}>User Name</li>
                        <li style={{ fontSize: '10px' }}>{formatDate(rev.created)}</li>
                        <li>{rev.comment}</li>
                      </ul>
                    </div>
                    <div style={{marginLeft:'auto' }}>
                      <RatingDisplay rate={rev.rate} />
                    </div>
                  </div>
              </div>
            ))
          ) : (
            <p>No reviews available for {movie.title}.</p>
          )}
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