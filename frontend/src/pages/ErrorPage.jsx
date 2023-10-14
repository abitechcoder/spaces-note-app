import React from 'react'
import { useNavigate } from 'react-router-dom'

function ErrorPage() {
    const navigate = useNavigate();
  return (
    <div className='grid h-screen place-items-center'>
        <div className='grid place-items-center gap-2'>
            <h1 className='font-bold text-9xl text-[#523cdb]'>404</h1>
            <h3 className='text-3xl'>Ooops!!</h3>
            <p className='text-lg'>The page you are looking for doesn't exist or is unavailable</p>
            <button onClick={() => navigate("/login")} className='py-2 px-4 bg-[#523cdb] rounded-md text-white mt-2'>Go to home</button>
        </div>
    </div>
  )
}

export default ErrorPage