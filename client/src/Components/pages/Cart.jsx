import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import CartList from '../../elements/CartList';

const Cart = () => {
  const selector = useSelector(state => state.authSlice)
  const [cart,setCart] = useState(selector.cartData);
  
  console.log('selector',selector.cartData);
  const handleClick = (ref,e) => {
    console.log("console",ref,e)
    if(ref=="plus"){
      setCart(prevItems => {
        return prevItems.map(item => {
          if (item.id === e) {
            const newQuantity = item.quantity + 1;
            const newPrice = (item.price / item.quantity) * newQuantity;
            return { ...item, quantity: newQuantity, price: newPrice };
          }
          return item;
        });
      });
    }
    else{
      setCart(prevItems => {
        return prevItems.map(item => {
          if (item.id === e && item.quantity > 1) {
            const newQuantity = item.quantity - 1;
            const newPrice = (item.price / item.quantity) * newQuantity;
            return { ...item, quantity: newQuantity, price: newPrice };
          }
          return item;
        });
      });
    }
    

  };
  useEffect(() => {
    console.log('cart',cart);
  }, [cart]);
  
  return (
    <div>
                                                     <section className="py-24 relative ">
        <div className="w-full max-w-7xl px-4 md:px-5 lg-6 mx-auto">

            <h2 className="title font-manrope font-bold text-4xl leading-10 mb-8 text-center text-black">Shopping Cart
            </h2>
            <div className="hidden lg:grid grid-cols-2 py-6">
                <div className="font-normal text-xl leading-8 text-gray-500">Product</div>
                <p className="font-normal text-xl leading-8 text-gray-500 flex items-center justify-between">
                    <span className="w-full max-w-[260px] text-center">Quantity</span>
                    <span className="w-full max-w-[200px] text-center">Total</span>
                </p>
            </div>
            {cart.map((item,idx) => {
             return  <CartList key={item.id} item={item} idx={idx} onClick={(ref,e)=>handleClick(ref,e)}/>
            })}

           
            
          
            <div className="bg-gray-50 rounded-xl p-6 w-full mb-8 max-lg:max-w-xl max-lg:mx-auto">
                <div className="flex items-center justify-between w-full mb-6">
                    <p className="font-normal text-xl leading-8 text-gray-400">Sub Total</p>
                    <h6 className="font-semibold text-xl leading-8 text-gray-900">$360.00</h6>
                </div>
                <div className="flex items-center justify-between w-full pb-6 border-b border-gray-200">
                    <h6 className="font-semibold text-xl leading-8 text-gray-900">$45.00</h6>
                </div>
                <div className="flex items-center justify-between w-full py-6">
                    <p className="font-manrope font-medium text-2xl leading-9 text-gray-900">Total</p>
                    <h6 className="font-manrope font-medium text-2xl leading-9 text-indigo-500">$405.00</h6>
                </div>
            </div>
            <div className="flex items-center flex-col sm:flex-row justify-center gap-3 mt-8">
                <button
                    className="rounded-full py-4 w-full max-w-[280px]  flex items-center bg-indigo-50 justify-center transition-all duration-500 hover:bg-indigo-100">
                    <span className="px-2 font-semibold text-lg leading-8 text-indigo-600">Add Coupon Code</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                        <path d="M8.25324 5.49609L13.7535 10.9963L8.25 16.4998" stroke="#4F46E5" strokeWidth="1.6"
                            strokeLinecap="round" stroke-linejoin="round" />
                    </svg>
                </button>
                <button
                    className="rounded-full w-full max-w-[280px] py-4 text-center justify-center items-center bg-indigo-600 font-semibold text-lg text-white flex transition-all duration-500 hover:bg-indigo-700">Continue
                    to Payment
                    <svg className="ml-2" xmlns="http://www.w3.org/2000/svg" width="23" height="22" viewBox="0 0 23 22"
                        fill="none">
                        <path d="M8.75324 5.49609L14.2535 10.9963L8.75 16.4998" stroke="white" strokeWidth="1.6"
                            strokeLinecap="round" stroke-linejoin="round" />
                    </svg>
                </button>
            </div>
        </div>
    </section>
                                            
    </div>
  )
}

export default Cart
