import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import { getAuthToken } from '../utils/Cookies';
import MovieCard from './MovieCard';
export default function MovieByGenre() {

    const {genre} = useParams()
    const [movies,setMovies] = useState()
    const token = getAuthToken();
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    useEffect(()=>{
        axios.get(`http://localhost:7147/api/Movies/?query=${genre}`,{headers})
        .then(res=>{
          setMovies(res.data)
      })
    },[])

  return (
    <>
    <h2 className='container text-white'>{genre} movies</h2>
    <div className="container d-flex flex-wrap gap-3 py-5">
    {movies && movies.map(movie => (
      <MovieCard key={movie.movieId}
        movieId={movie.movieId}
        title={movie.title}
        publishedYear={movie.publishedYear}
        photo={movie.img} />
    ))}
  </div></>
  )
}