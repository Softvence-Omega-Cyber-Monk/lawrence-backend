import { Router } from "express";
import { AgreementController } from "./agreement.controller";

const router = Router();

router.post("/", AgreementController.createAgreement);
router.get("/", AgreementController.getAllAgreements);
router.get("/:id", AgreementController.getAgreementById);

export const AgreementRoutes = router;
