import type { Transaction } from '../types/transaction';
import { calculateSummary } from './calculateSummary';

export function generateInsight(transactions: Transaction[]): string {
  if (transactions.length === 0) {
    return "Add some transactions to get personalized financial insights.";
  }

  const summary = calculateSummary(transactions);

  // Check if expenses exceed income
  if (summary.totalExpense > summary.totalIncome && summary.totalIncome > 0) {
    return "Your expenses are higher than your income. Consider reviewing your budget.";
  }

  // Check if one category exceeds 40% of spending
  if (summary.totalExpense > 0 && summary.topCategory !== 'None') {
    const expenses = transactions.filter(t => t.type === 'expense');
    const topCategoryTotal = expenses
      .filter(t => t.category === summary.topCategory)
      .reduce((sum, t) => sum + t.amount, 0);
    
    if (topCategoryTotal / summary.totalExpense > 0.4) {
      return `You spend most of your money on ${summary.topCategory}.`;
    }
  }

  // Check if balance is positive
  if (summary.netBalance > 0) {
    return "You are saving money this month. Great job!";
  }
  
  if (summary.totalExpense > summary.totalIncome && summary.totalIncome === 0) {
     return "You only have expenses so far. Time to log some income!";
  }

  return "You are on track with your finances.";
}
