import { getRestaurants } from "../slice/data-slice";

export const API={login:import.meta.env.VITE_BACKEND_URL+"/auth/login",register:import.meta.env.VITE_BACKEND_URL+"/auth/register",
    getRestaurants:import.meta.env.VITE_BACKEND_URL+"/getRestaurants",
}
