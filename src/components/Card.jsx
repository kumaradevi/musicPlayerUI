import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";
import data from "../model/data.json";
import MusicPlayer from "./MusicPlayer";
import Sidebar from "./Sidebar";
const Card = () => {
    const [select,setSelect]=useState(null);
    const [query,setQuery]=useState("");
    const [isFavourite,setIsFavourite]=useState(false);
    const [isRecent,setIsRecent]=useState(false);
    const [favList,setFavList]=useState([]);
    const [recentList,setRecentList]=useState([])
  
    const handleSelectSong=(id)=>{
           const song=data.find((d)=>d.id === id);
           setSelect(song)
    }

    const filteredData=query.length>0 ? data.filter((d)=>d.title.toLowerCase().includes(query.toLowerCase()) || d.artistName.toLowerCase().includes(query.toLowerCase())) : data;
  return (
    <div className="w-[100%] flex">
        <div className="w-[15%]">
        <Sidebar/>
        </div>
      <div className="w-[40%] max-h-fit overflow-auto hide-scrollbar">
      <div className="m-12">
       <div className="sticky top-4 bg-[#171004]">
       <h1 className="font-bold text-3xl">For You</h1>
        <div className="bg-[#282218] flex justify-between px-4 py-2 mt-6 text-[#9A9792] rounded-md items-center">
          <input
            type="search"
            placeholder="Search Song, Artist"
            className="outline-none w-[95%] text-white"
            value={query}
            onChange={(e)=>setQuery(e.target.value)}
          />
          <div>
            <CiSearch />
          </div>
        </div>
       </div>

        {data &&
          filteredData.map((item) => (
            <div className="flex justify-between items-center mt-10">
              <div className="flex gap-3 items-center">
                <div className="w-[60px] h-[60px]">
                  <img
                    src={item?.thumbnail}
                    alt="thumbnail"
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
                <div onClick={()=>handleSelectSong(item.id)} className="cursor-pointer">
                  <h4>{item?.title}</h4>
                  <p className="text-[#9A9792] text-sm">{item?.artistName}</p>
                </div>
              </div>
              <div className="text-[#9A9792]">{item.duration}</div>
            </div>
          ))}
      </div>
      </div>
      <div className="w-[45%]">
        <MusicPlayer select={select}/>
      </div>
    </div>
  );
};

export default Card;
