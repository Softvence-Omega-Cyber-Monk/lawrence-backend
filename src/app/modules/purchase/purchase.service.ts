import { Purchase } from "./purchase.model";

// create purchase
const createPurchase = async (payload: any) => {
  // calculate total amount
  const totalAmount = payload.products.reduce(
    (sum: number, item: any) => sum + item.price * item.quantity,
    0
  );

  const purchase = await Purchase.create({
    customerId: payload.customerId,
    products: payload.products,
    totalAmount,
    paymentMethod: payload.paymentMethod,
    paymentDetails: payload.paymentDetails,
    status: "Paid", // for now, we assume payment is successful
  });

  return purchase;
};

// get all purchases
const getAllPurchases = async () => {
  return await Purchase.find();
};

// get purchase by id
const getPurchaseById = async (id: string) => {
  return await Purchase.findById(id);
};

export const PurchaseService = {
  createPurchase,
  getAllPurchases,
  getPurchaseById,
};
