import React from 'react';
import { GiMusicSpell } from "react-icons/gi";

const Sidebar = ({setIsFavourite,setIsRecent,setIsTop}) => {

    const goToTop=()=>{
        setIsTop(true);
        setIsFavourite(false);
        setIsRecent(false)
    }

    const goToFavourite=()=>{
        setIsFavourite(true);
        setIsTop(false);
        setIsRecent(false)
    }
   
    const goToRecent=()=>{
        setIsFavourite(false);
        setIsTop(false);
        setIsRecent(true);
    }
  return (
    <div className='w-full'>
       <div className='flex flex-col gap-4 p-6'>
      <div className='flex gap-2 items-center'>
        <div><GiMusicSpell size={36}/></div>
        <p className='text-2xl font-bold'>Rhythmix</p>
      </div>
        <div className='flex flex-col gap-5 mt-8'>
            <p className='hover:bg-gray-600'>For You</p>
            <p className='text-[#9A9792] cursor-pointer' onClick={goToTop}>Top Tracks</p>
            <p className='text-[#9A9792] cursor-pointer' onClick={goToFavourite}>Favourite</p>
            <p className='text-[#9A9792] cursor-pointer' onClick={goToRecent}>Recently Played</p>
        </div>
       </div>
    </div>
  )
}

export default Sidebar