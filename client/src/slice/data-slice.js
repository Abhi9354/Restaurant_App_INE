import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API } from "../utils/constants";
import axios from "axios";

export const getRestaurants = createAsyncThunk("/getRestaurants", async () => {
  try {
    const response = await axios.get(API.getRestaurants, {
      headers: {
        authorization: localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
    });
    const data = response.data.data;
    console.log("data", data);
    return data;
  } catch (error) {
    alert("No Data found");
    console.log("error during data fetching", error);
  }
});

export const dataSlice = createSlice({
  name: "data",
  initialState: {
    restaurants: [],
    cart: [],
    loading: false,
  },
  reducers: {
    setData: (state, action) => {
      console.log("action", action);
      state.restaurants.push(action.payload);
    },

    cartData: (state, action) => {
      console.log("action cart", action);
      state.cart.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getRestaurants.pending, (state, action) => {
        console.log("pending state", state, "action is ", action);
      })
      .addCase(getRestaurants.fulfilled, (state, action) => {
        console.log("fulfilled state", state, "action is ", action);
        state.restaurants = action.payload;
        state.loading = true;
      })
      .addCase(getRestaurants.rejected, (state, action) => {
        console.log("rejected state", state, "action is ", action);
      });
  },
});
export const { setData, cartData } = dataSlice.actions;
export default getRestaurants.reducer;
