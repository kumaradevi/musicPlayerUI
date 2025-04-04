import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import data from "../model/data"
import { IoIosArrowDropdown } from "react-icons/io";
import { IoIosArrowDropup } from "react-icons/io";
import { getRecentList } from "../featured/slices/recentListSlice";

//<IoIosArrowDropdown /> <IoIosArrowDropup />

const MobileMenuBar = ({ open,setSelect }) => {
  const favouriteList=useSelector(state=>state.fav.favList);
  const recentPlaylist=useSelector(state=>state.recent.recentList);
  const [topPlaylist,setTopPlaylist]=useState(data);
  const [showAll,setShowAll]=useState(false);
  const [showFavourite,setShowFavourite]=useState(false);
  const [showRecent,setShowRecent]=useState(false);
  const dispatch=useDispatch();

  const handleSelectSong=(id)=>{
    const song=data.find((item)=>item.id === id);
    setSelect(song);
    dispatch(getRecentList(song))
  }
  return (
    <AnimatePresence>
      <motion.div
        key={open ? "menuOpen" : "menuClosed"} 
        initial={{ x: "-100%" }} 
        animate={{ x: open ? "0%" : "-100%" }} 
        exit={{ x: "-100%" }} 
        transition={{ duration: 0.4, ease: "easeInOut" }} 
        className="bg-[#37343D] w-full h-[100vh] fixed left-0 top-16 z-[9999] shadow-lg overflow-auto "
      >
        <div className="text-white text-lg flex flex-col gap-6 p-6">
       <div>
       <p className={`cursor-pointer hover:text-gray-500 transition flex gap-2 items-center ${showAll ? "border-b border-gray-500" : "border-0" }  py-2 `} onClick={()=>setShowAll(!showAll)}> {!showAll ? <IoIosArrowDropdown size={25}/> : <IoIosArrowDropup size={25}/>}Top Tracks</p>
       {topPlaylist && showAll &&  topPlaylist.map((song)=>(<div onClick={()=>handleSelectSong(song.id)}>
          <div className="flex justify-between items-center mt-3">
          <div className="flex gap-2 items-center">
            <div className="w-[50px] h-[50px] ">
              <img src={song.thumbnail} alt="thumbnail"  className="w-full h-full object-cover rounded-full"/>
            </div>
            <div>
              <p className="font-semibold">{song.title}</p>
              <span className="text-sm ">{song.artistName}</span>
            </div>
          </div>
          <p className="text-sm">{song.duration}</p>
          </div>
        </div>))}
       </div>
  
         
         <div>
         
         <p className={`cursor-pointer hover:text-gray-500 transition flex gap-2 items-center py-2 ${showFavourite ? "border-b border-gray-500" :"border-0"}`} onClick={()=>setShowFavourite(!showFavourite)}>{!showFavourite ? <IoIosArrowDropdown size={25}/> : <IoIosArrowDropup size={25}/>}Favourite</p>
        {favouriteList &&showFavourite && favouriteList.map((song)=>(<div onClick={()=>handleSelectSong(song.id)}>
          <div className="flex justify-between items-center mt-3">
          <div className="flex gap-2 items-center">
            <div className="w-[50px] h-[50px] ">
              <img src={song.thumbnail} alt="thumbnail"  className="w-full h-full object-cover rounded-full"/>
            </div>
            <div>
              <p className="font-semibold">{song.title}</p>
              <span className="text-sm ">{song.artistName}</span>
            </div>
          </div>
          <p className="text-sm">{song.duration}</p>
          </div>
        </div>))}
         </div>
         
         <div>
       
         <p className={`cursor-pointer hover:text-gray-500 transition flex gap-2 items-center py-2 ${showRecent ? "border-b border-gray-500" : "border-0"}`} onClick={()=>setShowRecent(!showRecent)}>{!showRecent ? <IoIosArrowDropdown size={25}/> : <IoIosArrowDropup size={25}/>}Recently Played</p>
        {recentPlaylist && showRecent &&  recentPlaylist.map((song)=>(<div  onClick={()=>handleSelectSong(song.id)}>
        <div className="flex justify-between items-center mt-3">
          <div className="flex gap-2 items-center">
            <div className="w-[50px] h-[50px] ">
              <img src={song.thumbnail} alt="thumbnail"  className="w-full h-full object-cover rounded-full"/>
            </div>
            <div>
              <p className="font-semibold">{song.title}</p>
              <span className="text-sm ">{song.artistName}</span>
            </div>
          </div>
          <p className="text-sm">{song.duration}</p>
          </div>
        </div>))}
         </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default MobileMenuBar;



