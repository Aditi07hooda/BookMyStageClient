import { model, Schema } from "mongoose";
import { CanceOrderDataType, OrderDataType, ShipMentStatus } from "./orderSuccess.interface";


const orderScema = new Schema<OrderDataType>({
  buyerEmail: String,
  name: String,
  Address: String,
  City: String,
  Postcode: String,
  EmailAddress: String,
  date: String,
  orderStatusDate: String,
  Phone: String,
  totalPrice: Number,
  orderProducts: Array,
  paymentId: String,
  shipmentStatus: String,
  orderId: String,
});

// Cancel Order Schema
const cancelOrderScema = new Schema<CanceOrderDataType>({
  buyerEmail: { type: String, required: true },
  EmailAddress: { type: String, required: true },
  date: { type: String, required: true },
  Phone: { type: String, required: true },
  productId: { type: String, required: true },
  productName: { type: String, required: true },
  returnAmount: { type: Number, required: true },
  paymentId: { type: String, required: true },
  orderId: { type: String, required: true },
  returnStatus: { type: String, required: true },
  orderProduct: {
    productId: { type: String, required: true },
    productName: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
  },
});

// Export the models
export const Order = model<OrderDataType>("Order", orderScema);
export const CancelOrder = model<CanceOrderDataType>("CancelOrder", cancelOrderScema);
