
export const API = {
  login: import.meta.env.VITE_BACKEND_URL + "/auth/login",
  register: import.meta.env.VITE_BACKEND_URL + "/auth/register",
  getRestaurants: import.meta.env.VITE_BACKEND_URL + "/getRestaurants",
  addOrder: import.meta.env.VITE_BACKEND_URL + "/addorder",
  getOrders: import.meta.env.VITE_BACKEND_URL + "/getorders",
};
