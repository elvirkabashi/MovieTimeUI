import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css'
import LogIn from './pages/OnBoardPages/LogIn'
import SingUp from './pages/OnBoardPages/SignUp';


function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LogIn />}/>
        <Route path="/signup" element={<SingUp />}/>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
