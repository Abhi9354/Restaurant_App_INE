import mongoose from "../../../../shared/sharedDB/connection.js";

import { Schema } from "mongoose";
import { AppConstants } from "../../../../shared/utils/constants/config.js";

const restaurantSchema = new Schema([
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    img: {
      type: String,
      required: true,
    },

    name: {
      type: String,
      required: true,
    },
    dsc: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    rate: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
  },
]);
export const restaurantModel = mongoose.model(
  AppConstants.SCHEMA.RESTAURANT_SCHEMA,
  restaurantSchema
);
