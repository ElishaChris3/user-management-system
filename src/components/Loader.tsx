import React from 'react'

const Loader = () => {
  return (
        <div className="flex flex-col items-center justify-center py-16 text-gray-600">
      <div className="h-10 w-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mb-3"></div>
      <p className="text-sm font-medium text-gray-600">Loading users...</p>
    </div>
  )
}

export default Loader