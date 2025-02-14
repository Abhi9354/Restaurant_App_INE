import { AppConstants } from "../../../shared/utils/constants/config.js";
import { loadMessageBundler } from "../../../shared/utils/constants/i18n/messageReader.js";
import { generateToken, verifyToken } from "../../../shared/utils/token.js";
import { orderModel } from "../db/models/order-schema.js";
import { restaurantModel } from "../db/models/restaurant-schema.js";
import { userModel } from "../db/models/user-schema.js";
import { userService } from "../services/user-service.js";
export const register = async (req, res) => {
  const data = req.body;
  console.log("data", data);
  try {
    const doc = await userService.register(data);
    console.log("controller screen", doc);
    if (doc._id) {
      console.log("start");
      res
        .status(AppConstants.SUCCESS_CODES)
        .json({ message: "success", doc: doc });
    } else {
      res.json({ message: "fail" });
    }
  } catch (err) {
    throw err;
  }
};
export const login = async (req, res) => {
  const userData = req.body;
  try {
    const doc = await userService.login(userData);
    console.log("controller screen", doc);
    if (doc) {
      //generate the token
      const token = generateToken(doc.email);
      const message = loadMessageBundler();
      res.status(AppConstants.SUCCESS_CODES).json({
        message: `${doc.name} ` + message["login.success"],
        token: token,
        data: doc,
      });
    } else {
      res
        .status(AppConstants.ERROR_CODES.AUTH_FAILED)
        .json({ message: "invalid credential " });
    }
  } catch (error) {
    throw error;
    // res.status(AppConstants.ERROR_CODES.INTERNAL_SERVER_ERROR).json({"message":"Internal server error"})
  }
};
export const profile = async(req, res) => {
  const auth = req.headers["authorization"];
  const decoded = verifyToken(auth);
  console.log('decoded',decoded);
  res.locals.jwtData = decoded;
  console.log('res.locals',res.locals.jwtData.email);
  if (verifyToken(auth)) {

    const user= await userModel.find({"email":res.locals.jwtData.email});
    console.log('user',user);
    if(!user){
      return res.status(401).send("Permissions didn't match");
      
    }
    res
      .status(200)
      .json({ message: "OK", name: user[0].name, email: user[0].email ,role:user[0].role});
  } else {
    res
      .status(AppConstants.ERROR_CODES.AUTH_FAILED)
      .json({ message: "authorization failed failed" });
  }
};
export const remove = (req, res) => {
  res.send("remove");
};

export const addRestaurants = async (req, res, next) => {
  try {
    const auth = req.headers["authorization"];
    console.log("auth", auth);
    if (verifyToken(auth)) {
      console.log("enter addcontroller");
      const doc = await restaurantModel.find();
      console.log("doc", doc);
      res.status(200).json({ message: "success", data: doc });
    } else {
      console.log("token not valid ");
      res.status(401).send("token not valid");
    }
  } catch (err) {
    throw err;
  }
};

export const addOrder = async (req, res) => {
  try {
    const data = req.body;
    const doc = await userService.addOrder(data);
    if (doc) {
      res
        .status(AppConstants.SUCCESS_CODES)
        .send({ message: "success", data: doc });
    } else {
      res
        .status(AppConstants.ERROR_CODES.INTERNAL_SERVER_ERROR)
        .send({ message: "fail to add order on Controller" });
    }
  } catch (error) {
    throw error;
  }
};

export const getOrders = async (req, res) => {
  try {
    const auth = req.headers["authorization"];
    console.log("auth", auth);
    if (verifyToken(auth)) {
      console.log("enter addcontroller");
      const doc = await orderModel.find();
      console.log("doc", doc);
      res.status(200).json({ message: "success", data: doc });
    } else {
      console.log("token not valid ");
      res.status(401).send("token not valid");
    }
  } catch (error) {
    console.log("error", error);
    throw error;
  }
};
