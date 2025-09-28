import { Router } from "express";
import { PurchaseController } from "./purchase.controller";

const router = Router();

router.post("/", PurchaseController.createPurchase);
router.get("/", PurchaseController.getAllPurchases);
router.get("/:id", PurchaseController.getPurchaseById);

export const PurchaseRoutes = router;
