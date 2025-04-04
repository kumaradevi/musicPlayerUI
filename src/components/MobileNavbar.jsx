import React from "react";
import { GiMusicSpell } from "react-icons/gi";
import { FaBars } from "react-icons/fa";

const MobileNavbar = () => {
  return (
    <div className="bg-[#0E0903] w-[100%] h-[60px] fixed sm:hidden top-0">
      <div className="flex justify-between items-center w-[90%] mx-auto h-full">
      <div className="flex gap-2 items-center ">
        <div>
          <GiMusicSpell size={20} />
        </div>
        <p className="text-xl font-bold">Rhythmix</p>
      </div>
      <div>
        <FaBars size={20} />
      </div>
      </div>
    </div>
  );
};

export default MobileNavbar;
