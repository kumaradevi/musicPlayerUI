import React, { useState } from 'react';
import { GiMusicSpell } from "react-icons/gi";
import {motion} from "framer-motion";

const Sidebar = ({setIsFavourite,setIsRecent,setIsTop}) => {
    const [activeTab,setActiveTab]=useState("top")

    const goToTop=()=>{
        setIsTop(true);
        setActiveTab("top")
        setIsFavourite(false);
        setIsRecent(false)
    }

    const goToFavourite=()=>{
        setIsFavourite(true);
        setActiveTab("favourite")
        setIsTop(false);
        setIsRecent(false)
    }
   
    const goToRecent=()=>{
        setActiveTab("recent")
        setIsFavourite(false);
        setIsTop(false);
        setIsRecent(true);
    }
  return (
    <div className='w-full'>
       <div className='flex flex-col gap-4 p-6'>
      <div className='flex gap-2 items-center'>
        <motion.div 
         initial={{opacity:0,y:-100,rotate:180,scale:2}}
         animate={{opacity:1,y:0,rotate:0,scale:1}}
         transition={{delay:0.4,type:"spring"}}
         ><GiMusicSpell size={36}/></motion.div>
        <motion.p   initial={{opacity:0,y:-100}} animate={{opacity:1,y:0}} transition={{delay:0.5,type:"spring"}}  className='text-2xl font-bold'>Rhythmix</motion.p>
      </div>
        <div className='flex flex-col gap-5 mt-8'>
            <p className='hover:bg-gray-600'>For You</p>
            <motion.p className={`${activeTab=="top" ? "text-white" :"text-[#9A9792]"} cursor-pointer`}
            whileHover={{ scale: 1.2 }}
            animate={activeTab === "top" ? { scale:1.1, opacity: 1 } : { scale:1, opacity: 0.9 }}
            transition={{ duration: 0.3 }}
            onClick={goToTop}>Top Tracks</motion.p>
            <motion.p className={`${activeTab=="favourite" ? "text-white" :"text-[#9A9792]"} cursor-pointer`}  
            whileHover={{ scale: 1.2 }}
            animate={activeTab === "favourite" ? { scale:1.1, opacity: 1 } : { scale:1, opacity: 0.9 }}
            transition={{ duration: 0.3 }}
            onClick={goToFavourite}>Favourite</motion.p>
            <motion.p className={`${activeTab=="recent" ? "text-white" :"text-[#9A9792]"} cursor-pointer`} 
               whileHover={{ scale: 1.2 }}
               animate={activeTab === "recent" ? { scale:1.1, opacity: 1 } : { scale:1, opacity: 0.9 }}
               transition={{ duration: 0.3 }}
            onClick={goToRecent}>Recently Played</motion.p>
        </div>
       </div>
    </div>
  )
}

export default Sidebar