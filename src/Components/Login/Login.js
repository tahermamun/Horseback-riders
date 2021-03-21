import React, { useContext, useState } from 'react';
import Header from '../Header/Header';
import './Login.css'
import { useHistory, useLocation } from 'react-router';
import { UserContext } from '../../App';
import { GoogleSignInFunc, createUserWithEmailAndPassword, initializeLoginFireBaseFrameWork, signInWithEmailAndPassword } from './LoginManager';



const Login = () => {
    // firebase framework function call from login manager
    initializeLoginFireBaseFrameWork()
    // This useState use type of user new or old
    const [user, setUser] = useState(false)
    // This State for User
    const [newUser, setNewUser] = useState({
        isSignIn: false,
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        isPasswordMatched: '',
        error: '',
        success: ''
    })
    // Get Signed User Details by UserContext
    const [signedInUser, setSignedInUser] = useContext(UserContext)
    const history = useHistory()
    const location = useLocation()
    let { from } = location.state || { from: { pathname: '/' } }
    // handleInputBlur function use for form input
    const handleInputBlur = (e) => {
        let isLoginFormValid = true

        if (e.target.name === 'email') {
            isLoginFormValid = /\S+@\S+\.\S+/.test(e.target.value);
        }
        if (e.target.name === 'password') {
            const isPasswordValid = e.target.value.length > 6;
            isLoginFormValid = isPasswordValid
        }
        if (isLoginFormValid) {
            const updateUserInfo = { ...newUser };
            updateUserInfo[e.target.name] = e.target.value
            setNewUser(updateUserInfo)
        }

    }
    // handleSubmit function use for from Submit
    const handleSubmit = (e) => {
        if (user & newUser.password === newUser.confirmPassword && newUser.email) {
            createUserWithEmailAndPassword(newUser.email, newUser.password, newUser.name)
                .then(res => {
                    setNewUser(res)
                })
        }
        if (!user && newUser.password && newUser.email) {
            signInWithEmailAndPassword(newUser.email, newUser.password)
                .then(res => {
                    setNewUser(res)
                    setSignedInUser(res)
                    history.replace(from)
                })
        }
        if (newUser.password !== newUser.confirmPassword && newUser.email) {
            const updateUserInfo = { ...newUser };
            updateUserInfo.isPasswordMatched = 'Password is not matched'
            setNewUser(updateUserInfo)
        }

        e.target.reset();
        e.preventDefault()

    }
    // Google Sign In function
    const handleGoogleSignIn = () => {
        GoogleSignInFunc()
            .then(res => {
                setNewUser(res)
                setSignedInUser(res)
                history.replace(from)
            })
    }
    // handleToggleSignInUP Function use for toggle logged user or create an user
    const handleToggleSignInUP = () => {
        setNewUser({
            success: '',
            error: ''
        })
        setUser(!user)
    }

    return (
        <>
            <Header></Header>
            <div className='container'>
                <div className="row justify-content-center mb-5">
                    <div className="login-card ">

                        <form onSubmit={handleSubmit} className="text-center">
                            {
                                user ? <h2>Create an account</h2> : <h2>Login</h2>
                            }
                            {
                                user && <div className="form-group">
                                    <input className='myInput' onBlur={handleInputBlur} name='name' type="text" placeholder="Name" required />
                                </div>
                            }
                            <div className="form-group">
                                <input className='myInput' onBlur={handleInputBlur} name='email' type="email" placeholder="Username or Email" required />
                            </div>
                            <div className="form-group">
                                <input className='myInput' onBlur={handleInputBlur} name='password' type="password" placeholder="Password" required />
                            </div>
                            {
                                user && <div className="form-group">
                                    <input className='myInput' onBlur={handleInputBlur} name='confirmPassword' type="password" placeholder="Confirm Password" required />
                                    <p style={{ color: 'red' }}>{newUser.isPasswordMatched}</p>
                                </div>
                            }
                            <input type="submit" className='login-btn' value={user ? 'Create an account' : 'Login'} />

                            <p style={{ color: 'red' }} >{newUser.error}</p>
                            <p style={{ color: 'green' }} >{newUser.success}</p>

                            <p>{user ? 'Already have an account? ' : 'Don\'t have an account? '}<a onClick={handleToggleSignInUP} href="#">{user ? 'Login' : 'Create an account'}</a></p>
                        </form>
                    </div>
                    <div class="or-container col-4">
                        <div class="line-separator"></div>
                        <div class="or-label">or</div>
                        <div class="line-separator"></div>
                    </div>
                    {
                        <button className='google-btn' onClick={handleGoogleSignIn}>
                            <img className='google-btn-img' src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="" />
                                Continue with Google</button>
                    }

                </div>


            </div>

        </>
    );
};

export default Login;