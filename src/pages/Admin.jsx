import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAdmin } from '../api';

const Admin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    getAdmin(username, password)
      .then((admin) => {
        // FIXED: Changed 'data.success' to 'admin.success' to match your variable parameter
        if (admin.success) {
          console.log('Admin logged in:', admin);
          localStorage.setItem('adminToken', admin.token); // Store the token in localStorage for future authenticated requests
          navigate('/admin-dashboard');
        } else {
          alert(admin.message);
        }
      })
      .catch((error) => {
        // FIXED: Catch and display the custom error JSON sent back from Flask
        console.error('Login error:', error);
        const errorMessage = error.response?.data?.message || 'Invalid credentials or server error.';
        alert(errorMessage);
      });
  };  

  return (
    <div className='p-6 flex flex-col items-center justify-center bg-[#fbf6ef] min-h-screen'>
      <h1 className='text-2xl font-bold text-[#2d1e13]'>Login</h1>
      <p className='mt-2 text-[#5c4a3d] text-center'>
        Enter your admin credentials to access the dashboard.
      </p>
      <form className='mt-6 max-w-sm w-full' onSubmit={handleLogin}>
        <div className='mb-4'>
          <label className='block text-sm font-medium text-[#5c4a3d] mb-1' htmlFor='username'>
            Username
          </label>
          <input
            id='username'
            type='text'
            className='w-full border border-[#c1a084] rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500'
            value={username} 
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className='mb-4'>
          <label className='block text-sm font-medium text-[#5c4a3d] mb-1' htmlFor='password'>
            Password
          </label>
          <input
            id='password'
            type='password'
            className='w-full border border-[#c1a084] rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500'
            value={password} 
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button
          type='submit'
          className='w-full bg-[#c1a084] hover:bg-[#a98b6f] text-white font-bold py-2 px-4 rounded-md transition duration-300'
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Admin;