import { configureStore } from "@reduxjs/toolkit";
import  authSlice  from "../slice/auth-slice";
import restaurantSlice  from "../slice/data-slice";

export const store = configureStore({
  reducer: {authSlice:authSlice},
  
});
