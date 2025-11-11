import { useRef, useState } from 'react';
import Header from './Header'
import './Login.css'
import { validateData } from '../utils/Validate';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import {auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  const email = useRef(null);
  const password = useRef(null);
  const fullName = useRef(null);

  const navigate = useNavigate();

  const handleSubmit = () => {
    const { isValid, message } = validateData(email.current.value, password.current.value);
    if (!isValid) {
      setErrorMessage(message);
    } else {
      if (!isSignInForm) {
        // Sign Up API
        createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
          .then((userCredential) => {
            // Signed up 
            const user = userCredential.user;
            console.log("User Signed Up : ", user);
            updateProfile(user, { displayName: fullName.current.value }).then(() => {
              // Profile updated!
              console.log("Profile Updated");
              navigate('/browse');
            }).catch((error) => {
              console.log("Error Updating Profile : ", error);
              setErrorMessage(error.message);
            });
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log("Error Signing Up : ", errorMessage);
            setErrorMessage(errorMessage);
            // ..
          });
      } else {
        // Sign IN API
        signInWithEmailAndPassword(auth, email.current.value, password.current.value)
          .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            console.log("User Signed In : ", user);
            navigate('/browse');
            // ...
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log("Error Signing In : ", errorMessage);
            setErrorMessage(errorMessage);
            // ..
          });
        
      }
    }
  }

  return (
    <div className="login-container">
      <Header />
      <form onSubmit={(e)=> e.preventDefault()} className="login-form">
        <h1>{isSignInForm ? 'Sign In' : 'Sign Up'}</h1>
        {!isSignInForm && (
          <input ref={fullName} type="text" placeholder="Full Name" className='login-input' required />
        )}
        <input ref={email} type="email" placeholder="Email or Phone number" className='login-input' required />
        <input ref={password} type="password" placeholder="Password" className='login-input' required />
        <p className="error-message">{errorMessage}</p>
        <button onClick={handleSubmit} type="submit" className='login-button'>{isSignInForm ? 'Sign In' : 'Sign Up'}</button>
        <p>{isSignInForm ? 'New to Netflix? ' : 'Already have an account? '}<span style={{ color: '#e50914', cursor: 'pointer' }} onClick={() => setIsSignInForm(!isSignInForm)}>{isSignInForm ? 'Sign Up' : 'Sign In'}</span></p>
      </form>
    </div>
  )
}

export default Login