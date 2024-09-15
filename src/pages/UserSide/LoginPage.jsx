import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { auth, firestore } from '../../Firebase';
import Header from '../../components/navbar.jsx';
import './LoginPage.css';

const LoginPage = () => {
  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ usernameOrEmail: '', password: '' });
  const [successMessage, setSuccessMessage] = useState('');
  const [firebaseError, setFirebaseError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    let valid = true;
    const newErrors = { usernameOrEmail: '', password: '' };
    let email = '';

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!usernameOrEmail) {
      newErrors.usernameOrEmail = 'Please enter a valid username or email';
      valid = false;
    } else if (emailRegex.test(usernameOrEmail)) {
      email = usernameOrEmail;
    } else {
      try {
        const q = query(collection(firestore, 'users'), where('username', '==', usernameOrEmail));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          email = querySnapshot.docs[0].data().email;
        } else {
          newErrors.usernameOrEmail = 'Username not found';
          valid = false;
        }
      } catch (error) {
        setFirebaseError('Error fetching user data');
        valid = false;
      }
    }

    if (!password || password.length < 8) {
      newErrors.password = 'Please enter a valid password';
      valid = false;
    }

    setErrors(newErrors);

    if (valid && email) {
      // Use Firebase authentication
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Successful login
          setSuccessMessage('Login successful!');
          setTimeout(() => {
            navigate('/'); 
          }, 2000);
        })
        .catch((error) => {
          // Handle login error
          if (error.code === 'auth/wrong-password') {
            setFirebaseError('Incorrect password. Please try again.');
          } else if (error.code === 'auth/user-not-found') {
            setFirebaseError('No user found with this email.');
          } else {
            setFirebaseError('Error logging in. Please try again.');
          }
        });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow flex items-center justify-center p-4">
        <div className="w-full max-w-md mx-auto bg-gradient-to-t from-[#ffffff] to-yellow-300 rounded-lg shadow-lg p-6 fade-in">
          <h2 className="text-3xl font-bold text-[#2a0000] mb-6 text-center">Login</h2>
          {firebaseError || successMessage ? (
            <div className={`mb-4 ${firebaseError ? 'text-red-600' : 'text-green-600'}`}>
              {firebaseError || successMessage}
            </div>
          ) : null}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Username or Email"
                value={usernameOrEmail}
                onChange={(e) => setUsernameOrEmail(e.target.value)}
                className="w-full p-3 border rounded-lg border-gray-300 transition-all"
              />
              {errors.usernameOrEmail && <div className="text-red-600 mt-1">{errors.usernameOrEmail}</div>}
            </div>
            <div className="relative">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 border rounded-lg border-gray-300 transition-all"
              />
              {errors.password && <div className="text-red-600 mt-1">{errors.password}</div>}
            </div>
            <button
              type="submit"
              className="w-full bg-[#2a0000] text-white p-3 rounded-lg hover:bg-[#3a0000] transition-transform transform hover:scale-105"
            >
              Login
            </button>
            <div className="flex justify-between mt-2">
              <Link to="/forgotpassword" className="text-[#2a0000] hover:underline">Forgot your password?</Link>
              <Link to="/signup" className="text-[#2a0000] hover:underline">New here? Sign up!</Link>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default LoginPage;
