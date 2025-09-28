export interface PurchaseItem {
  productId: string;
  quantity: number;
  price: number;
}

export interface Purchase {
  id: string;
  customerId: string;
  items: PurchaseItem[];
  totalAmount: number;
  paymentMethod: "card" | "wallet" | "bank_transfer";
  paymentStatus: "pending" | "completed" | "failed";
  createdAt: Date;
  updatedAt: Date;
}
