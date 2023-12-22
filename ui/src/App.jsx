import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css'
import OnBoard from './pages/OnBoardPages/OnBoard'
import LogIn from './pages/OnBoardPages/LogIn'
import SignUp from './pages/OnBoardPages/SignUp'

function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<OnBoard />}></Route>
      <Route path="/login" element={<LogIn />}></Route>
      <Route path="/singup" element={<SignUp />}></Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App
