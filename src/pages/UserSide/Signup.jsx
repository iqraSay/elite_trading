import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, firestore } from '../../Firebase';  // Import Firestore
import { doc, setDoc } from 'firebase/firestore';  // Import Firestore methods
import Header from '../../components/navbar.jsx';
import './LoginPage.css';

const Signup = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [mobile, setMobile] = useState('');
    const [email, setEmail] = useState('');
    const [errors, setErrors] = useState({ username: '', password: '', email: '', mobile: '' });
    const [successMessage, setSuccessMessage] = useState('');
    const [firebaseError, setFirebaseError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        let valid = true;
        const newErrors = { username: '', password: '', email: '', mobile: '' };

        const validateEmail = (email) => {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        };

        if (!username) {
            newErrors.username = 'Please enter a username';
            valid = false;
        }

        if (!email || !validateEmail(email)) {
            newErrors.email = 'Please enter a valid email address';
            valid = false;
        }

        if (!password || password.length < 8) {
            newErrors.password = 'Please enter a valid password';
            valid = false;
        }

        if (!mobile || mobile.length < 10) {
            newErrors.mobile = 'Please enter a valid mobile number';
            valid = false;
        }

        setErrors(newErrors);

        if (valid) {
            try {
                // Create user with Firebase Authentication
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                const user = userCredential.user;

                // Add user data to Firestore
                await setDoc(doc(firestore, 'users', user.uid), {
                    username: username,
                    email: email,
                    mobile: mobile
                });

                setSuccessMessage('Signup successful!');
                setTimeout(() => {
                    navigate('/login');
                }, 2000);
            } catch (error) {
                setFirebaseError(error.message);
            }
        }
    };

    return (
      <div className="min-h-screen flex flex-col ">
        <Header />
        <main className="flex-grow flex items-center justify-center p-4">
          <div className="w-full max-w-md mx-auto bg-gradient-to-t from-[#ffffff] to-yellow-300 rounded-lg shadow-lg p-6 fade-in">
            <h2 className="text-3xl font-bold text-[#2a0000] mb-6 text-center">Sign Up</h2>
            {successMessage && (
              <div className="text-green-600 mb-4">{successMessage}</div>
            )}
            {firebaseError && (
              <div className="text-red-600 mb-4">{firebaseError}</div>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  onFocus={(e) => e.target.classList.add('focus')}
                  onBlur={(e) => e.target.classList.remove('focus')}
                  className="w-full p-3 border rounded-lg border-gray-300 transition-all"
                />
                {errors.username && (
                  <div className="text-red-600 mt-1">{errors.username}</div>
                )}
              </div>
              <div className="relative">
                <input
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={(e) => e.target.classList.add('focus')}
                  onBlur={(e) => e.target.classList.remove('focus')}
                  className="w-full p-3 border rounded-lg border-gray-300 transition-all"
                />
                {errors.email && <div className="text-red-600 mt-1">{errors.email}</div>}
              </div>
              <div className="relative">
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={(e) => e.target.classList.add('focus')}
                  onBlur={(e) => e.target.classList.remove('focus')}
                  className="w-full p-3 border rounded-lg border-gray-300 transition-all"
                />
                {errors.password && (
                  <div className="text-red-600 mt-1">{errors.password}</div>
                )}
              </div>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Mobile Number"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  onFocus={(e) => e.target.classList.add('focus')}
                  onBlur={(e) => e.target.classList.remove('focus')}
                  className="w-full p-3 border rounded-lg border-gray-300 transition-all"
                />
                {errors.mobile && (
                  <div className="text-red-600 mt-1">{errors.mobile}</div>
                )}
              </div>
              <button
                type="submit"
                className="w-full bg-[#2a0000] text-white p-3 rounded-lg hover:bg-[#3a0000] transition-transform transform hover:scale-105 ripple-effect"
              >
                Sign Up
              </button>
              <div className="text-center">
                <Link to="/login" className="text-[#2a0000] hover:underline">Have an account? Login!</Link>
              </div>
            </form>
          </div>
        </main>
      </div>
    );
};

export default Signup;
