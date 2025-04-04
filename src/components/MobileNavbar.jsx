import React from "react";
import { GiMusicSpell } from "react-icons/gi";
import { FaBars } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import {motion,AnimatePresence} from "framer-motion"


const MobileNavbar = ({open,setOpen}) => {
  return (
    <div className="bg-[#0E0903] w-[100%] h-[60px] fixed sm:hidden top-0">
      <div className="flex justify-between items-center w-[90%] mx-auto h-full">
      <div className="flex gap-2 items-center ">
        <div>
          <GiMusicSpell size={20} />
        </div>
        <p className="text-xl font-bold">Rhythmix</p>
      </div>
      <div className="cursor-pointer text-white">
          <AnimatePresence mode="wait">
            {open ? (
              <motion.div
                key="close"
                initial={{ opacity: 0, rotate: -90, scale: 0.8 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, rotate: 90, scale: 0.8 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <IoMdClose onClick={() => setOpen(false)} size={24} />
              </motion.div>
            ) : (
              <motion.div
                key="bars"
                initial={{ opacity: 0, rotate: 90, scale: 0.8 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, rotate: -90, scale: 0.8 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <FaBars onClick={() => setOpen(true)} size={24} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default MobileNavbar;
