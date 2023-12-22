import Logo from "../../components/Logo"
import '../OnBoardPages/assets/css/style.css'

function HeroSection(){
    return(
<div className='hero-section'>
      <div className='navbarOnboarding'>
        <Logo/>

        <div className='buttons'>
          <a href="/login"><button className='loginButton'>
            Log in
          </button></a>

          <a href="/signup"><button className='signUpButton'>
            Sign up
          </button></a>
        </div>
      </div>

      <div className='hero-text'>
        <h1>Welcome to <br></br>Movie<span style={{color:'#A82F02'}}>Time</span></h1>
      </div>
      


  
     </div>

     

    )
    

  
}
export default HeroSection