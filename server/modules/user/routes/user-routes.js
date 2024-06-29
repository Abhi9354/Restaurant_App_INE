import express from "express";
import { addOrder, getOrders, addRestaurants as getRestaurants, login, profile, register, remove } from "../controllers/user-controller.js";

export const userRouter = express.Router();

userRouter.post ('/auth/login',login)
userRouter.post ('/auth/register',register)
userRouter.get ('/profile',profile)
userRouter.post ('/auth/logout',remove)
userRouter.get('/getRestaurants',getRestaurants)
userRouter.post('/addorder',addOrder)
userRouter.get('/getorders',getOrders)




