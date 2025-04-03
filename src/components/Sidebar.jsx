import React from 'react';
import { GiMusicSpell } from "react-icons/gi";

const Sidebar = () => {
  return (
    <div className='w-full'>
       <div className='flex flex-col gap-4 p-6'>
      <div className='flex gap-2 items-center'>
        <div><GiMusicSpell size={36}/></div>
        <p className='text-2xl font-bold'>Rhythmix</p>
      </div>
        <div className='flex flex-col gap-5 mt-8'>
            <p className='hover:bg-gray-600'>For You</p>
            <p className='text-[#9A9792] cursor-pointer'>Top Tracks</p>
            <p className='text-[#9A9792] cursor-pointer'>Favourite</p>
            <p className='text-[#9A9792] cursor-pointer'>Recently Played</p>
        </div>
       </div>
    </div>
  )
}

export default Sidebar