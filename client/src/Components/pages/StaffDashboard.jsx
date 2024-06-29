import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import Navbar from '../../elements/Navbar'
import { API } from '../../utils/constants'
import axios from 'axios'
import { addOrderData } from '../../slice/auth-slice'
import CartList from '../../elements/CartList'

const StaffDashboard = () => {
    const dispatch = useDispatch()
    const [enable,setEnable] = useState(false);
    const [orderData,setOrderData] = useState([]);
    const [customerName,section] = useState("");

    const getOrders = async () => {
        try {
          const response = await axios.get(API.getOrders, {
            headers: {
              authorization: localStorage.getItem("token"),
              "Content-Type": "application/json",
            },
          });
          const data = response.data.data;
          console.log("data asdfasdfasfd", data);
          dispatch(addOrderData(data));
          setOrderData(data);
        } catch (error) {
          alert("No Data found");
          console.log("error during data fetching", error);
        }
      };


      useEffect(() => {
        getOrders()
      }, []);
      useEffect(() => {
        console.log('order', orderData instanceof Array,orderData,orderData.length);
        
        setEnable(true);
      }, [orderData]);
    
  return (
    <div>
      <Navbar/>
      <h1 className='text-3xl text-center font-bold'>Order List</h1>
      {enable && (<div>
        
        {orderData.map((item)=> {
           return <div key={item._id}>
            <h2 className='text-2xl font-bold'>Customer: {item.CustomerName}</h2>
            <p>Email: {item.CustomerEmail}</p>
            {item.cart.map((item)=>(<CartList key={item._id} item={item}/>))}
            <hr />
            </div>
        })}
      </div>)}
      
      
      
    </div>
  )
}

export default StaffDashboard
