import { configureStore } from "@reduxjs/toolkit";
import favouriteSliceReducer from "./slices/favouriteSlice";


const store=configureStore({
    reducer:{
         fav:favouriteSliceReducer,
    }
});

export default store;