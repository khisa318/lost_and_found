import React from 'react'

const Admin = () => {
  return (
    <div className='p-6 flex flex-col items-center justify-center  bg-[#fbf6ef]'>
      <h1 className='text-2xl font-bold text-[#2d1e13]'>Login</h1>
      <p className='mt-2 text-[#5c4a3d]'>Enter your admin credentials to access the dashboard.</p>
      <form className='mt-6 max-w-sm'>
        <div className='mb-4'>
          <label className='block text-sm font-medium text-[#5c4a3d] mb-1' htmlFor='username'>Username</label>
          <input
            id='username'
            type='text'
            className='border border-[#c1a084] rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500'
          />
        </div>
        <div className='mb-4'>
          <label className='block text-sm font-medium text-[#5c4a3d] mb-1' htmlFor='password'>Password</label>
          <input
            id='password'
            type='password'
            className='border border-[#c1a084] rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500'
          />
        </div>
        <button
          type='submit'
          className='bg-[#c1a084] hover:bg-[#a98b6f] text-white font-bold py-2 px-4 rounded-md transition duration-300'
        >
          Login
        </button>
      </form>
    </div>
  )}
export default Admin