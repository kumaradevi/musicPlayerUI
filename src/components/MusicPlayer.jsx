import React, { useEffect, useRef, useState } from 'react'
import { PiSpeakerHigh } from "react-icons/pi";
import { FaForward } from "react-icons/fa";
import { FaBackward } from "react-icons/fa";
import { IoIosPlayCircle } from "react-icons/io";
import music from "../assets/music.webp"
import { HiDotsHorizontal } from "react-icons/hi";
import { HiMiniPauseCircle } from "react-icons/hi2";
import { GoMute } from "react-icons/go";
import Dropdown from './Dropdown';
import data from "../model/data"
import { useDispatch } from 'react-redux';
import { getFavList, setFavourite } from '../featured/slices/favouriteSlice';
import {motion} from "framer-motion"


const MusicPlayer = ({select,setSelect}) => {
    const [isPlaying,setIsPlaying]=useState(false);
    const [isMute,setIsMute]=useState(false);
    const [show,setShow] =useState(false);
    const[isFavourite,setIsFavourite]=useState(false);
    const [favList,setFavList]=useState([]);
    const [progress, setProgress] = useState(0);
    const dispatch=useDispatch();
    const audioRef=useRef();

    const currentIndex=data?.findIndex((d)=>d.id==select?.id);

   useEffect(()=>{
    if(audioRef.current){
        audioRef.current.pause();
        audioRef.current.load();
        audioRef.current.play().catch(err=>console.log(err.message))
        setIsPlaying(true)
       
    }
   },[select])
   useEffect(() => {
    if (audioRef.current) {
      const updateProgress = () => {
        const percent = (audioRef.current.currentTime / audioRef.current.duration) * 100;
        setProgress(percent || 0);
      };

      audioRef.current.addEventListener("timeupdate", updateProgress);
      return () => audioRef.current.removeEventListener("timeupdate", updateProgress);
    }
  }, []);
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
                localStorage.setItem("favList",JSON.stringify(updatedList));
                dispatch(getFavList(updatedList))
                return updatedList;
            }
            return prev
        });
        dispatch(setFavourite(true))
        setIsFavourite(true)
      }

   const handleForward=()=>{
   if(currentIndex < data.length-1){
     setSelect(data[currentIndex+1])
   }
   }
  
   const handleBackward=()=>{
    if(currentIndex >=1){
  setSelect(data[currentIndex-1])
    }
   }

   const handleSeek = (e) => {
    const newTime = (e.nativeEvent.offsetX / e.target.clientWidth) * audioRef.current.duration;
    audioRef.current.currentTime = newTime;
    setProgress((newTime / audioRef.current.duration) * 100);
  };
 
  return (
    <div className='w-[90%] mx-auto sm:w-full mt-8 sm:mt-0'>
        <div className='xl:my-24 xl:mx-32 '>
            <div className='flex flex-col gap-3'>
                <motion.h1 className='text-xl mt-12 sm:mt-12 lg:mt-0 lg:text-3xl font-bold'>{select?.title || "Are you ready to hear music?"}</motion.h1>
                 <p className='text-sm text-[#9A9792] sm:text-lg'>{select?.artistName || ""}</p>
            </div>
            <motion.div initial={{scale:2,rotate:60}} animate={{scale:1,rotate:0}} transition={{type:"spring"}} className='w-full sm:w-[410px] h-[380px] mt-8'>
             <img src={select?.thumbnail || music} alt="thumbnail" className='w-full h-full object-cover rounded-lg' />
            </motion.div>
            <div>
            <audio src={select?.musicUrl} ref={audioRef}>
               
            </audio>
           {select && ( <div className='flex flex-col gap-8 mt-6 w-[100%] sm:w-[410px]'>
            <div className="relative w-[100%] sm:w-[410px] bg-gray-600 rounded-full h-[5px] cursor-pointer" onClick={handleSeek}>
                <div className="bg-white h-full rounded-full" style={{ width: `${progress}%` }}></div>
              </div>
                <div className='flex gap-12 justify-center sm:justify-between items-center'>
                <div className='w-[40px] h-[40px] bg-transparent hover:bg-gray-600 rounded-full flex justify-center items-center transition-all relative' onClick={handleDropdown}><HiDotsHorizontal size={25} />
                {show && <div className='absolute top-[-50px] left-[-140px]'><Dropdown addFavourite={()=>addFavourite(select.id)} isFavourite={isFavourite}/>  </div>}
                </div>
                <div className='flex gap-6 items-center'>
                <div onClick={handleBackward}><FaBackward size={25}/></div>
                <div onClick={togglePlay}> {isPlaying ? <IoIosPlayCircle size={35}/> : <HiMiniPauseCircle size={35}/>}</div>
                    <div onClick={handleForward}><FaForward size={25}/></div>
                </div>
                    <div className='w-[40px] h-[40px] bg-transparent hover:bg-gray-600 rounded-full flex justify-center items-center transition-all ' onClick={toggleMute} >
                       {!isMute ?  <PiSpeakerHigh size={25}/> :<GoMute size={25}/> }
                        </div>
                </div>
                </div>)}
            </div>
        </div>
    </div>
  )
}

export default MusicPlayer