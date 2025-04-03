import React, { useEffect, useRef, useState } from 'react'
import { PiSpeakerHigh } from "react-icons/pi";
import { FaForward } from "react-icons/fa";
import { FaBackward } from "react-icons/fa";
import { IoIosPlayCircle } from "react-icons/io";
import hope from "../assets/hope.jpg";
import { HiDotsHorizontal } from "react-icons/hi";
import { HiMiniPauseCircle } from "react-icons/hi2";
import { GoMute } from "react-icons/go";
import Dropdown from './Dropdown';
import data from "../model/data"
import { useDispatch } from 'react-redux';
import { getFavList, setFavourite } from '../featured/slices/favouriteSlice';
const MusicPlayer = ({select}) => {
    const [isPlaying,setIsPlaying]=useState(false);
    const [isMute,setIsMute]=useState(false);
    const [show,setShow] =useState(false);
    const[isFavourite,setIsFavourite]=useState(false);
    const [favList,setFavList]=useState([]);
    const dispatch=useDispatch();
    const audioRef=useRef();

   useEffect(()=>{
    if(audioRef.current){
        audioRef.current.pause();
        audioRef.current.load();
        audioRef.current.play().catch(err=>console.log(err.message))
        setIsPlaying(true)
    }
   },[select])
  
   const togglePlay=()=>{
    if(audioRef.current){
        if(isPlaying){
            audioRef.current.pause();
        }
        else{
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying)
    }
   }
  
   const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMute;
      setIsMute(!isMute);
    }
  };

  const handleDropdown=()=>{
    setShow(!show)
  }


    const addFavourite=(id)=>{
        const fav=data.find((d)=>d.id===id);
        setFavList((prev)=>{
            const isExist=prev?.some((d)=>d.id===id);
            if(!isExist){
                const updatedList=[...prev,fav];
                sessionStorage.setItem("favList",JSON.stringify(updatedList));
                dispatch(getFavList(updatedList))
                return updatedList;
            }
            return prev
        });
        dispatch(setFavourite(true))
        setIsFavourite(true)
      }

 

  
//  const removeFavourite=(id)=>{
//     const removedFav=favList.filter((d)=>d.id !== id);
//     console.log(removedFav)
//     setFavList(prev=>[...prev,removedFav])
//  }
 
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
            <audio src={select?.musicUrl} ref={audioRef}>
               
            </audio>
            <div className='flex flex-col gap-8 mt-6 w-[430px]'>
                <div className='w-[430px] bg-gray-600 rounded-full h-[5px] '>
                  <div className='bg-white w-[80%]  h-[100%] rounded-full'></div>
                </div>
                <div className='flex  justify-between items-center'>
                <div className='w-[40px] h-[40px] bg-transparent hover:bg-gray-600 rounded-full flex justify-center items-center transition-all relative' onClick={handleDropdown}><HiDotsHorizontal size={25} />
                {show && <div className='absolute top-[-50px] left-[-140px]'><Dropdown addFavourite={()=>addFavourite(select.id)} isFavourite={isFavourite}/>  </div>}
                </div>
                <div className='flex gap-6 items-center'>
                <div><FaBackward size={25}/></div>
                <div onClick={togglePlay}> {isPlaying ? <IoIosPlayCircle size={35}/> : <HiMiniPauseCircle size={35}/>}</div>
                    <div><FaForward size={25}/></div>
                </div>
                    <div className='w-[40px] h-[40px] bg-transparent hover:bg-gray-600 rounded-full flex justify-center items-center transition-all ' onClick={toggleMute} >
                       {isMute ?  <PiSpeakerHigh size={25}/> :<GoMute size={25}/> }
                        </div>
                </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default MusicPlayer