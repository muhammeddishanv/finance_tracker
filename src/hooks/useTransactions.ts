import { useState, useEffect, useCallback } from 'react';
import type { Transaction } from '../types/transaction';
import * as transactionService from '../services/transaction.service';

export function useTransactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const loadTransactions = useCallback(() => {
    const data = transactionService.getTransactions();
    // Sort by date descending (newest first)
    data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    setTransactions(data);
  }, []);

  // Initial load
  useEffect(() => {
    loadTransactions();
  }, [loadTransactions]);

  const addTransaction = useCallback((transaction: Omit<Transaction, 'id'>) => {
    const newTransaction: Transaction = {
      ...transaction,
      id: crypto.randomUUID(), // Generate a unique ID
    };
    transactionService.addTransaction(newTransaction);
    loadTransactions();
  }, [loadTransactions]);

  const updateTransaction = useCallback((transaction: Transaction) => {
    transactionService.updateTransaction(transaction);
    loadTransactions();
  }, [loadTransactions]);

  const deleteTransaction = useCallback((id: string) => {
    transactionService.deleteTransaction(id);
    loadTransactions();
  }, [loadTransactions]);

  return {
    transactions,
    addTransaction,
    updateTransaction,
    deleteTransaction,
    refreshTransactions: loadTransactions,
  };
}
