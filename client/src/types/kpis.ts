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
};
