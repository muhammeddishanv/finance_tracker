export type TransactionType = 'income' | 'expense';

export interface Transaction {
  id: string;
  amount: number;
  category: string;
  type: TransactionType;
  date: string;
  note?: string;
}

export interface TransactionFilters {
  type: string;
  category: string;
  startDate: string;
  endDate: string;
}

export type TransactionInput = Omit<Transaction, 'id'>;

