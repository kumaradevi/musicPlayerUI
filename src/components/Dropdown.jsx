import React from 'react'

const Dropdown = ({addFavourite}) => {

  return (
    <div className='bg-white p-3 w-[200px] max-h-fit text-gray-800'>
        <p onClick={addFavourite} className='cursor-pointer'>Add to Favourites</p>
    </div>
  )
}

export default Dropdown