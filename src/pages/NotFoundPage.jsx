import React from 'react'
import { Link } from 'react-router-dom'

const NotFoundPage = () => {
  return (
    <main className="w-full min-h-[80vh] bg-[#fbf6ef] flex items-center justify-center px-6 py-12">
      <div className="text-center max-w-md">
        {/* Error Badge */}
        <span className="inline-block text-xs font-bold tracking-widest uppercase text-[#c1a084] bg-white border border-[#c1a084]/40 px-3 py-1 rounded-full shadow-sm">
          404 Error
        </span>
        
        {/* Main Headline */}
        <h1 className="text-5xl font-extrabold tracking-tight text-[#2d1e13] mt-4">
          Page Not Found
        </h1>
        
        {/* Description message */}
        <p className="mt-4 text-[#5c4a3d] leading-relaxed">
          The link you followed might be broken, or the page may have been moved or deleted by an administrator. Let's get you back on track!
        </p>
        
        {/* Navigation Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link 
            to="/" 
            className="w-full sm:w-auto rounded-md bg-[#2d1e13] px-5 py-2.5 text-sm font-bold text-[#fbf6ef] hover:bg-[#5c4a3d] transition shadow-sm text-center"
          >
            Go to Homepage
          </Link>
          <Link 
            to="/items" 
            className="w-full sm:w-auto rounded-md border border-[#c1a084] bg-white px-5 py-2.5 text-sm font-bold text-[#2d1e13] hover:bg-[#eaddcf] transition text-center"
          >
            Browse Items
          </Link>
        </div>
      </div>
    </main>
  )
}

export default NotFoundPage