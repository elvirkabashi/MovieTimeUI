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
    {!isAuthenticated ? 
          <Routes> 
            <Route path="/" element={<OnBoard />}></Route>
            <Route path="/login" element={<LogIn />}></Route>
            <Route path="/signup" element={<SignUp />}></Route>
          </Routes>
          :
          <>
          <Navbar updateMainMargin={updateMainMargin} />
          <div id="main" style={{marginLeft: mainMargin}}>
          <Routes>
            <Route path='/' element={<Home/>}></Route>
            <Route path='/movie/id/:id' element={<MovieDetails/>}></Route>
            <Route path='/watchlist' element={<Watchlist/>}></Route>
            <Route path='/favorite' element={<Favorite/>}></Route>
          </Routes>
          </div>
          </>

    }
    
    <Footer/>
    </BrowserRouter>
   
  )
}

export default App
