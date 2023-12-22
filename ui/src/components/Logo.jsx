
import '../pages/OnBoardPages/assets/css/style.css'

import logoimg from '../pages/OnBoardPages/assets/img/logo.png'
function Logo(){
return(
    <div>
        <a href='/'><img className='logoimg' src={logoimg} alt='logo'></img></a>
    </div>
)
}

export default Logo