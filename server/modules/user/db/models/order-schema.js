import mongoose from "../../../../shared/sharedDB/connection.js";

import { Schema } from "mongoose";

const orderSchema = new Schema({
    
    CustomerName: { required: true, type: String },
    CustomerEmail: { required: true, type: String },
    cart: [
        {
          id: {
            required: true,
            type: String,
            unique: true,
          },
          name: { required: true, type: String },
          price: { required: true, type: String },
          quantity: { required: true, type: String },
          img: { required: true, type: String },
        },
      ]
    } );

export const orderModel= mongoose.model("order",orderSchema);
