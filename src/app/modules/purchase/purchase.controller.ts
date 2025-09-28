import { Request, Response } from "express";
import { PurchaseService } from "./purchase.service";
import { AuthRequest } from "../../../middleware/auth";

// create purchase

const createPurchase = async (req: AuthRequest, res: Response) => {
  try {
    // Get customerId from authenticated user (JWT token)
    // const customerId = req.user?.id;
    const {customerId, products, paymentMethod, paymentDetails } = req.body;

    // Check if user is authenticated
    if (!customerId) {
      return res.status(401).json({ 
        success: false, 
        message: "User not authenticated" 
      });
    }

    if (!products || products.length === 0) {
      return res.status(400).json({ 
        success: false, 
        message: "Products are required" 
      });
    }

    const result = await PurchaseService.createPurchase({
      customerId,
      products,
      paymentMethod,
      paymentDetails,
    });

    res.status(201).json({
      success: true,
      message: "Purchase completed successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// get all purchases
const getAllPurchases = async (req: Request, res: Response) => {
  try {
    const result = await PurchaseService.getAllPurchases();
    res.json({ success: true, data: result });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// get purchase by id
const getPurchaseById = async (req: Request, res: Response) => {
  try {
    const result = await PurchaseService.getPurchaseById(req.params.id);
    if (!result) {
      return res.status(404).json({ success: false, message: "Purchase not found" });
    }
    res.json({ success: true, data: result });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const PurchaseController = {
  createPurchase,
  getAllPurchases,
  getPurchaseById,
};
