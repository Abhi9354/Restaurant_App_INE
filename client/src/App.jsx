import { Route, Routes } from "react-router-dom";
import Login from "./Components/auth/Login";
import Register from "./Components/auth/Register";
import Home from "./Components/pages/Home";
import { useDispatch, useSelector } from "react-redux";
import { setToken, verifyauth } from "./slice/auth-slice";
import Cart from "./Components/pages/Cart";
import StaffDashboard from "./Components/pages/StaffDashboard";
import { useEffect } from "react";

const App = () => {
  const dispatch = useDispatch();
  dispatch(setToken(localStorage.getItem("token")));
useEffect(() => {
  dispatch(verifyauth());
  
}, [dispatch]);
  
  // dispatch(setRole(localStorage.getItem("role")));
  const data = useSelector((state) => state.authSlice);
  console.log("data rolelelel", data.role);

  return (
    <>
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/" element={data.token?data.role==="staff"?<StaffDashboard/>:<Home/>:<Login />} />

        <Route path="/register" element={<Register />} />
        <Route
          path="/home"
          element={
            data.token ? (
              data.role === "staff" ? (
                <StaffDashboard />
              ) : (
                <Home />
              )
            ) : (
              <Login />
            )
          }
        />

        <Route path="/cart" element={data.token ? <Cart /> : <Login />} />
      </Routes>
    </>
  );
};

export default App;
