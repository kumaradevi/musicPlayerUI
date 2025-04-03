import React from 'react'
import { CiSearch } from "react-icons/ci";
const Card = () => {
  return (
    <div className='w-[40%] '>
        <div className='m-12'>
            <h1 className='font-bold text-3xl'>For You</h1>
            <div className='bg-[#282218] flex justify-between px-4 py-2 mt-6 text-[#9A9792]'>
                <input type="search" placeholder='Search Song,Artist' className='outline-none'/>
                <div><CiSearch /></div>
            </div>
        </div>
    </div>
  )
}

export default Card