import { Agreement } from "./agreement.model";

const createAgreement = async (payload: any) => {
  const result = await Agreement.create(payload);
  return result;
};

const getAllAgreements = async () => {
  return await Agreement.find();
};

const getAgreementById = async (id: string) => {
  return await Agreement.findById(id);
};

export const AgreementService = {
  createAgreement,
  getAllAgreements,
  getAgreementById,
};
