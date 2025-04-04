import { createSlice } from "@reduxjs/toolkit"



const initialState={
    recentList:[]
}

const recentListSlice=createSlice({
    name:"recent",
    initialState,
    reducers:{
        getRecentList:(state,action)=>{
            const newSong=action.payload;
            const updatedList=[newSong,...state.recentList.filter((d)=>d.id !== newSong.id)];
            state.recentList= updatedList.slice(0,10);
        }
    }
})

export const {getRecentList}=recentListSlice.actions;
export default recentListSlice.reducer;