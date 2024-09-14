import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/navbar.jsx';
import './LoginPage.css'; 

const ForgotPassword = () => {
  const [username, setUsername] = useState('');
  const [errors, setErrors] = useState({ username: '', password: '' });
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    let valid = true;
    const newErrors = { username: '' };

    if (!username) {
      newErrors.username = 'Please enter a valid email';
      valid = false;
    } else if (username.indexOf('@') === -1) {
      newErrors.username = 'Please enter a valid email';
      valid = false;
    }

    

    setErrors(newErrors);

    if (valid) {
      // Simulate a successful login
      setSuccessMessage('Login successful!');
      setTimeout(() => {
        // Redirect or transition to another page
      }, 2000);
    }
  };

  return (
    <div className="min-h-screen flex flex-col ">
      <Header />
      <main className="flex-grow flex items-center justify-center p-4">
        <div className="w-full max-w-md mx-auto bg-gradient-to-t from-[#ffffff] to-yellow-300 rounded-lg shadow-lg p-6 fade-in">
          <h2 className="text-3xl font-bold text-[#2a0000] mb-6 text-center">Forgot your password?</h2>
          {successMessage && (
            <div className="text-green-600 mb-4">{successMessage}</div>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Email"
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
            <button
              type="submit"
              className="w-full bg-[#2a0000] text-white p-3 rounded-lg hover:bg-[#3a0000] transition-transform transform hover:scale-105 ripple-effect"
            >
              Reset Password
            </button>
            <div className="text-center">
              <Link to="/login" className="text-[#2a0000] hover:underline">Remember your password? Login!</Link>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default ForgotPassword;
