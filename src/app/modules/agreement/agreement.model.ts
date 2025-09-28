import { Schema, model } from "mongoose";

const agreementSchema = new Schema(
  {
    customerName: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zipCode: { type: String, required: true },
    email: { type: String, required: true },

    itemBeingRepaired: { type: String, required: true },
    brand: { type: String, required: true },
    model: { type: String },
    service: { type: String, required: true },
    tireRepairType: { type: String }, // optional, only if service is Tire Repair
    issues: [{ type: String }],
    additionalInfo: { type: String },

    agreements: [{ type: String, required: true }], // list of checked agreement texts
    signature: { type: String },
    date: { type: Date, required: true },
  },
  { timestamps: true }
);

export const Agreement = model("Agreement", agreementSchema);
