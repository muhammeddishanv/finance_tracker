import type { Transaction } from '../types/transaction';

export interface SummaryData {
  totalIncome: number;
  totalExpense: number;
  netBalance: number;
  topCategory: string;
}

export function calculateSummary(transactions: Transaction[]): SummaryData {
  let totalIncome = 0;
  let totalExpense = 0;
  const expenseCategories: Record<string, number> = {};

  transactions.forEach((t) => {
    if (t.type === 'income') {
      totalIncome += t.amount;
    } else {
      totalExpense += t.amount;
      expenseCategories[t.category] = (expenseCategories[t.category] || 0) + t.amount;
    }
  });

  const netBalance = totalIncome - totalExpense;

  let topCategory = 'None';
  let maxExpense = 0;

  for (const [category, amount] of Object.entries(expenseCategories)) {
    if (amount > maxExpense) {
      maxExpense = amount;
      topCategory = category;
    }
  }

  return {
    totalIncome,
    totalExpense,
    netBalance,
    topCategory,
  };
}
