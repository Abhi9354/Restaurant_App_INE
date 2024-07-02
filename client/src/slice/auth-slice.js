import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API } from "../utils/constants";

export const authentication = createAsyncThunk(
  "/login",
  async ({ email, password }) => {
    axios.defaults.withCredentials = true;
    console.log("enter 2", email, password);
    try {
      const response = await axios.post(API.login, {
        email: email,
        password: password,
      }
    );

      console.log("response", response.data.data.role);
      const token = response.data.token;
      const role = response.data.data.role;
      const name = response.data.data.name;

      localStorage.setItem("token", token);
      // localStorage.setItem("role", role);

      return { token, role, name, email };
    } catch (error) {
      alert("please Wait for a minute, server may take time to start up");
      console.log("error during authentication", error);
    }
  }
);
export const verifyauth = createAsyncThunk("/verifyauth", async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(API.verifyAuth, {
      headers: {
        authorization: token,
        "Content-Type": "application/json",
      },
    });
    console.log("verify auth ", response);
    if (response.status === 200) {
      const role = response.data.role;
      const name = response.data.name;
      const email = response.data.email;
      return { role, name, email };
    } else {
      console.log("not data found");
    }
  } catch (error) {
    console.log("error during authentication", error);
  }
});

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    name: "",
    token: "",
    loading: false,
    role: "",
    restaurantData: [],
    cartData: [],
    email: "",
    orderData: [],
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    removeToken: (state, action) => {
      state.token = "";
    },

    setData: (state, action) => {
      console.log("action", action);
      state.restaurantData = action.payload;
    },

    cartData: (state, action) => {
      console.log("action cart", action);
      const data = action.payload;
      const updatedCart = data.map((item) => {
        return {
          id: item._id,
          name: item.name,
          price: item.price,
          dsc: item.dsc,
          img: item.img,
          quantity: 1,
        };
      });
      state.cartData = updatedCart;
    },
    addOrderData: (state, action) => {
      console.log("action cart", action);
      state.orderData = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(authentication.pending, (state, action) => {
        console.log("pending state", state, "action is ", action);
      })
      .addCase(authentication.fulfilled, (state, action) => {
        console.log("fulfilled state", state, "action is ", action);
        state.token = action.payload.token;
        state.name = action.payload.name;
        state.email = action.payload.email;
        state.role = action.payload.role;
        state.loading = true;

        alert("login successful");
      })
      .addCase(authentication.rejected, (state, action) => {
        console.log("rejected state", state, "action is ", action);
      });

    builder
      .addCase(verifyauth.pending, (state, action) => {
        console.log("pending state", state, "action is ", action);
      })
      .addCase(verifyauth.fulfilled, (state, action) => {
        console.log("fulfilled state", state, "action is ", action);
        state.role = action.payload.role;
        state.name = action.payload.name;
        state.email = action.payload.email;
        state.loading = true;
      })
      .addCase(verifyauth.rejected, (state, action) => {
        console.log("rejected state", state, "action is ", action);
      });
  },
});

export const { setToken, removeToken, setData, cartData, addOrderData } =
  authSlice.actions;

export default authSlice.reducer;
