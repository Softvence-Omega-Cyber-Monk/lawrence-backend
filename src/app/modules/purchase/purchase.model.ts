import { Schema, model } from "mongoose";

const productItemSchema = new Schema({
  productId: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
});

const purchaseSchema = new Schema(
  {
    customerId: { type: String, required: true },
    products: [productItemSchema],
    totalAmount: { type: Number, required: true },
    paymentMethod: { type: String, required: true },
    paymentDetails: { type: Object, required: true }, // store card info, txn id etc
    status: { type: String, default: "Pending" }, // Pending, Paid, Failed
  },
  { timestamps: true }
);

export const Purchase = model("Purchase", purchaseSchema);
