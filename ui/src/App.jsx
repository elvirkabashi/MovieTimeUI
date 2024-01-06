import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css'
import OnBoard from './pages/OnBoardPages/OnBoard'
import LogIn from './pages/OnBoardPages/LogIn'
import SignUp from './pages/OnBoardPages/SignUp'
import Home from './pages/HomePage/Home';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { useState } from 'react';
import MovieDetails from './components/MovieDetails';
import Watchlist from './pages/WatchlistPage/Watchlist';
import Favorite from './pages/FavoritePage/Favorite';

function App() {

  const [mainMargin, setMainMargin] = useState(0);
  const [isAuthenticated] = useState(true)//Test true for isLogeddin and false for logout

  const updateMainMargin = (margin) => {
    setMainMargin(margin);
  };

  return (
    <BrowserRouter>
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            {!isAuthenticated ? (
              <Routes>
                <Route path="/" element={<OnBoard />} />
                <Route path="/login" element={<LogIn />} />
                <Route path="/signup" element={<SignUp />} />
              </Routes>
            ) : (
              <>
                <Navbar updateMainMargin={updateMainMargin} />
                <div id="main" style={{ marginLeft: mainMargin, flexGrow: 1 }}>
                  <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/movie/id/:id' element={<MovieDetails />} />
                    <Route path='/watchlist' element={<Watchlist />} />
                    <Route path='/favorite' element={<Favorite />} />
                  </Routes>
                </div>
              </>
            )}
            <Footer />
          </div>
    </BrowserRouter>
    
  )
}

export default App
