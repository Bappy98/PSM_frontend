import React from 'react'

function SearchBar() {
  return (
    <div className="sticky top-24 z-50">
    <div className="flex justify-center md:mt-6 mt-3 md:w-2/3 mx-auto w-96 ">
    <input type="text" className="bg-gray-400 md:h-12 h-6 w-full rounded-md pl-3"/>
    <button className="bg-blue-600 px-6 mx-2 rounded-md shadow-md text-white">search</button>
    </div>
 </div>
  )
}

export default SearchBar