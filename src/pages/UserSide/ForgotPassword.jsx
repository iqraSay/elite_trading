import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/navbar.jsx';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../Firebase.js';
import './LoginPage.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({ email: '' });
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = { email: '' };
    let valid = true;

    if (!email) {
      newErrors.email = 'Please enter a valid email';
      valid = false;
    } else if (email.indexOf('@') === -1) {
      newErrors.email = 'Please enter a valid email';
      valid = false;
    }

    setErrors(newErrors);

    if (valid) {
      try {
        await sendPasswordResetEmail(auth, email);
        setSuccessMessage('Password reset email sent. Please check your inbox.');
      } catch (error) {
        if (error.code === 'auth/user-not-found') {
          setErrors({ email: 'Email not registered' });
        } else {
          setErrors({ email: error.message });
        }
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow flex items-center justify-center p-4">
        <div className="w-full max-w-md mx-auto bg-gradient-to-t from-[#ffffff] to-yellow-300 rounded-lg shadow-lg p-6 fade-in">
          <h2 className="text-3xl font-bold text-[#2a0000] mb-6 text-center">
            Forgot your password?
          </h2>
          {successMessage && (
            <div className="text-green-600 mb-4">{successMessage}</div>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 border rounded-lg border-gray-300 transition-all"
              />
              {errors.email && (
                <div className="text-red-600 mt-1">{errors.email}</div>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-[#2a0000] text-white p-3 rounded-lg hover:bg-[#3a0000] transition-transform transform hover:scale-105 ripple-effect"
            >
              Send Password Reset Link
            </button>

            <div className="text-center">
              <Link to="/login" className="text-[#2a0000] hover:underline">
                Back to Login
              </Link>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default ForgotPassword;
