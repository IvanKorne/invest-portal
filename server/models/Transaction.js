import mongoose from "mongoose";
import { loadType } from "mongoose-currency";
import { financialSchema } from "./KPI.js";

const Schema = mongoose.Schema;
loadType(mongoose);

const TransactionSchema = new Schema(
  {
    buyer: { type: String, required: true },
    amount: financialSchema,
    productIds: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
  },
  { timestamps: true, toJSON: { getters: true } }
);

const Transaction = mongoose.model("Transaction", TransactionSchema);

export default Transaction;
