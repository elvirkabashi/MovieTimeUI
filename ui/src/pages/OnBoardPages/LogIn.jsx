import { useState, useEffect } from 'react';
import Ellipse from '../../components/Ellipse'
import Logo from '../../components/Logo'
import Cookies from 'js-cookie';
import axios from 'axios';
import './assets/css/style.css'

function LogIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState();
    const [successMessage, setSuccessMessage] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:7147/api/authentication/login', {
                Email: email,
                Password: password,
            });
            Cookies.set('authToken', response.data.token, { expires: 7 });
            window.location.href = '/';
        } catch (error) {
            if (error.response && error.response.data) {
                const { errors } = error.response.data;
                setError(errors);
            } else {
                console.error('Login failed. An unexpected error occurred:', error.message);
            }
        }
    };

    useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search);
        if (queryParams.get('registered') === 'success') {
            setSuccessMessage('You have been registered successfully!');
        }
    }, []);

    return (
        <>
            <div className='container' style={{ backgroundColor: '#212121' }}>

                <nav className='py-3'>
                    <Logo />
                </nav>
                <Ellipse top={100} />
                <div className="desktop d-lg-flex justify-content-center align-items-center " style={{ height: '100vh' }}>

                    <div className='me-5 p-5' style={{ borderRight: '2px solid #a63910', width: '35%' }}>
                        {successMessage && <p className="text-success" >
                            {successMessage}
                        </p>}
                        <p className='text-white py-2 fs-4'>Log in to your account</p>
                        <p className='text-danger'>{error}</p>
                        <form onSubmit={handleLogin}>
                            <div className="">
                                <label className="form-label text-white">Email</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder='Enter your email' required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="">
                                <label className="form-label text-white">Password</label>
                                <input
                                    type="password"
                                    className="form-control "
                                    id="exampleInputPassword1"
                                    placeholder='Enter password' required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <div className="mb-3 form-check">
                                <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                                <label className="form-check-label text-white">Remember me</label>
                            </div>
                            <button type="submit" className="btn custom-btn-outline-primary">
                                LogIn
                            </button>
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
                <div className="mobile justify-content-center align-items-center flex-column" style={{ height: '100vh' }}>

                    <div className='m-3 p-3' style={{ borderBottom: '2px solid #a63910', minWidth: '300px' }}>
                        <p className='text-white py-2 fs-4'>Log in to your account</p>
                        <form>
                            <div className="">
                                <label className="form-label text-white">Email address</label>
                                <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='Enter your email' required />
                            </div>
                            <div className="">
                                <label className="form-label text-white">Password</label>
                                <input type="password" className="form-control " id="exampleInputPassword1" placeholder="Enter password" required />
                            </div>
                            <div className="mb-3 form-check">
                                <input type="checkbox" className="form-check-input" id="exampleCheck1" />
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

export default LogIn;
