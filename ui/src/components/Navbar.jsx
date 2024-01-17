import { useEffect, useState } from 'react';
import './../assets/css/nav.css'
import PropTypes from 'prop-types'; 
import Logo from './Logo';
import axios from 'axios';
import Cookies from 'js-cookie';
import { getAuthToken, getUserInfo } from '../utils/Cookies';

function Navbar({ updateMainMargin }) {
    const [sideNavWidth, setSideNavWidth] = useState(0);
    const [mainMargin, setMainMargin] = useState(0);
    const [userInfo, setUserInfo] = useState(null);
    const [genres,setGenres] = useState()
    const token = getAuthToken();
          const headers = {
            Authorization: `Bearer ${token}`,
          };

    useEffect(() =>{
        axios.get(`http://localhost:7147/api/genres`, { headers })
      .then(res => setGenres(res.data))
    },[genres])
  

    const openNav = () => {
      setSideNavWidth(250);
      setMainMargin(250);

      updateMainMargin(250); 
    };
  
    const closeNav = () => {
      setSideNavWidth(0);
      setMainMargin(0);

      updateMainMargin(0); 
    };

    const handleClickLogout = () => {
      Cookies.remove('authToken');
      window.location.href = '/';
    };

    useEffect(() => {
      const fetchUserInfo = async () => {
        const user = await getUserInfo();
        setUserInfo(user);
      };
  
      fetchUserInfo();
    }, []);
  
    return (
      <>
        <div id="mySidenav" className="sidenav" style={{ width: sideNavWidth}}>
          <a href="javascript:void(0)" className="closebtn" onClick={closeNav}>
            &times;
          </a>
          <a  href="/">Home</a>
          <a href="/watchlist">Watchlist</a>
          <a href="/favorite">Favorites</a>
          <a className='mt-5' href="/" onClick={handleClickLogout}>
          Logout
          </a>
        </div>
  
        <div className='d-flex align-items-center justify-content-between px-5' style={{backgroundColor: 'black'}}>
          
          <div id='main' className='d-flex align-items-center gap-4' style={{ marginLeft: mainMargin }}>
          <span onClick={sideNavWidth === 0 ? openNav : closeNav} className='text-white'><h1 className="bi bi-list"></h1></span>
              <Logo />
              <a href="/" className='text-white ms-4'>Movies</a>
              <div className="btn-group">
              <button className="btn border-none text-white dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                Genres
              </button>
              <ul className="dropdown-menu " style={{width:'210px',backgroundColor:'black'}}>
                <div className='d-flex flex-wrap gap-3 px-2'>
                  {genres && genres.map(g => (
                    <a href={`/byGenre/${g.genreName}`} key={g.genreId} className='text-white'>{g.genreName}</a>
                  ))}
                  
                </div>
              </ul>
            </div>
          </div>
          <a href='/UserProfile' className='d-flex align-items-center'>
            {userInfo && <div className='text-white'><i className="bi bi-person-circle me-1" style={{fontSize:'22px'}}></i>{userInfo.userName}</div>}
          </a>
          

          
        </div>
      
      </>
  )
}

Navbar.propTypes = {
  updateMainMargin: PropTypes.func.isRequired,
};

export default Navbar