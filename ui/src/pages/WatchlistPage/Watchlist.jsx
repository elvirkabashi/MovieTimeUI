import { useEffect, useState } from "react"
import axios from 'axios';
import LoadingSpinner from "../../components/LoadingSpinner";
import MovieCard from "../../components/MovieCard";
import { getAuthToken } from "../../utils/Cookies";


function Watchlist() {

    const [watchlist,setWatchlist] = useState()
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const token = getAuthToken();
    const headers = {
      Authorization: `Bearer ${token}`,
    };
  
    useEffect(() => {
      axios.get(`http://localhost:7147/api/Watchlists`,{headers})
        .then(res => {
        setWatchlist(res.data);
          setLoading(false); 
        })
        .catch(err => {
          console.error('Error fetching watchlist movies:', err);
          setError('Error fetching watchlist movies!');
          setLoading(false); 
        });
    }, [watchlist]);

    if (loading) {
        return <LoadingSpinner/>;
    }
    
    if (error) {
        return <h3 className="text-danger text-center">{error}</h3>;
    }

  return (
  <div>
    <h1 className="text-white">Your Watchlist</h1>
    <div className="container d-flex gap-3 text-white py-5">
      {watchlist.length > 0 ? (
        watchlist.map((m) => (
          <MovieCard key={m.id} wlistId={m.id} movieId={m.movieId} title={m.title} photo={m.img}/>
        ))
      ) : (
        <h3 className="text-center">Your watchlist is empty.</h3>
      )}
    </div>
  </div>
  )
}

export default Watchlist