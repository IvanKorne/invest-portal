import mongoose from "mongoose";
import { loadType } from "mongoose-currency";

const Schema = mongoose.Schema;
loadType(mongoose);

export const financialSchema = {
  type: mongoose.Types.Currency,
  currency: "CAD",
  get: (v) => v / 100,
};

const monthSchema = new Schema(
  {
    month: String,
    revenue: financialSchema,
    expenses: financialSchema,
    operationalExpenses: financialSchema,
    nonOperationalExpenses: financialSchema,
  },
  {
    toJSON: { getters: true },
  }
);

const daySchema = new Schema(
  {
    date: String,
    revenue: financialSchema,
    expenses: financialSchema,
  },
  {
    toJSON: { getters: true },
  }
);

const KPISchema = new Schema(
  {
    totalProfit: financialSchema,
    totalRevenue: financialSchema,
    totalExpenses: financialSchema,
    expensesByCategory: {
      type: Map,
      of: financialSchema,
    },
    monthlyData: [monthSchema],
    dailyData: [daySchema],
  },
  {
    toJSON: { getters: true },
    timestamps: true,
  }
);

const KPI = mongoose.model("KPI", KPISchema);

export default KPI;
