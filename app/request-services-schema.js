import { Schema } from "mongoose";
export const requestServicesSchema = new Schema({
  merchant: { type: Schema.Types.ObjectId, ref: "Merchant" },
  service: { type: [String], required: true },
  description: { type: [String], required: true },
  price: { type: Number, required: true },
});
