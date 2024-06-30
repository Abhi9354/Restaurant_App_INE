import React, { useEffect, useState } from "react";
import Navbar from "../../elements/Navbar";
import { API } from "../../utils/constants";
import axios from "axios";
import { useDispatch } from "react-redux";
import Card from "../../elements/Card";
import { cartData, setData } from "../../slice/auth-slice";

const Home = () => {
  const dispatch = useDispatch();
  const [restaurants, setRestaurants] = useState([]);
  const [cart, setCart] = useState([]);
  const [enable, setEnable] = useState(false);
useEffect(() => {
  console.log('cart',cart);
  dispatch(cartData(cart));
}, [cart]);
  const addToCart = (e,restaurant) => {
    console.log(e)
    if(e === "Add to cart"){
      console.log('enter');
      setCart([...cart, restaurant]);
            
    }
    else{
      
      setCart((prev)=>prev.filter(el=>el._id !== restaurant._id))
    }
  };
  const getRestaurants = async () => {
    try {
      const response = await axios.get(API.getRestaurants, {
        headers: {
          authorization: localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
      });
      const data = response.data.data;
      console.log("data", data);
      dispatch(setData(data));
      setRestaurants(data);
    } catch (error) {
      alert("No Data found");
      console.log("error during data fetching", error);
    }
  };

  useEffect(() => {
    getRestaurants();
  }, []);

  useEffect(() => {
    console.log("enavble", enable);
  }, [enable]);

  useEffect(() => {
    console.log("restaurants", restaurants);
    setEnable(true);
  }, [restaurants]);

  return (
    <div className="bg-slate-400  flex flex-col justify-space-between h-full  ">
      <Navbar />
      <div className="flex flex-wrap pl-16 gap-2 mt-2">
        {enable && (
          restaurants.map((restaurant,idx) => {
            return <Card key={restaurant._id} idx={idx} restaurant={restaurant} onClick={addToCart}/>;
          }))}
      </div>

      
    </div>
  );
};

export default Home;
