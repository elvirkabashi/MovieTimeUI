import { useEffect, useState } from "react";
import axios from 'axios';
import MovieCard from "../../components/MovieCard";
import LoadingSpinner from "../../components/LoadingSpinner";
import { Link } from 'react-scroll'
import './assets/css/scroll.css'
import arrow from '../../assets/img/rightArrow.svg'

function Home() {
  const [movies, setMovies] = useState();
  const [loading, setLoading] = useState(true);
  const [ratings, setRatings] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [scrollPositionYear, setScrollPositionYear] = useState();
  const [scrollPositionRate, setScrollPositionRate] = useState();

  //console.log('from home '+movies[1].img)
  useEffect(() => {
    let apiUrl = 'https://localhost:7147/api/Movies';
    if (searchQuery.trim() !== '') {
      apiUrl += `?query=${encodeURIComponent(searchQuery)}`;
    }

    axios.get(apiUrl)
      .then(res => {
        setMovies(res.data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });

      axios.get(`https://localhost:7147/api/Ratings/TopRatedMovies`)
        .then(res=>{
          setRatings(res.data)
      })

  }, [searchQuery,scrollPositionRate,scrollPositionYear]);


  const handleSearch = (e) => {
    e.preventDefault();
  };

  
  const handleScroll = (e, direction, section) => {
    const container = document.querySelector(`.scroll-container-${section}`);
    const scrollAmount = 300;
  
    if (direction === 'left') {
      container.scrollLeft -= scrollAmount;
    } else if (direction === 'right') {
      container.scrollLeft += scrollAmount;
    }
  
    e.preventDefault();
    e.stopPropagation();
  
    container.scrollTop = 0;
  
    if (section === 'year') {
      setScrollPositionYear(0, container.scrollLeft);
    } else if (section === 'rate') {
      setScrollPositionRate(0, container.scrollLeft);
    }
  };



  if (loading) {
    return <LoadingSpinner />;
  }

  if(movies == undefined){
    return <div className="text-danger text-center">No Movies Found</div>;
  }
  

  return (
    <>
 <form className="p-5" onSubmit={handleSearch}>
      <div className="input-group" style={{width:'300px',float:'right'}}>
        <input
          type="text"
          className="form-control"
          placeholder="Search movies.."
          name="searchInput"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <b className="btn btn-outline-secondary" type="submit">
        <i className="bi bi-search" style={{fontSize:'22px'}}></i>
        </b>
      </div>
    </form>

            {searchQuery == ''? ( 
              <div className="container-fluid px-5">

              <div className="a d-flex align-items-center mt-5">
                <h3 className="text-white">Lastes Movies</h3><i style={{fontSize:'30px'}} className="bi bi-chevron-right  mb-2"></i>
              </div>
              <p style={{color:'#E2E2E2'}}>The newest movies</p>
                  <div className="d-flex arrow" style={{ marginLeft: '-60px', padding: '0px' }}>
                    <div className="left-icon d-flex align-items-center">
                      <Link
                        to="scroll-container-rate"
                        spy={true}
                        smooth={true}
                        offset={-50}
                        duration={500}
                      >
                        <img
                          src={arrow}
                          width={50}
                          height={50}
                          className="arrow-icon"
                          onClick={(e) => handleScroll(e,'left', 'rate')}
                        />
                      </Link>
                    </div>
                    <div className="scroll d-flex gap-3 scroll-container-rate" onScroll={(e) => setScrollPositionRate(e.target.scrollLeft)}>
                    {movies &&
                      movies
                        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
                        .map((movie) => (
                          <MovieCard
                            key={movie.movieId}
                            movieId={movie.movieId}
                            title={movie.title}
                            publishedYear={movie.publishedYear}
                            photo={movie.img}
                          />
                        ))}
                    </div>
                    <div className="right-icon d-flex align-items-center">
                      <Link
                        to="scroll-container-rate"
                        spy={true}
                        smooth={true}
                        offset={50}
                        duration={500}
                      >
                        <img
                          src={arrow}
                          width={50}
                          height={50}
                          className="arrow-icon"
                          onClick={(e) => handleScroll(e,'right', 'rate')}
                        />
                      </Link>
                    </div>
                  </div>

                  <div className="a d-flex align-items-center mt-5">
                    <h3 className="text-white">Trending Movies</h3><i style={{fontSize:'30px'}} className="bi bi-chevron-right  mb-2"></i>
                  </div>
                  <p style={{color:'#E2E2E2'}}>Movies with the highest Rate number</p>
                  <div className="d-flex arrow" style={{ marginLeft: '-60px', padding: '0px' }}>
                    <div className="left-icon d-flex align-items-center">
                      <Link
                        to="scroll-container-year"
                        spy={true}
                        smooth={true}
                        offset={-50}
                        duration={500}
                      >
                        <img
                          src={arrow}
                          width={50}
                          height={50}
                          className="arrow-icon"
                          onClick={(e) => handleScroll(e,'left', 'year')}
                        />
                      </Link>
                    </div>
                    <div className="scroll d-flex gap-3 scroll-container-year" onScroll={(e) => setScrollPositionYear(e.target.scrollLeft)}>
                      {movies &&
                        movies
                          .filter((movie) => ratings.some((rating) => rating.movieId === movie.movieId))
                          .map((movie) => (
                            <MovieCard
                              key={movie.movieId}
                              movieId={movie.movieId}
                              title={movie.title}
                              publishedYear={movie.publishedYear}
                              photo={movie.img}
                            />
                          ))}
                    </div>
                    <div className="right-icon d-flex align-items-center">
                      <Link
                        to="scroll-container-year"
                        spy={true}
                        smooth={true}
                        offset={50}
                        duration={500}
                      >
                        <img
                          src={arrow}
                          width={50}
                          height={50}
                          className="arrow-icon"
                          onClick={(e) => handleScroll(e,'right', 'year')}
                        />
                      </Link>
                    </div>
                  </div>

                  <div className="a d-flex align-items-center mt-5">
                    <h3 className="text-white">Movies by Year</h3><i style={{fontSize:'30px'}} className="bi bi-chevron-right  mb-2"></i>
                  </div>
                  <p style={{color:'#E2E2E2'}}>Movies before 2000</p>
                  <div className="d-flex arrow" style={{ marginLeft: '-60px', padding: '0px' }}>
                    <div className="left-icon d-flex align-items-center">
                      <Link
                        to="scroll-container-year"
                        spy={true}
                        smooth={true}
                        offset={-50}
                        duration={500}
                      >
                        <img
                          src={arrow}
                          width={50}
                          height={50}
                          className="arrow-icon"
                          onClick={(e) => handleScroll(e,'left', 'year')}
                        />
                      </Link>
                    </div>
                    <div className="scroll d-flex gap-3 scroll-container-year" onScroll={(e) => setScrollPositionYear(e.target.scrollLeft)}>
                      {movies &&
                        movies
                          .filter((movie) => movie.publishedYear < 2000)
                          .map((movie) => (
                            <MovieCard
                              key={movie.movieId}
                              movieId={movie.movieId}
                              title={movie.title}
                              publishedYear={movie.publishedYear}
                              photo={movie.img}
                            />
                          ))}
                    </div>
                    <div className="right-icon d-flex align-items-center">
                      <Link
                        to="scroll-container-year"
                        spy={true}
                        smooth={true}
                        offset={50}
                        duration={500}
                      >
                        <img
                          src={arrow}
                          width={50}
                          height={50}
                          className="arrow-icon"
                          onClick={(e) => handleScroll(e,'right', 'year')}
                        />
                      </Link>
                    </div>
                  </div>

                </div>
      ):(
        <div className="container d-flex flex-wrap gap-3 py-5">
          {movies && movies.map(movie => (
            <MovieCard key={movie.movieId}
              movieId={movie.movieId}
              title={movie.title}
              publishedYear={movie.publishedYear}
              photo={movie.img} />
          ))}
        </div>
      )}
        
    </>
  );
}

export default Home;
