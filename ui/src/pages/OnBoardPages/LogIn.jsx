import Ellipse from '../../components/Ellipse'
import Logo from '../../components/Logo'
import './assets/css/style.css'
function LogIn() {

  return (
    <>
        <div className='container' style={{backgroundColor: '#212121'}}>

            <nav className='py-3'>
                <Logo/>
            </nav>
             <Ellipse top={100}/>
            <div className="desktop d-lg-flex justify-content-center align-items-center " style={{height: '100vh'}}>
           
                <div className='me-5 p-5' style={{borderRight: '2px solid #a63910',width:'35%'}}>
                    <p className='text-white py-2 fs-4'>Log in to your account</p>
                    <form>
                        <div className="">
                            <label className="form-label text-white">Email address</label>
                            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='Your email'/>
                        </div>
                        <div className="">
                            <label className="form-label text-white">Password</label>
                            <input type="password" className="form-control " id="exampleInputPassword1" placeholder="Password"/>
                        </div>
                        <div className="mb-3 form-check">
                            <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
                            <label className="form-check-label text-white">Remember me</label>
                        </div>
                        <button type="submit" className="btn custom-btn-outline-primary">LogIn</button>
                    </form>
                </div>

                <div className='ms-5'>
                    <h3 className='text-white'>Dont have an account ?
                        <br />
                        Create one.
                    </h3>
                    <p className='text-white'>Create an account and start your journey !</p>
                    <a href='/signup' className='btn custom-btn-outline-primary'>Sign up</a>
                </div>

            </div>

            {/* Mobile */}
            <div className="mobile justify-content-center align-items-center flex-column" style={{height: '100vh'}}>
           
           <div className='m-3 p-3' style={{borderBottom: '2px solid #a63910',minWidth:'300px'}}>
               <p className='text-white py-2 fs-4'>Log in to your account</p>
               <form>
                   <div className="">
                       <label className="form-label text-white">Email address</label>
                       <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='Your email'/>
                   </div>
                   <div className="">
                       <label className="form-label text-white">Password</label>
                       <input type="password" className="form-control " id="exampleInputPassword1" placeholder="Password"/>
                   </div>
                   <div className="mb-3 form-check">
                       <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
                       <label className="form-check-label text-white">Remember me</label>
                   </div>
                   <button type="submit" className="btn custom-btn-outline-primary">LogIn</button>
               </form>
           </div>

           <div className=''>
               <h3 className='text-white'>Dont have an account ?
                   <br />
                   Create one.
               </h3>
               <p className='text-white'>Create an account and start your journey !</p>
               <a href='/signup' className='btn custom-btn-outline-primary'>Sign up</a>
           </div>

       </div>
            
        </div>
    </>
  )
}

export default LogIn