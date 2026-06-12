import React, { useState, useEffect } from 'react';
import { INCOME_CATEGORIES, EXPENSE_CATEGORIES } from '../../constants/categories';
import type { Transaction, TransactionType } from '../../types/transaction';
import { Card } from '../ui/Card';

interface TransactionFormProps {
  onSubmit: (transaction: any) => void; // Using any for simplicity as it can be Omit<Transaction, 'id'> or Transaction
  initialData?: Transaction | null;
  onCancelEdit?: () => void;
}

export function TransactionForm({ onSubmit, initialData, onCancelEdit }: TransactionFormProps) {
  const [type, setType] = useState<TransactionType>('expense');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState<string>(EXPENSE_CATEGORIES[0]);
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [note, setNote] = useState('');

  // Populate form if initialData is provided (Edit Mode)
  useEffect(() => {
    if (initialData) {
      setType(initialData.type);
      setAmount(initialData.amount.toString());
      setCategory(initialData.category);
      setDate(new Date(initialData.date).toISOString().split('T')[0]);
      setNote(initialData.note || '');
    } else {
      // Reset form (Add Mode)
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
      // Pass full transaction with ID back for update
      onSubmit({ ...initialData, ...transactionData });
    } else {
      // Pass data without ID for creation
      onSubmit(transactionData);
      // Reset form manually only if adding (edit reset is handled by initialData changing to null)
      setAmount('');
      setNote('');
    }
  };

  return (
    <Card>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-bold text-slate-800">
          {initialData ? 'Edit Transaction' : 'Add Transaction'}
        </h3>
        {initialData && onCancelEdit && (
          <button 
            type="button" 
            onClick={onCancelEdit} 
            className="text-sm font-medium text-slate-500 hover:text-slate-800 transition-colors"
          >
            Cancel
          </button>
        )}
      </div>
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Type Toggle */}
        <div className="flex gap-4">
          <label className="flex-1 cursor-pointer">
            <input type="radio" name="type" value="expense" checked={type === 'expense'} onChange={() => { setType('expense'); setCategory(EXPENSE_CATEGORIES[0]); }} className="sr-only peer" />
            <div className="text-center py-2.5 px-4 rounded-xl border border-slate-200 peer-checked:bg-rose-50 peer-checked:border-rose-500 peer-checked:text-rose-700 font-semibold transition-all shadow-sm peer-checked:shadow-none">
              Expense
            </div>
          </label>
          <label className="flex-1 cursor-pointer">
            <input type="radio" name="type" value="income" checked={type === 'income'} onChange={() => { setType('income'); setCategory(INCOME_CATEGORIES[0]); }} className="sr-only peer" />
            <div className="text-center py-2.5 px-4 rounded-xl border border-slate-200 peer-checked:bg-emerald-50 peer-checked:border-emerald-500 peer-checked:text-emerald-700 font-semibold transition-all shadow-sm peer-checked:shadow-none">
              Income
            </div>
          </label>
        </div>

        {/* Amount */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1.5">Amount</label>
          <div className="relative">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-medium">$</span>
            <input type="number" step="0.01" min="0.01" value={amount} onChange={e => setAmount(e.target.value)} required className="w-full pl-8 pr-4 py-2.5 border border-slate-200 bg-slate-50 focus:bg-white rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all font-medium text-slate-900" placeholder="0.00" />
          </div>
        </div>

        {/* Category & Date */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Category</label>
            <select value={category} onChange={e => setCategory(e.target.value)} className="w-full px-3.5 py-2.5 border border-slate-200 bg-slate-50 focus:bg-white rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all text-sm font-medium text-slate-700 cursor-pointer">
              {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Date</label>
            <input type="date" value={date} onChange={e => setDate(e.target.value)} required className="w-full px-3.5 py-2.5 border border-slate-200 bg-slate-50 focus:bg-white rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all text-sm font-medium text-slate-700" />
          </div>
        </div>

        {/* Note */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1.5">Note <span className="text-slate-400 font-normal">(Optional)</span></label>
          <input type="text" value={note} onChange={e => setNote(e.target.value)} className="w-full px-4 py-2.5 border border-slate-200 bg-slate-50 focus:bg-white rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all text-sm" placeholder="What was this for?" />
        </div>

        <button type="submit" className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all shadow-md shadow-blue-500/30 hover:shadow-lg hover:shadow-blue-500/40 mt-4 active:scale-[0.98]">
          {initialData ? 'Update Transaction' : 'Save Transaction'}
        </button>
      </form>
    </Card>
  );
}
