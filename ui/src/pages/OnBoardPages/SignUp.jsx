import { useState } from 'react';
import Ellipse from '../../components/Ellipse'
import axios from 'axios';
import Logo from '../../components/Logo'
import './assets/css/style.css'
function SingUp() {

    const [error,setError] = useState()


    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
      });
    
      const handleChange = (e) => {
        setFormData({
          ...formData,
          [e.target.name]: e.target.value,
        });
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
      
        const jsonData = {
          Name: formData.name,
          Email: formData.email,
          Password: formData.password
        };

      
          
          const response = await axios.post('http://localhost:7147/api/authentication/register', jsonData);
      
          if (!response.data.error) {
              window.location.href = '/login';
          } else {
              setError(response.data.errors);
              console.log(response.data.errors)
          }
          
        
      
        
      };

  return (
    <>
        <div className='container' style={{backgroundColor: '#212121'}}>

            <nav className='py-3'>
                <Logo/>
            </nav>
             <Ellipse top={100}/>
             <div className="desktop d-lg-flex justify-content-center align-items-center " style={{height: '100vh'}}>
           
           <div className='me-5 p-5' style={{borderRight: '2px solid #a63910',width:'35%'}}>
               <p className='text-white text-center py-2 fs-4'>Sign Up</p>
               <p className='text-danger'>{error}</p>
               <form onSubmit={handleSubmit}>
                    <div className="">
                        <label className="form-label text-white">Name</label>
                        <input
                            type='text'
                            className='form-control'
                            name='name'
                            value={formData.name}
                            onChange={handleChange}
                            placeholder='Your name'
                            required
                        />
                    </div>
                    <div className="">
                        <label className="form-label text-white">Email address</label>
                        <input
                            type='email'
                            className='form-control'
                            name='email'
                            value={formData.email}
                            onChange={handleChange}
                            placeholder='Your email'
                            required
                        />
                       </div>
                    <div className="mb-3">
                        <label className="form-label text-white">Password</label>
                        <input
                            type='password'
                            className='form-control '
                            name='password'
                            value={formData.password}
                            onChange={handleChange}
                            placeholder='Password'
                            required
                        />
                      </div>
                      {/* <div className="mb-3">
                        <label className="form-label text-white">Confirm Password</label>
                        <input
                            type='password'
                            className='form-control '
                            name='password'
                            placeholder='Confirm Password'
                            required
                        />
                      </div> */}
                   

                   <button type="submit" className="btn custom-btn-outline-primary">Sign Up</button>
               </form>
           </div>

           <div className=''>
                    <h3 className='text-white'>If you have an account
                        <br />
                        Log In!
                    </h3>
               <a href='/login' type="submit" className="btn custom-btn-outline-primary my-3">LogIn</a>
           </div>

       </div>

            {/*mobile */ }

            <div className="mobile justify-content-center align-items-center flex-column" style={{height: '100vh'}}>
           
           <div className='m-3 p-3' style={{borderBottom: '2px solid #a63910',minWidth:'300px'}}>
               <p className='text-white text-center py-2 fs-4'>Sign Up</p>
               <form>
                    <div className="">
                        <label className="form-label text-white">Name</label>
                        <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='Your name'/>
                    </div>
                    <div className="">
                        <label className="form-label text-white">Email address</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='Your email'/>
                    </div>
                    <div className="">
                        <label className="form-label text-white">Password</label>
                        <input type="password" className="form-control " id="exampleInputPassword1" placeholder="Password"/>
                    </div>
                    <div className="mb-3">
                        <label className="form-label text-white">Confitm Password</label>
                        <input type="password" className="form-control " id="exampleInputPassword1" placeholder="Confirm Password"/>
                    </div>

                   <button type="submit" className="btn custom-btn-outline-primary">Sign Up</button>
               </form>
           </div>

           <div className=''>
                    <h3 className='text-white'>If you have an account
                        <br />
                        Log In!
                    </h3>
               <a href='/login' type="submit" className="btn custom-btn-outline-primary my-3">LogIn</a>
           </div>

       </div>
            
        </div>
    </>
  )
}

export default SingUp