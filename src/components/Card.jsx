import React, { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import data from "../model/data.json";
import MusicPlayer from "./MusicPlayer";
import Sidebar from "./Sidebar";
import { useDispatch, useSelector } from "react-redux";
import MobileNavbar from "./MobileNavbar";
import { motion } from "framer-motion";
import MobileMenuBar from "./MobileMenuBar";
import { getRecentList } from "../featured/slices/recentListSlice";

const Card = () => {
  const [select, setSelect] = useState(null);
  const [query, setQuery] = useState("");
  const [isFavourite, setIsFavourite] = useState(false);
  const [isRecent, setIsRecent] = useState(false);
  const [isTop, setIsTop] = useState(true);
  const [favList, setFavList] = useState([]);
  const [recentList, setRecentList] = useState([]);
  const [bgColor, setBgColor] = useState("bg-[#171004]");
  const [SearchBoxColor, setSearchBoxColor] = useState("bg-[#282218]");
  const [hoverColor, setHoverColor] = useState("bg-[#82B85B]");
  const [open, setOpen] = useState(false);

  const favourite = useSelector((state) => state.fav.favList);
  const status = useSelector((state) => state.fav.status);
  const dispatch=useDispatch();

  const handleSelectSong = (id) => {
    const song = data.find((d) => d.id === id);
    setSelect(song);
    setRecentList((prev) => {
      const updatedList = [song, ...prev.filter((s) => s.id !== id)].slice(0, 10);
      sessionStorage.setItem("recentList", JSON.stringify(updatedList)); // Store updated list
      return updatedList;
    });
  
    // Dispatch updated recent list to Redux
    dispatch(getRecentList(song));
  };

  const getFavouriteList = () => {
    if (favourite) {
      setFavList(favourite);
    }
  };

  useEffect(() => {
    getFavouriteList();
  }, [favourite]);

  const filteredData =
    query.length > 0
      ? data.filter(
          (d) =>
            d.title.toLowerCase().includes(query.toLowerCase()) ||
            d.artistName.toLowerCase().includes(query.toLowerCase())
        )
      : data;
  const filteredFav =
    query.length > 0
      ? favList.filter(
          (d) =>
            d.title.toLowerCase().includes(query.toLowerCase()) ||
            d.artistName.toLowerCase().includes(query.toLowerCase())
        )
      : favList;
  const filteredRecent =
    query.length > 0
      ? recentList.filter(
          (d) =>
            d.title.toLowerCase().includes(query.toLowerCase()) ||
            d.artistName.toLowerCase().includes(query.toLowerCase())
        )
      : recentList;

  return (
    <motion.div
      className={`w-[100%] flex ${select ? `bg-[${select.bgColor}]` : bgColor}`}
      initial={{ background: `linear-gradient(10deg, ${bgColor}, #000)` }}
      animate={{
        background: `linear-gradient(10deg, ${
          select?.bgColor || bgColor
        }, #000)`,
      }}
      transition={{ duration: 1 }}
    >
      
      <div className="">
        <MobileNavbar open={open} setOpen={setOpen}/>
       {open && <MobileMenuBar open={open} setSelect={setSelect} />}
      </div>
      <div className="w-[15%] hidden sm:block">
        <Sidebar
          setIsFavourite={setIsFavourite}
          setIsRecent={setIsRecent}
          setIsTop={setIsTop}
        />
      </div>
      <div className="w-[40%] max-h-fit overflow-auto hide-scrollbar hidden sm:block">
        <div className="m-6">
          <motion.div
            initial={{ opacity: 0, y: -20, backgroundColor: `${bgColor}` }}
            animate={{
              opacity: 1,
              y: 0,
              backgroundColor: `${select?.bgColor}`,
            }}
            transition={{ delay: 0.3 }}
            className={`sticky top-0 z-[99] p-3 ${
              select ? `bg-[${select.bgColor}]` : bgColor
            } rounded-xl`}
          >
            <h1 className="font-bold text-3xl">For You</h1>
            <div
              className={`${
                select ? `bg-[${select.bgColor}]` : SearchBoxColor
              }  flex justify-between px-4 py-2 mt-6 text-[#9A9792] rounded-md items-center`}
            >
              <input
                type="search"
                placeholder="Search Song, Artist"
                className="outline-none w-[95%] text-white"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <div>
                <CiSearch />
              </div>
            </div>
          </motion.div>
          <div className="flex flex-col mt-8 gap-2">
            <motion.div
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              {data &&
                isTop &&
                filteredData.map((item) => (
                  <motion.div
                    initial={{ scale: 1 }}
                    whileHover={{ scale: 1.1 }}
                    className={`flex justify-between items-center  hover:bg-[#282218]  rounded-md p-3`}
                    key={item.id}
                  >
                    <div className="flex gap-3 items-center">
                      <div className="w-[60px] h-[60px]">
                        <img
                          src={item?.thumbnail}
                          alt="thumbnail"
                          className="w-full h-full object-cover rounded-full"
                        />
                      </div>
                      <div
                        onClick={() => handleSelectSong(item.id)}
                        className="cursor-pointer"
                      >
                        <h4>{item?.title}</h4>
                        <p
                          className={`${
                            select ? "text-white" : "text-[#9A9792]"
                          } text-sm`}
                        >
                          {item?.artistName}
                        </p>
                      </div>
                    </div>
                    <div
                      className={`${select ? "text-white" : "text-[#9A9792]"}`}
                    >
                      {item.duration}
                    </div>
                  </motion.div>
                ))}
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              {favList &&
                isFavourite &&
                filteredFav?.map((item) => (
                  <motion.div
                    initial={{ scale: 1 }}
                    whileHover={{ scale: 1.1 }}
                    className="flex justify-between items-center hover:bg-[#282218]  rounded-md p-3"
                    key={item.id}
                  >
                    <div className="flex gap-3 items-center">
                      <div className="w-[60px] h-[60px]">
                        <img
                          src={item?.thumbnail}
                          alt="thumbnail"
                          className="w-full h-full object-cover rounded-full"
                        />
                      </div>
                      <div
                        onClick={() => handleSelectSong(item.id)}
                        className="cursor-pointer"
                      >
                        <h4>{item?.title}</h4>
                        <p className="text-[#9A9792] text-sm">
                          {item?.artistName}
                        </p>
                      </div>
                    </div>
                    <div className="text-[#9A9792]">{item.duration}</div>
                  </motion.div>
                ))}
            </motion.div>
            {recentList &&
              isRecent &&
              filteredRecent?.map((item) => (
                <div
                  className="flex justify-between items-center hover:bg-[#282218]  rounded-md p-3"
                  key={item.id}
                >
                  <div className="flex gap-3 items-center">
                    <div className="w-[60px] h-[60px]">
                      <img
                        src={item?.thumbnail}
                        alt="thumbnail"
                        className="w-full h-full object-cover rounded-full"
                      />
                    </div>
                    <div
                      onClick={() => handleSelectSong(item.id)}
                      className="cursor-pointer"
                    >
                      <h4>{item?.title}</h4>
                      <p className="text-[#9A9792] text-sm">
                        {item?.artistName}
                      </p>
                    </div>
                  </div>
                  <div className="text-[#9A9792]">{item.duration}</div>
                </div>
              ))}
          </div>
        </div>
      </div>
      <div className="w-full sm:w-[45%]">
        <MusicPlayer select={select} setSelect={setSelect} />
      </div>
    </motion.div>
  );
};

export default Card;
