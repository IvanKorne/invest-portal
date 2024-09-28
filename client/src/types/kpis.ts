export type ExpensesByCategory = {
  salaries: number;
  supplies: number;
  services: number;
};

export type Month = Day & {
  nonOperationalExpenses: number;
  operationalExpenses: number;
};

export type Day = {
  id: string;
  month: string;
  revenue: number;
  expenses: number;
};

export type GetKpisResponse = {
  id: string;
  _id: string;
  __v: number;
  totalProfit: number;
  totalExpenses: number;
  expensesByCategory: ExpensesByCategory;
  monthlyData: Array<Month>;
  dailyData: Array<Day>;
  createdAt: string;
  updatedAt: string;
};

export type GetProductsResponse = {
  id: string;
  _id: string;
  __v: number;
  price: number;
  expense: number;
  transactions: Array<string>;
  monthlyData: Array<Month>;
  dailyData: Array<Day>;
  createdAt: string;
  updatedAt: string;
};

export type GetTransactionsResponse = {
  id: string;
  _id: string;
  __v: number;
  buyer: string;
  amount: number;
  productIds: Array<string>;
  createdAt: string;
  updatedAt: string;
};
