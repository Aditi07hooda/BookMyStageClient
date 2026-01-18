import { Schema, model } from "mongoose";
import { ProductType, offerProductType } from "./product.interface";

const productSchema = new Schema<ProductType>({
  categoryName: { type: String, required: true, trim: true },
  oldPrice: { type: Number, required: true, trim: true },
  price: { type: Number, required: true, trim: true },
  productDetails: { type: String, required: true, trim: true },
  productImages: { type: [String], required: true, trim: true },
  productName: { type: String, required: true, trim: true },
  subcategoryName: { type: String, required: true, trim: true },
  img: { type: String, required: true, trim: true },
  date: { type: String, required: true, trim: true },
  offer: { type: Boolean, required: true },
  offerPersent: { type: Number, required: true },
  rettings: { type: Map, of: Number, default: {} },
  productStatus: { type: String, required: true },
  submissionDate: { type: String, required: true, trim: true },
  productHeader: {type: String, required: false  },
});

const OfferproductSchema = new Schema<offerProductType>({
  productId: { type: String, required: true, trim: true },
  oldPrice: { type: Number, required: true, trim: true },
  price: { type: Number, required: true, trim: true },
  productDetails: { type: String, required: true, trim: true },
  productName: { type: String, required: true, trim: true },
  banner: { type: String, required: true, trim: true },
  date: { type: String, required: true, trim: true },
  offerPersent: { type: Number, required: true },
});

export const Product = model<ProductType>("Product", productSchema);
export const OffProduct = model<offerProductType>("OffProduct", OfferproductSchema);
