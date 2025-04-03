import React from 'react'

const Sidebar = () => {
  return (
    <div className='w-[15%]'>
       <div className='flex flex-col gap-4 p-6'>
       <img src="" alt="" />
        <div className='flex flex-col gap-3'>
            <p className='hover:bg-gray-600'>For You</p>
            <p>Top Tracks</p>
            <p>Favourite</p>
            <p>Last Played</p>
        </div>
       </div>
    </div>
  )
}

export default Sidebar