import React, { useState, useEffect } from 'react';
import { INCOME_CATEGORIES, EXPENSE_CATEGORIES } from '../../constants/categories';
import type { Transaction, TransactionType, TransactionInput } from '../../types/transaction';
import { Card } from '../ui/Card';

interface TransactionFormProps {
  onSubmit: (transaction: TransactionInput | Transaction) => void;
  initialData?: Transaction | null;
  onCancelEdit?: () => void;
}

export function TransactionForm({ onSubmit, initialData, onCancelEdit }: TransactionFormProps) {
  const [type, setType] = useState<TransactionType>('expense');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState<string>(EXPENSE_CATEGORIES[0]);
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [note, setNote] = useState('');

  useEffect(() => {
    if (initialData) {
      setType(initialData.type);
      setAmount(initialData.amount.toString());
      setCategory(initialData.category);
      setDate(new Date(initialData.date).toISOString().split('T')[0]);
      setNote(initialData.note || '');
    } else {
      setType('expense');
      setAmount('');
      setCategory(EXPENSE_CATEGORIES[0]);
      setDate(new Date().toISOString().split('T')[0]);
      setNote('');
    }
  }, [initialData]);

  const categories = type === 'income' ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || parseFloat(amount) <= 0) return;

    const transactionData = {
      type,
      amount: parseFloat(amount),
      category,
      date,
      note,
    };

    if (initialData) {
      onSubmit({ ...initialData, ...transactionData });
    } else {
      onSubmit(transactionData);
      setAmount('');
      setNote('');
    }
  };

  return (
    <Card className="p-4 md:p-5">
      <div className="flex justify-between items-center mb-6">
        <div className="inline-block px-3 py-1 border-neo bg-[var(--color-neo-lime)] text-xs font-bold uppercase">
          {initialData ? 'EDIT TRANSACTION' : 'ADD TRANSACTION'}
        </div>
        {initialData && onCancelEdit && (
          <button 
            type="button" 
            onClick={onCancelEdit} 
            className="text-xs font-bold uppercase underline hover:text-slate-600"
          >
            Cancel
          </button>
        )}
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Type Toggle */}
        <div className="flex gap-4">
          <label className="flex-1 cursor-pointer">
            <input type="radio" name="type" value="expense" checked={type === 'expense'} onChange={() => { setType('expense'); setCategory(EXPENSE_CATEGORIES[0]); }} className="sr-only peer" />
            <div className={`text-center py-3 px-4 border-neo font-bold uppercase transition-all ${type === 'expense' ? 'bg-[var(--color-neo-expense)] shadow-neo-sm translate-x-[-2px] translate-y-[-2px]' : 'bg-white hover:bg-slate-50'}`}>
              Expense
            </div>
          </label>
          <label className="flex-1 cursor-pointer">
            <input type="radio" name="type" value="income" checked={type === 'income'} onChange={() => { setType('income'); setCategory(INCOME_CATEGORIES[0]); }} className="sr-only peer" />
            <div className={`text-center py-3 px-4 border-neo font-bold uppercase transition-all ${type === 'income' ? 'bg-[var(--color-neo-income)] shadow-neo-sm translate-x-[-2px] translate-y-[-2px]' : 'bg-white hover:bg-slate-50'}`}>
              Income
            </div>
          </label>
        </div>

        {/* Amount */}
        <div>
          <label className="block text-xs font-bold uppercase mb-1">Amount</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 font-bold text-base">₹</span>
            <input type="number" step="0.01" min="0.01" value={amount} onChange={e => setAmount(e.target.value)} required className="w-full pl-7 pr-3 h-12 border-neo bg-white focus:outline-none focus:shadow-neo-sm transition-shadow font-bold text-base rounded-none" placeholder="0.00" />
          </div>
        </div>

        {/* Category & Date */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-bold uppercase mb-1">Category</label>
            <select value={category} onChange={e => setCategory(e.target.value)} className="w-full px-3 h-12 border-neo bg-white focus:outline-none focus:shadow-neo-sm transition-shadow font-bold uppercase text-xs cursor-pointer rounded-none">
              {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold uppercase mb-1">Date</label>
            <input type="date" value={date} onChange={e => setDate(e.target.value)} required className="w-full px-3 h-12 border-neo bg-white focus:outline-none focus:shadow-neo-sm transition-shadow font-bold uppercase text-xs rounded-none" />
          </div>
        </div>

        {/* Note */}
        <div>
          <label className="block text-xs font-bold uppercase mb-1">Note <span className="font-medium text-slate-500 lowercase">(Optional)</span></label>
          <input type="text" value={note} onChange={e => setNote(e.target.value)} maxLength={21} className="w-full px-3 h-12 border-neo bg-white focus:outline-none focus:shadow-neo-sm transition-shadow font-bold text-sm rounded-none" placeholder="What was this for?" />
        </div>

        <button type="submit" className="w-full h-12 bg-[var(--color-neo-purple)] border-neo shadow-neo hover-neo font-extrabold uppercase text-base tracking-wide">
          {initialData ? 'Update Transaction' : 'Save Transaction'}
        </button>
      </form>
    </Card>
  );
}
