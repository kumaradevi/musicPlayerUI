import React from 'react'
import { PiSpeakerHigh } from "react-icons/pi";
import { FaForward } from "react-icons/fa";
import { FaBackward } from "react-icons/fa";
import { IoIosPlayCircle } from "react-icons/io";
import hope from "../assets/hope.jpg";
import { HiDotsHorizontal } from "react-icons/hi";
const MusicPlayer = ({select}) => {
  return (
    <div className='w-full'>
        <div className='my-24 mx-32'>
            <div className='flex flex-col gap-3'>
                <h1 className='text-3xl font-bold'>{select?.title || "Album Name"}</h1>
                 <p className='text-[#9A9792] text-lg'>{select?.artistName || "Artist Name"}</p>
            </div>
            <div className='w-[430px] h-[350px]   mt-12'>
             <img src={select?.thumbnail || hope} alt="thumbnail" className='w-full h-full object-cover rounded-lg' />
            </div>
            <div>
            <audio src={select?.musicUrl} >
               
            </audio>
            <div className='flex flex-col gap-8 mt-6 w-[430px]'>
                <div className='w-[430px] bg-gray-600 rounded-full h-[5px]'>
 
                </div>
                <div className='flex  justify-between items-center'>
                <div className='w-[40px] h-[40px] bg-transparent hover:bg-gray-600 rounded-full flex justify-center items-center transition-all'><HiDotsHorizontal size={25} /></div>
                <div className='flex gap-6 items-center'>
                <div><FaBackward size={25}/></div>
                <div><IoIosPlayCircle size={35}/></div>
                    <div><FaForward size={25}/></div>
                </div>
                    <div className='w-[40px] h-[40px] bg-transparent hover:bg-gray-600 rounded-full flex justify-center items-center transition-all '><PiSpeakerHigh size={25}/></div>
                </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default MusicPlayer