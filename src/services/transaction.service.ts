import type { Transaction } from '../types/transaction';

const STORAGE_KEY = 'transactions';

export const getTransactions = (): Transaction[] => {
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) return [];
  try {
    return JSON.parse(data);
  } catch (error) {
    console.error('Failed to parse transactions from local storage', error);
    return [];
  }
};

export const saveTransactions = (transactions: Transaction[]): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
};

export const addTransaction = (transaction: Transaction): void => {
  const transactions = getTransactions();
  transactions.push(transaction);
  saveTransactions(transactions);
};

export const updateTransaction = (updatedTransaction: Transaction): void => {
  let transactions = getTransactions();
  transactions = transactions.map(t => 
    t.id === updatedTransaction.id ? updatedTransaction : t
  );
  saveTransactions(transactions);
};

export const deleteTransaction = (id: string): void => {
  let transactions = getTransactions();
  transactions = transactions.filter(t => t.id !== id);
  saveTransactions(transactions);
};
