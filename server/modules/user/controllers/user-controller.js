import { AppConstants } from "../../../shared/utils/constants/config.js";
import { loadMessageBundler } from "../../../shared/utils/constants/i18n/messageReader.js";
import { generateToken, verifyToken } from "../../../shared/utils/token.js";
import { restaurantModel } from "../db/models/restaurant-schema.js";
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
      res
        .status(AppConstants.SUCCESS_CODES)
        .json({
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
export const profile = (req, res) => {
  const auth = req.headers["authorization"];
  if (verifyToken(auth)) {
    res.send("profile");
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
      const doc = await restaurantModel.find()
            console.log('doc',doc);
      res.status(200).json({ message: "success", data: doc });
    }
    else {
      console.log('token not valid ');
      res.status(401).send("token not valid");
    }
  } catch (err) {
    throw err;
  }
};
