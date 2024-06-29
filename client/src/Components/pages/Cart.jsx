import React from 'react'
import { useSelector } from 'react-redux'

const Cart = () => {
  const selector = useSelector(state => state.authSlice)
  console.log('selector',selector);
  return (
    <div>
      Cart
    </div>
  )
}

export default Cart
