import { useState } from 'react';
import './../assets/css/nav.css'
import PropTypes from 'prop-types'; 
import Logo from './Logo';

function Navbar({ updateMainMargin }) {
    const [sideNavWidth, setSideNavWidth] = useState(0);
    const [mainMargin, setMainMargin] = useState(0);
  
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
  
    return (
      <>
        <div id="mySidenav" className="sidenav" style={{ width: sideNavWidth}}>
          <a href="javascript:void(0)" className="closebtn" onClick={closeNav}>
            &times;
          </a>
          <a  href="/">About</a>
          <a href="/">Services</a>
          <a href="/">Clients</a>
          <a href="/">Contact</a>
        </div>
  
        <div className='d-flex align-items-center' style={{backgroundColor: '#A73911'}}>
          <span onClick={openNav} className='text-white'><h1 className="bi bi-list"></h1></span>
          
          <div id='main' style={{marginLeft: mainMargin}} className='d-flex align-items-center gap-3'>
            <Logo/>
            <a href="" className='text-white'>Movies</a>
            <a href="" className='text-white'>Genres</a>
          </div>
        </div>
      
      </>
  )
}

Navbar.propTypes = {
  updateMainMargin: PropTypes.func.isRequired,
};

export default Navbar