import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from React Router
import axios from 'axios';

function SignUp() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Initialize navigate

  const handleSignUp = async () => {
    try {
      await axios.post('http://localhost:5000/signup', {
        username,
        password,
      });
      alert('Registration successful!');
      navigate('/login'); // Redirect to the login page
    } catch (error) {
      if (error.response) {
        alert('Registration failed: ' + error.response.data.msg);
      } else if (error.request) {
        alert('Registration failed: No response received from server.');
      } else {
        alert('Registration failed: ' + error.message);
      }
    }
  };

  return (
    <>
      <nav className="navbar bg-opacity-30 bg-black backdrop-blur-lg p-4 rounded-md shadow-lg flex justify-between">
        {/* Logo or Title on the Left */}
        <div className="navbar-logo text-white font-bold text-lg">
          <a href="/">Backorder Vision</a>
        </div>
        {/* Links on the Right */}
        <ul className="navbar-list flex space-x-6">
          <li className="navbar-item">
            <a
              href="/contact"
              className="navbar-link text-white font-semibold hover:bg-orange-500 hover:text-black transition-all duration-300 transform hover:scale-105 px-4 py-2 rounded-lg no-underline"
            >
              Contact
            </a>
          </li>
        </ul>
      </nav>
      <div className="landing-page min-h-screen flex items-center justify-center" style={{ background: 'linear-gradient(to bottom right, #fff3e0, #ffe0b2)' }}>
        <div className="p-8 rounded-lg shadow-lg w-96 mx-auto mt-20" style={{ background: 'linear-gradient(to bottom, #FF6F00, #FF3D00)' }}>
          <h2 className="text-3xl font-bold mb-6 text-center text-white">Sign Up</h2>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            className="p-3 border border-gray-300 rounded-lg w-full mb-4 bg-white text-black shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="p-3 border border-gray-300 rounded-lg w-full mb-4 bg-white text-black shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
          <button
            onClick={handleSignUp}
            className="bg-yellow-400 text-purple-900 p-3 rounded-lg hover:bg-yellow-500 w-full transition-all duration-300 shadow-md font-bold"
          >
            Sign Up
          </button>
          <p className="mt-4 text-center text-white">
            Have an account? <a href="/login" className="text-yellow-300 underline">Login</a>
          </p>
        </div>
      </div>
    </>
  );
}

export default SignUp;
