import { useMemo } from 'react';
import type { Transaction, TransactionFilters } from '../types/transaction';

export function useTransactionFilters(
  transactions: Transaction[],
  filters: TransactionFilters
): Transaction[] {
  return useMemo(() => {
    return transactions.filter((t) => {
      if (filters.type !== 'all' && t.type !== filters.type) return false;
      if (filters.category !== 'All' && t.category !== filters.category) return false;
      if (filters.startDate && new Date(t.date) < new Date(filters.startDate)) return false;
      if (filters.endDate && new Date(t.date) > new Date(filters.endDate)) return false;
      return true;
    });
  }, [transactions, filters]);
}
