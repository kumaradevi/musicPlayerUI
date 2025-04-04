import { configureStore } from "@reduxjs/toolkit";
import favouriteSliceReducer from "./slices/favouriteSlice";
import recentListSliceReducer from "./slices/recentListSlice";


const store=configureStore({
    reducer:{
         fav:favouriteSliceReducer,
         recent:recentListSliceReducer,
    }
});

export default store;