import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { removeToken } from '../slice/auth-slice';
import { ROUTE } from '../route';

const Navbar = () => {
    const selector = useSelector(state => state.authSlice)
  console.log('selector',selector);
  const dispatch = useDispatch()
  const navigate = useNavigate()
  return (<>
   

<nav className=" bg-white border-gray-200 dark:bg-gray-900">
  <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
    <p className='text-2xl text-white'>Hlo! {selector.role}</p>
    <button data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
        <span className="sr-only">Open main menu</span>
        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
        </svg>
    </button>
    <div className="hidden w-full md:block md:w-auto" id="navbar-default">
      <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
        <li>
          <a  className="block text-2xl py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500" aria-current="page" onClick={()=>navigate(ROUTE.HOME)}>Home</a>
        </li>
        {selector.role!=="staff" && <li>
          <a  className="block py-2 px-3 text-gray-900 text-2xl rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"   onClick={()=>navigate(ROUTE.CART)}>Cart <span>{selector.cartData.length}</span></a>
        </li>}
        <li>
        <button  className ="bg-red-900 text-white py-2 px-3 rounded-2xl" onClick={()=>{
    localStorage.removeItem('token')
    dispatch(removeToken())

    navigate(ROUTE.LOGIN)
}}>Logout</button>
        </li>
     
         
      </ul>
      
    </div>
  </div>
</nav>
</>
  )
}

export default Navbar
