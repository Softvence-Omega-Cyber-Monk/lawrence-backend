import { Request, Response } from "express";
import { AgreementService } from "./agreement.service";

const createAgreement = async (req: Request, res: Response) => {
  try {
    const result = await AgreementService.createAgreement(req.body);
    res.status(201).json({
      success: true,
      message: "Agreement created successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const getAllAgreements = async (req: Request, res: Response) => {
  try {
    const result = await AgreementService.getAllAgreements();
    res.json({ success: true, data: result });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const getAgreementById = async (req: Request, res: Response) => {
  try {
    const result = await AgreementService.getAgreementById(req.params.id);
    if (!result) {
      return res.status(404).json({ success: false, message: "Not found" });
    }
    res.json({ success: true, data: result });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const AgreementController = {
  createAgreement,
  getAllAgreements,
  getAgreementById,
};
