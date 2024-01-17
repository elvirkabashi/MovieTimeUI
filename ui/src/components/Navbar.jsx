import { useEffect, useState } from 'react';
import './../assets/css/nav.css'
import PropTypes from 'prop-types'; 
import Logo from './Logo';
import Cookies from 'js-cookie';
import { getUserInfo } from '../utils/Cookies';

function Navbar({ updateMainMargin }) {
    const [sideNavWidth, setSideNavWidth] = useState(0);
    const [mainMargin, setMainMargin] = useState(0);
    const [userInfo, setUserInfo] = useState(null);
  

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
  
        <div className='d-flex align-items-center justify-content-between px-5' style={{backgroundColor: ''}}>
          
          <div id='main' className='d-flex align-items-center gap-4' style={{ marginLeft: mainMargin }}>
            <span onClick={openNav} className='text-white'><h1 className="bi bi-list"></h1></span>
              <Logo />
              <a href="" className='text-white mt-4 ms-4'>Movies</a>
              <a href="" className='text-white mt-4'>Genres</a>
          </div>
          <div className='d-flex align-items-center'>
            {userInfo && <div className='text-white'><i className="bi bi-person-circle me-1" style={{fontSize:'22px'}}></i>{userInfo.userName}</div>}
          </div>
          

          
        </div>
      
      </>
  )
}

Navbar.propTypes = {
  updateMainMargin: PropTypes.func.isRequired,
};

export default Navbar