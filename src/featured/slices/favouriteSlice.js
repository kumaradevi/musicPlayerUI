import { createSlice } from "@reduxjs/toolkit"
import { act } from "react"



const initialState={
    favList:[],
    status:false,
}

const favouriteSlice=createSlice({
    name:"fav",
    initialState,
    reducers:{
        getFavList:(state,action)=>{
            
            state.favList=action.payload
        },
        setFavourite:(state,action)=>{
            state.status=action.payload
        }
        
    }
})

export const {getFavList,setFavourite}=favouriteSlice.actions;
export default favouriteSlice.reducer;